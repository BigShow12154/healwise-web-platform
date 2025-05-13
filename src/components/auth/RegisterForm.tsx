
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
import { Eye, EyeOff } from 'lucide-react';
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  idNumber: z
    .string()
    .min(1, { message: "请输入身份证号码" })
    .regex(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, { message: "请输入正确的身份证号码格式" }),
  name: z
    .string()
    .min(1, { message: "请输入您的姓名" })
    .regex(/^[\u4e00-\u9fa5]{2,}$/, { message: "请输入正确的中文姓名" }),
  mobile: z
    .string()
    .min(1, { message: "请输入手机号码" })
    .regex(/^1[3-9]\d{9}$/, { message: "请输入正确的手机号码格式" }),
  verificationCode: z
    .string()
    .min(1, { message: "请输入验证码" }),
  password: z
    .string()
    .min(8, { message: "密码至少需要8个字符" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/, {
      message: "密码必须包含大小写字母、数字和特殊字符",
    }),
  confirmPassword: z
    .string()
    .min(1, { message: "请确认您的密码" }),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "两次输入的密码不一致",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idNumber: '',
      name: '',
      mobile: '',
      verificationCode: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      console.log('Register form submitted:', values);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      toast.success("注册成功");
    } catch (error) {
      toast.error("注册失败，请稍后再试");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl text-center text-medical">新用户注册</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="idNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="health-form-label">身份证</FormLabel>
                  <FormControl>
                    <Input
                      className="health-input"
                      placeholder="请输入身份证号码"
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="health-form-label">姓名</FormLabel>
                  <FormControl>
                    <Input
                      className="health-input"
                      placeholder="请输入您的姓名"
                      {...field}
                    />
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
                  <FormLabel className="health-form-label">手机号</FormLabel>
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="health-form-label">设置密码</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="health-input pr-10"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="请设置密码"
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
                  <p className="text-xs text-muted-foreground mt-1">
                    密码必须包含大小写字母、数字和特殊字符
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="health-form-label">确认密码</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="health-input pr-10"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="请再次输入密码"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-health hover:bg-health-dark" 
              disabled={isLoading}
            >
              {isLoading ? "注册中..." : "注册"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
