'use client';

import { createClient } from '@/utils/supabase/client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Table, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type Image = {
  id: number;
  user_id: string;
  image_path: string;
  image_name: string;
  created_at: string;
};

export default function Detail() {
  const supabase = createClient();
  const { id } = useParams();
  const [imageData, setImageData] = useState<Image | null>(null);

  useEffect(() => {
    const userData = async () => {
      const { data, error } = await supabase.from('images').select('*').eq('id', id).single();
      if (error) console.error('특정 아이디의 값 가져오기 실패 ' + error);
      else {
        console.log('특정 아이디의 값 가져오기 성공 ' + data);
        setImageData(data);
      }
    };
    userData();
  }, [id, supabase]);

  return (
    <main className="p-30 min-h-screen bg-pink-100">
      <Table className="w-[700px] mt-[20px] mr-[100px] bg-gray-100 rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] font-bold">ID</TableHead>
            <TableCell className="font-medium">{imageData?.id}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="w-[100px] font-bold">USER_ID</TableHead>
            <TableCell className="font-medium">{imageData?.user_id}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="w-[100px] font-bold">IMAGE</TableHead>
            <TableCell className="w-[100px] h-[100px]">
              <img src={`${process.env.NEXT_PUBLIC_IMAGE_LINK}/${imageData?.image_path}`} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="w-[100px] font-bold">IMAGE_NAME</TableHead>
            <TableCell className="font-medium">{imageData?.image_name}</TableCell>
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
