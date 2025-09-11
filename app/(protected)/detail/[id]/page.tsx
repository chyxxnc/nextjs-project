'use client';

import { createClient } from '@/utils/supabase/client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Table, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type Images = {
  version_id: number;
  image_id: number;
  user_id: string;
  version_number: number;
  file_name: string;
  file_path: string;
  created_at: string;
};

export default function Detail() {
  const supabase = createClient();
  const { id } = useParams();
  const [imageData, setImageData] = useState<Images | null>(null);

  useEffect(() => {
    const userData = async () => {
      const { data, error } = await supabase.from('image_versions').select('*').eq('image_id', id).single();
      if (error) console.error('특정 아이디의 값 가져오기 실패 ' + error);
      else {
        console.log('특정 아이디의 값 가져오기 성공 ' + data);
        setImageData(data);
      }
    };
    userData();
  }, [id, supabase]);

  return (
    <main className="p-30 min-h-screen bg-pink-100 flex flex-col items-center">
      <div>
        <a href="/home" className="text-sm text-center">
          돌아가기
        </a>{' '}
        |{' '}
        <a href={`/editImage/${imageData?.image_id}`} className="text-sm text-center">
          수정하기
        </a>
      </div>
      <p className="text-sm mt-[10px]">{imageData?.version_number} 번째 수정</p>
      <Table className="w-[700px] mt-[20px] bg-gray-100 rounded-md mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] font-bold">VERSION_ID</TableHead>
            <TableCell className="font-medium">{imageData?.version_id}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="w-[100px] font-bold">IMAGE_ID</TableHead>
            <TableCell className="font-medium">{imageData?.image_id}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="w-[100px] font-bold">USER_ID</TableHead>
            <TableCell className="font-medium">{imageData?.user_id}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="w-[100px] font-bold">FILE_NAME</TableHead>
            <TableCell className="font-medium">{imageData?.file_name}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="w-[100px] font-bold">IMAGE</TableHead>
            <TableCell className="font-medium">
              <img src={imageData?.file_path} alt="image" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="w-[100px] font-bold">DATE</TableHead>
            <TableCell className="font-medium">{imageData?.created_at}</TableCell>
          </TableRow>
        </TableHeader>
      </Table>
    </main>
  );
}
