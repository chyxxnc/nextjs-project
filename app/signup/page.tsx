import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Login() {
  return (
    <main className="flex justify-between p-30 min-h-screen bg-pink-100">
      <div className="text-start">
        <h1 className="font-semibold text-[60px] pl-35 pt-20">Hey, Hello!</h1>
        <p className="pl-35 text-[20px] leading-[35px]">Welcome to this app</p>
        <p className="pl-35 text-[13px] leading-[180px]">회원가입 후 나만의 다양한 기능을 이용해 보세요</p>
      </div>
      <Card className="w-2/5 mr-35">
        <CardHeader>
          <CardTitle className="text-center text-2xl pt-20">SIGN UP</CardTitle>
          <CardContent className="text-center text-sm leading-[45px]">
            <p>회원가입을 해주세요</p>
          </CardContent>
        </CardHeader>
        <div className="flex flex-col items-center space-y-3">
          <Input className="w-2/3" placeholder="USERNAME" />
          <Input className="w-2/3" placeholder="PASSWORD" type="password" />
        </div>
        <Button type="submit" className="w-2/3 mx-auto font-semibold py-6">
          SIGN UP
        </Button>
      </Card>
    </main>
  );
}
