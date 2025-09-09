import { createServer } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createServer();

  const { data, error } = await supabase.auth.getSession();

  if (data?.session) {
    console.log('로그인 되어있음');
  } else {
    console.log('로그인 되어있지 않음');
    redirect('/login');
  }

  return <>{children}</>;
}
