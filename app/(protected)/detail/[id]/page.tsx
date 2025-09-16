'use client';

import { createClient } from '@/utils/supabase/client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Table, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useQueryState } from 'nuqs';

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
  const [imageData, setImageData] = useState<Images[]>([]);
  const [currentId, setCurrentId] = useQueryState('version_number', {
    parse: (v) => parseInt(v || '0', 10),
    serialize: (v) => String(v),
  });

  useEffect(() => {
    const userData = async () => {
      const { data, error } = await supabase.from('image_versions').select('*').eq('image_id', id);
      if (error) console.error('특정 아이디의 값 가져오기 실패 ' + error);
      else {
        console.log('특정 아이디의 값 가져오기 성공 ' + data);
        setImageData(data);
      }
    };
    userData();
  }, [id, supabase]);

  const selected = imageData[currentId ?? 0];

  return (
    <main className="p-30 min-h-screen bg-pink-100 flex flex-col items-center">
      <div>
        <a href="/home" className="text-sm text-center">
          돌아가기
        </a>{' '}
        |{' '}
        <a href={`/editImage/${selected?.image_id}`} className="text-sm text-center">
          수정하기
        </a>
      </div>
      <p className="text-sm mt-[10px]">{selected?.version_number} 번째 수정</p>
      <Table className="w-[700px] mt-[20px] bg-gray-100 rounded-md mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] font-bold">FILE_NAME</TableHead>
            <TableCell className="font-medium">{selected?.file_name}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="w-[100px] font-bold">IMAGE</TableHead>
            <TableCell className="font-medium">
              <img src={selected?.file_path} alt="image" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="w-[100px] font-bold">DATE</TableHead>
            <TableCell className="font-medium">
              {new Date(selected?.created_at).toLocaleString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
              })}
            </TableCell>
          </TableRow>
        </TableHeader>
      </Table>
      <div className="mt-[10px]">
        <Button
          className="mr-[10px]"
          onClick={() => setCurrentId((i) => Math.max((i ?? 0) - 1, 0))}
          disabled={(currentId ?? 0) === 0}
        >
          이전
        </Button>
        <Button
          onClick={() => setCurrentId((i) => Math.min((i ?? 0) + 1, imageData.length - 1))}
          disabled={(currentId ?? 0) === imageData.length - 1}
        >
          다음
        </Button>
      </div>
    </main>
  );
}
