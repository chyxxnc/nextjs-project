'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Login() {
  const [email, setEmail] = useState('');
  const supabase = createClient();

  useEffect(() => {
    const user = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) console.log('사용자 이메일 가져오기 실패: ' + error.message);
      else {
        console.log('사용자 이메일 가져오기 성공');
        setEmail(user?.email ?? '');
      }
    };
    user();
  });

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) console.log('로그아웃 실패: ' + error);
    else {
      console.log('로그아웃 성공');
      alert('로그아웃 되었습니다');
      redirect('/');
    }
  };
  return (
    <main className="flex justify-between p-30 min-h-screen bg-pink-100">
      <div className="text-start">
        <h1 className="font-semibold text-[50px] pl-35 pt-20">Login Successful !</h1>
        <p className="pl-35 text-[15px] leading-[35px]">{email}님 반값습니다!</p>
        <a href="/sendEmailPW" className="text-center text-sm pl-35">
          비밀번호 변경하기
        </a>
        <br></br>
        <Button onClick={logout} className="ml-35 mt-90">
          logout
        </Button>
      </div>
      <div className="mt-[40px]">
        <a href="/addImage" className="font-bold text-[15px] ml-[640px]">
          추가하기
        </a>
        <Table className="w-[700px] mt-[20px] mr-[100px]">
          <TableCaption>A list of your images.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>USER_ID</TableHead>
              <TableHead>IMAGE_PATH</TableHead>
              <TableHead>IMAGE_NAME</TableHead>
              <TableHead className="text-right">DATE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
