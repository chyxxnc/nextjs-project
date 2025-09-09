'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function AddImage() {
  const supabase = createClient();
  const [imgSrc, setImgSrc] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [userId, setUserId] = useState('');

  // 지금 로그인 되어있는 사람의 UID 가져오기
  useEffect(() => {
    const User = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUserId(data.user.id);
      } else {
        console.error('사용자 정보를 가져오지 못했습니다.', error);
      }
    };

    User();
  }, []);

  // 이미지를 supabase storage에 저장
  const saveImageToStorage = async () => {
    if (!file) {
      alert('파일을 선택하세요');
      return;
    }

    const fileName = `${file.name}`; // 파일명
    const { data, error } = await supabase.storage.from('images').upload(`uploads/${fileName}`, file);

    if (data) {
      alert('업로드 성공: ' + data);
    } else {
      alert('업로드 실패: ' + error.message);
    }

    // DB 테이블에 저장
    await supabase.from('images').insert({
      user_id: userId,
      image_path: `uploads/${fileName}`,
      image_name: `${fileName}`,
      created_at: new Date(),
    });
  };

  // 이미지 미리 보여주기
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImgSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="flex justify-center items-start min-h-screen pt-30 pb-30 bg-pink-100">
      <Card className="w-[550px]">
        <CardHeader>
          <CardTitle className="text-center text-2xl pt-10">ADD IMAGE</CardTitle>
          <CardContent className="text-center text-sm leading-[45px]">
            <p>이미지를 추가해주세요</p>
          </CardContent>
        </CardHeader>

        <div className="flex flex-col items-center space-y-4 px-10">
          <Input className="w-full" type="file" accept="image/*" onChange={handleImageChange} />
          {imgSrc && <img src={imgSrc} alt="미리보기" className="w-full" />}

          <Button className="w-full font-semibold py-6" onClick={saveImageToStorage}>
            ADD
          </Button>
        </div>
        <a href="/home" className="text-center text-sm">
          돌아가기
        </a>
      </Card>
    </main>
  );
}
