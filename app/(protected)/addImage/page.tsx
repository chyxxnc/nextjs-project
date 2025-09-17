'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function AddImage() {
  const supabase = createClient();
  const router = useRouter();
  const [imgSrc, setImgSrc] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [userId, setUserId] = useState('');
  const [title, setTitle] = useState('');
  const [buttonUI, setButtonUI] = useState<'local' | 'ai'>('local');

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

  // 데이터 스토리지와 디비에 저장
  const saveImageToStorage = async () => {
    if (!file) {
      alert('파일을 선택하세요');
      return;
    }

    const fileName = `${Date.now()}_${file.name}`; // 파일명

    try {
      // 이미지를 supabase storage에 저장
      const { data, error } = await supabase.storage.from('images').upload(`uploads/${fileName}`, file);

      if (!data || error) {
        alert('업로드 실패: ' + error.message);
        return;
      } else {
        alert('업로드 성공');
      }
    } catch (error) {
      console.log(error);
      return;
    }

    // images DB 테이블에 저장
    try {
      const { data: imgDBData, error: imgDBErr } = await supabase
        .from('images')
        .insert({
          user_id: userId,
          title: title,
          file_name: `${fileName}`,
          created_at: new Date(),
        })
        .select();

      if (imgDBErr) {
        console.log('데이터 삽입 실패: ', imgDBErr);
        return;
      }

      const imageID = imgDBData[0].image_id;

      // image_versions DB 테이블에 저장
      const { data: imgverDBData, error: imgverDBError } = await supabase.from('image_versions').insert({
        image_id: imageID,
        user_id: userId,
        version_number: 0,
        file_name: `${fileName}`,
        file_path: `${process.env.NEXT_PUBLIC_IMAGE_LINK}/uploads/${fileName}`,
        created_at: new Date(),
      });

      if (imgverDBError) {
        console.log('데이터 삽입 실패: ' + imgverDBError);
      }
      router.push('/home');
    } catch (error) {
      console.log(error);
    }
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
          <div className="text-center">
            <Button variant="link" onClick={() => setButtonUI('local')} className="mr-[-15px]">
              local에서 사진찾기
            </Button>
            <Button variant="link" onClick={() => setButtonUI('ai')}>
              ai로 사진 생성하기
            </Button>
          </div>
        </CardHeader>

        {buttonUI === 'local' && (
          <div className="flex flex-col items-center space-y-4 px-10">
            <CardContent className="text-center text-sm leading-[40px]">
              <p>이미지와 제목을 추가해주세요</p>
            </CardContent>
            <Input
              className="w-full"
              type="text"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></Input>
            <Input className="w-full" type="file" accept="image/*" onChange={handleImageChange} />
            {imgSrc && <img src={imgSrc} alt="미리보기" className="w-full" />}

            <Button className="w-full font-semibold py-6" onClick={saveImageToStorage}>
              ADD
            </Button>
          </div>
        )}
        {buttonUI === 'ai' && (
          <div className="flex flex-col items-center space-y-4 px-10">
            <CardContent className="text-center text-sm leading-[40px]">
              <p>생성하고 싶은 이미지의 프롬프트를 입력하세요</p>
            </CardContent>
            <Input
              className="w-full"
              type="text"
              placeholder="프롬프트를 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></Input>
            {imgSrc && <img src={imgSrc} alt="미리보기" className="w-full" />}

            <Button className="w-full font-semibold py-6" onClick={saveImageToStorage}>
              ADD
            </Button>
          </div>
        )}
        <a href="/home" className="text-center text-sm">
          돌아가기
        </a>
      </Card>
    </main>
  );
}
