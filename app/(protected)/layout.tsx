import { createServer } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createServer();

  try {
    const { data, error } = await supabase.auth.getSession();

    if (!data?.session || error) throw new Error('로그인 되어있지 않음');
  } catch (error) {
    redirect('/login');
  }

  return <>{children}</>;
}
