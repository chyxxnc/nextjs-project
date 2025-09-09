import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  // 프로젝트의 자격 증명을 사용하여 브라우저에서 Supabase 클라이언트를 생성하세요.
  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
}
