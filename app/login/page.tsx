'use client';

import { useState } from 'react';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const test = () => {
    console.log(email);

    // api 요청
  };

  return (
    <main className="flex justify-between p-30 min-h-screen bg-pink-100">
      <div className="text-start">
        <h1 className="font-semibold text-[60px] pl-35 pt-20">Hey, Hello!</h1>
        <p className="pl-35 text-[20px] leading-[35px]">Welcome to this app</p>
      </div>
      <Card className="w-2/5 mr-35">
        <CardHeader>
          <CardTitle className="text-center text-2xl pt-20">LOGIN</CardTitle>
          <CardContent className="text-center text-sm leading-[45px]">
            <p>로그인을 해주세요</p>
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
          <Input
            className="w-2/3"
            placeholder="PASSWORD"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-2/3 mx-auto font-semibold py-6">
          LOGIN
        </Button>
        <a href="./signup" className="text-center text-sm pt-10">
          회원가입 하러가기
        </a>
      </Card>
    </main>
  );
}
