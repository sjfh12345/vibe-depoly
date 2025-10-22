import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] gap-8">
      <h1 className="text-3xl font-bold">홈페이지</h1>
      <Link href="/diaries" className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
        다이어리 페이지로 이동
      </Link>
    </div>
  );
}