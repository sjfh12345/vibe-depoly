'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useModal } from '../../../commons/providers/modal/modal.provider';
import Modal from '../../../commons/components/modal';
import { RouteType, getRoutePath } from '../../../commons/constants/url';

/**
 * 회원가입 폼 스키마
 */
const signupSchema = z
  .object({
    name: z.string().min(1, '이름을 입력해주세요.'),
    email: z.string().email('올바른 이메일 형식이 아닙니다.').refine((val) => val.includes('@'), {
      message: '이메일에 @를 포함해야 합니다.',
    }),
    password: z
      .string()
      .min(8, '비밀번호는 8자 이상이어야 합니다.')
      .refine(
        (val) => /[a-zA-Z]/.test(val) && /[0-9]/.test(val),
        '비밀번호는 영문과 숫자를 포함해야 합니다.'
      ),
    passwordConfirm: z.string().min(1, '비밀번호를 다시 입력해주세요.'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

export type SignupFormData = z.infer<typeof signupSchema>;

/**
 * GraphQL createUser mutation 요청
 */
interface CreateUserInput {
  email: string;
  password: string;
  name: string;
}

interface CreateUserResponse {
  data?: {
    createUser?: {
      _id: string;
    };
  };
  errors?: Array<{
    message: string;
  }>;
}

async function createUser(input: CreateUserInput): Promise<CreateUserResponse> {
  const mutation = `
    mutation CreateUser($createUserInput: CreateUserInput!) {
      createUser(createUserInput: $createUserInput) {
        _id
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
        createUserInput: {
          email: input.email,
          password: input.password,
          name: input.name,
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error('회원가입 요청에 실패했습니다.');
  }

  const result = await response.json();

  if (result.errors && result.errors.length > 0) {
    throw new Error(result.errors[0]?.message || '회원가입에 실패했습니다.');
  }

  // GraphQL 응답은 일반적으로 { data: { ... } } 구조이므로
  // 에러가 없으면 성공으로 간주
  return result;
}

/**
 * 회원가입 폼 훅
 */
export function useSignupForm() {
  const router = useRouter();
  const { openModal, closeAllModals } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // API 응답이 성공적으로 반환되었고 에러가 없으면 성공으로 간주
      // GraphQL 응답 구조: { data: { createUser: { _id: string } } }
      // 성공 모달 표시
      openModal(
        <Modal
          title="회원가입 완료"
          content="회원가입에 성공했습니다."
          variant="info"
          actions="single"
          onConfirm={() => {
            closeAllModals();
            router.push(getRoutePath(RouteType.LOGIN));
          }}
        />
      );
    },
    onError: (error: Error) => {
      // 실패 모달 표시
      openModal(
        <Modal
          title="회원가입 실패"
          content={error.message || '회원가입에 실패했습니다.'}
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
      name: data.name,
    });
  });

  // 모든 필드가 입력되었는지 확인
  const name = watch('name');
  const email = watch('email');
  const password = watch('password');
  const passwordConfirm = watch('passwordConfirm');

  const isFormValid =
    isValid &&
    !!name &&
    !!email &&
    !!password &&
    !!passwordConfirm &&
    !errors.name &&
    !errors.email &&
    !errors.password &&
    !errors.passwordConfirm;

  return {
    register,
    onSubmit,
    errors,
    isFormValid,
    isLoading: mutation.isPending,
  };
}
