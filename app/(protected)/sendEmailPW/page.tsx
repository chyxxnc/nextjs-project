'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SendEmailPW() {
  const [email, setEmail] = useState('');
  const supabase = createClient();

  const sendEmail = async () => {
    console.log(email);

    // api 요청
    const { data: updatePW, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.origin + '/resetPW',
    });

    if (error) {
      console.log('비밀번호 변경 이메일 전송 실패: ' + error.message);
      alert(error.message);
    } else {
      console.log('비밀번호 변경 이메일 전송 성공: ' + updatePW);
      alert('이메일이 전송되었습니다\n이메일에서 비밀번호를 바꿔주세요');
      redirect('/login');
    }
  };

  return (
    <main className="flex justify-between p-30 min-h-screen bg-pink-100">
      <div className="text-start">
        <h1 className="font-semibold text-[50px] pl-35 pt-20">Hey, Send Email!</h1>
      </div>
      <Card className="w-2/5 mr-35">
        <CardHeader>
          <CardTitle className="text-center text-2xl pt-20">SEND EMAIL</CardTitle>
          <CardContent className="text-center text-sm leading-[45px]">
            <p>이메일을 입력하면 비밀번호를 바꿀 수 있도록 메일이 전송됩니다</p>
          </CardContent>
        </CardHeader>
        <div className="flex flex-col items-center space-y-3">
          <Input
            className="w-2/3"
            placeholder="EMAIL"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button onClick={sendEmail} className="w-2/3 mx-auto font-semibold py-6">
          UPDATE
        </Button>
      </Card>
    </main>
  );
}
