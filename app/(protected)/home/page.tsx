'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type Images = {
  image_id: number;
  user_id: string;
  title: string;
  file_name: string;
  created_at: string;
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [data, setData] = useState<Images[]>([]);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    user();
    images();
  }, []);

  const user = async () => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) console.log('사용자 이메일 가져오기 실패: ' + error.message);
      else {
        console.log('사용자 이메일 가져오기 성공');
        setEmail(user?.email ?? '');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const images = async () => {
    try {
      const { data: imagesData, error: imagesErr } = await supabase.from('images').select('*');
      if (imagesErr) {
        console.error('데이터 가져오기 실패: ', imagesErr);
      } else {
        console.log('데이터 가져오기 성공: ' + imagesData);
        setData(imagesData as Images[]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) console.log('로그아웃 실패: ' + error);
      else {
        console.log('로그아웃 성공');
        alert('로그아웃 되었습니다');
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex justify-between p-30 min-h-screen bg-pink-100">
      <div className="text-start">
        <h1 className="font-semibold text-[50px] pl-30 pt-20">Login Successful !</h1>
        <p className="pl-30 text-[15px] leading-[35px]">{email}님 반값습니다!</p>
        <a href="/sendEmailPW" className="text-center text-sm pl-30">
          비밀번호 변경하기
        </a>
        <br></br>
        <Button onClick={logout} className="ml-30 mt-90">
          logout
        </Button>
      </div>
      <div className="mt-[40px]">
        <a href="/addImage" className="font-bold text-[15px] ml-[910px]">
          추가하기
        </a>
        <Table className="w-[700px] mt-[20px] mr-[100px] bg-gray-100 rounded-md">
          <TableCaption>A list of your images.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] font-bold">IMAGE_ID</TableHead>
              <TableHead className="font-bold">USER_ID</TableHead>
              <TableHead className="font-bold">TITLE</TableHead>
              <TableHead className="font-bold">FILE_NAME</TableHead>
              <TableHead className="font-bold">IMAGE</TableHead>
              <TableHead className="text-right font-bold">DATE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.image_id}>
                <TableCell className="font-medium">{item.image_id}</TableCell>
                <TableCell>{item.user_id}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>
                  <a href={`/detail/${item.image_id}`}>{item.file_name}</a>
                </TableCell>
                <TableCell>
                  <img src={`${process.env.NEXT_PUBLIC_IMAGE_LINK}/uploads/${item?.file_name}`} alt="image" />
                </TableCell>
                <TableCell className="text-right">{item.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
