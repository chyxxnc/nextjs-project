'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Updatepw() {
  const [password, setPassword] = useState('');
  const supabase = createClient();

  const test = async () => {
    console.log(password);

    // api 요청
    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      console.log('비밀번호 변경 실패: ' + error.message);
      alert(error.message);
    } else {
      console.log('비밀번호 변경 성공: ' + data);
      redirect('/login');
    }
  };

  return (
    <main className="flex justify-between p-30 min-h-screen bg-pink-100">
      <div className="text-start">
        <h1 className="font-semibold text-[50px] pl-35 pt-20">Hey, Change PW!</h1>
      </div>
      <Card className="w-2/5 mr-35">
        <CardHeader>
          <CardTitle className="text-center text-2xl pt-20">CHANGE PW</CardTitle>
          <CardContent className="text-center text-sm leading-[45px]">
            <p>비밀번호를 변경해주세요</p>
          </CardContent>
        </CardHeader>
        <div className="flex flex-col items-center space-y-3">
          <Input
            className="w-2/3"
            placeholder="PASSWORD"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button onClick={test} className="w-2/3 mx-auto font-semibold py-6">
          UPDATE
        </Button>
      </Card>
    </main>
  );
}
