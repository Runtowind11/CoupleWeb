import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-100 to-purple-100 px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="items-center text-center">
          <Heart className="mb-2 h-8 w-8 fill-rose-500 text-rose-500" />
          <CardTitle className="text-xl">管理员登录</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">邮箱</label>
            <Input type="email" placeholder="请输入邮箱" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">密码</label>
            <Input type="password" placeholder="请输入密码" />
          </div>
          <Button className="w-full bg-rose-500 text-white hover:bg-rose-600">
            登录
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
