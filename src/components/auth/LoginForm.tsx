
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  identifier: z.string().min(1, { message: "请输入用户名/身份证" }),
  password: z.string().min(6, { message: "密码至少需要6个字符" }),
  mobile: z.string()
    .regex(/^1[3-9]\d{9}$/, { message: "请输入正确的手机号码格式" })
    .optional(),
  verificationCode: z.string().optional(),
  rememberMe: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: '',
      password: '',
      mobile: '',
      verificationCode: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      console.log('Login form submitted:', values);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      toast.success("登录成功");
    } catch (error) {
      toast.error("登录失败，请检查您的凭据");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl text-center text-medical">用户登录</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="health-form-label">用户名/身份证</FormLabel>
                  <FormControl>
                    <Input
                      className="health-input"
                      placeholder="请输入用户名或身份证号码"
                      maxLength={18}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="health-form-label">密码</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="health-input pr-10"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="请输入密码"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="health-form-label">注册手机</FormLabel>
                  <FormControl>
                    <Input
                      className="health-input"
                      placeholder="请输入手机号码"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="verificationCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="health-form-label">验证码</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input
                        className="health-input"
                        placeholder="请输入验证码"
                        {...field}
                      />
                    </FormControl>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="whitespace-nowrap"
                      onClick={() => toast.info("验证码已发送")}
                    >
                      获取验证码
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">记住密码</FormLabel>
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-medical hover:bg-medical-dark" 
              disabled={isLoading}
            >
              {isLoading ? "登录中..." : "登录"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
