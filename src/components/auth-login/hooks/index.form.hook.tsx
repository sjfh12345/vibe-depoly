'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useModal } from '../../../commons/providers/modal/modal.provider';
import { useAuth } from '../../../commons/providers/auth/auth.provider';
import Modal from '../../../commons/components/modal';
import { RouteType, getRoutePath } from '../../../commons/constants/url';

/**
 * 로그인 폼 스키마
 */
const loginSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .refine((val) => val.includes('@'), {
      message: '이메일에 @를 포함해야 합니다.',
    }),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * GraphQL loginUser mutation 요청
 */
interface LoginUserInput {
  email: string;
  password: string;
}

interface LoginUserResponse {
  data?: {
    loginUser?: {
      accessToken: string;
    };
  };
  errors?: Array<{
    message: string;
  }>;
}

async function loginUser(input: LoginUserInput): Promise<LoginUserResponse> {
  const mutation = `
    mutation LoginUser($email: String!, $password: String!) {
      loginUser(email: $email, password: $password) {
        accessToken
      }
    }
  `;

  const response = await fetch('https://main-practice.codebootcamp.co.kr/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: mutation,
      variables: {
        email: input.email,
        password: input.password,
      },
    }),
  });

  if (!response.ok) {
    throw new Error('로그인 요청에 실패했습니다.');
  }

  const result = await response.json();

  if (result.errors && result.errors.length > 0) {
    throw new Error(result.errors[0]?.message || '로그인에 실패했습니다.');
  }

  return result;
}

/**
 * GraphQL fetchUserLoggedIn query 요청
 */
interface FetchUserLoggedInResponse {
  data?: {
    fetchUserLoggedIn?: {
      _id: string;
      name: string;
    };
  };
  errors?: Array<{
    message: string;
  }>;
}

async function fetchUserLoggedIn(accessToken: string): Promise<FetchUserLoggedInResponse> {
  const query = `
    query FetchUserLoggedIn {
      fetchUserLoggedIn {
        _id
        name
      }
    }
  `;

  const response = await fetch('https://main-practice.codebootcamp.co.kr/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      query: query,
    }),
  });

  if (!response.ok) {
    throw new Error('회원 정보 조회에 실패했습니다.');
  }

  const result = await response.json();

  if (result.errors && result.errors.length > 0) {
    throw new Error(result.errors[0]?.message || '회원 정보 조회에 실패했습니다.');
  }

  return result;
}

/**
 * 로그인 폼 훅
 */
export function useLoginForm() {
  const router = useRouter();
  const { openModal, closeAllModals } = useModal();
  const { updateAuthState } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      try {
        const accessToken = data.data?.loginUser?.accessToken;
        if (!accessToken) {
          throw new Error('액세스 토큰을 받아오지 못했습니다.');
        }

        // 로컬스토리지에 accessToken 저장
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', accessToken);
        }

        // fetchUserLoggedIn API 호출
        const userData = await fetchUserLoggedIn(accessToken);
        const user = userData.data?.fetchUserLoggedIn;

        if (!user || !user._id || !user.name) {
          throw new Error('회원 정보를 받아오지 못했습니다.');
        }

        // 로컬스토리지에 user 정보 저장
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify({ _id: user._id, name: user.name }));
        }

        // AuthProvider 상태 즉시 업데이트
        updateAuthState();

        // 로그인 완료 모달 표시
        openModal(
          <Modal
            title="로그인 완료"
            content="로그인에 성공했습니다."
            variant="info"
            actions="single"
            closeOnBackdropClick={false}
            onConfirm={() => {
              closeAllModals();
              router.push(getRoutePath(RouteType.DIARIES));
            }}
          />
        );
      } catch (error) {
        // fetchUserLoggedIn 실패 시 에러 모달 표시
        openModal(
          <Modal
            title="로그인 실패"
            content={error instanceof Error ? error.message : '로그인에 실패했습니다.'}
            variant="danger"
            actions="single"
            onConfirm={() => {
              closeAllModals();
            }}
          />
        );
      }
    },
    onError: (error: Error) => {
      // 로그인 실패 모달 표시
      openModal(
        <Modal
          title="로그인 실패"
          content={error.message || '로그인에 실패했습니다.'}
          variant="danger"
          actions="single"
          onConfirm={() => {
            closeAllModals();
          }}
        />
      );
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate({
      email: data.email,
      password: data.password,
    });
  });

  // 모든 필드가 입력되었는지 확인
  const email = watch('email');
  const password = watch('password');

  const isFormValid =
    isValid &&
    !!email &&
    !!password &&
    !errors.email &&
    !errors.password;

  return {
    register,
    onSubmit,
    errors,
    isFormValid,
    isLoading: mutation.isPending,
  };
}

