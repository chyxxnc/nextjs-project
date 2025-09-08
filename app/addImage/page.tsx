'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import React, { useState } from 'react';

export default function AddImage() {
  const [imgSrc, setImgSrc] = useState('');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImgSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="flex justify-center items-start min-h-screen pt-30 bg-pink-100">
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

          <Button className="w-full font-semibold py-6">ADD</Button>
        </div>
        <a href="/home" className="text-center text-sm">
          돌아가기
        </a>
      </Card>
    </main>
  );
}
