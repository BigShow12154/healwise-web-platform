
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  gender: z.string({
    required_error: "请选择性别",
  }),
  height: z.coerce.number()
    .min(50, { message: "身高必须大于50cm" })
    .max(250, { message: "身高必须小于250cm" }),
  weight: z.coerce.number()
    .min(20, { message: "体重必须大于20kg" })
    .max(300, { message: "体重必须小于300kg" }),
  province: z.string({
    required_error: "请选择省份",
  }),
  city: z.string({
    required_error: "请选择城市",
  }),
  district: z.string({
    required_error: "请选择区域",
  }),
  birthDate: z.date({
    required_error: "请选择出生日期",
  }),
  address: z.string()
    .min(5, { message: "请输入详细地址，至少5个字符" })
    .max(100, { message: "地址最多100个字符" }),
});

type FormValues = z.infer<typeof formSchema>;

// Mock data for illustration
const provinces = ['北京市', '上海市', '广东省', '江苏省', '浙江省'];
const cities = {
  '北京市': ['朝阳区', '海淀区', '东城区', '西城区'],
  '上海市': ['黄浦区', '静安区', '浦东新区', '徐汇区'],
  '广东省': ['广州市', '深圳市', '珠海市', '佛山市'],
  '江苏省': ['南京市', '苏州市', '无锡市', '常州市'],
  '浙江省': ['杭州市', '宁波市', '温州市', '绍兴市'],
};
const districts = {
  '朝阳区': ['三里屯', '望京', 'CBD', '奥运村'],
  '海淀区': ['中关村', '五道口', '清华大学', '北京大学'],
  '广州市': ['天河区', '越秀区', '海珠区', '白云区'],
  '深圳市': ['南山区', '福田区', '宝安区', '龙岗区'],
  '杭州市': ['西湖区', '上城区', '江干区', '下城区'],
};

const PersonalInfoForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      height: 170,
      weight: 65,
      address: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      console.log('Personal info form submitted:', values);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      toast.success("个人信息已保存");
    } catch (error) {
      toast.error("保存失败，请稍后再试");
    } finally {
      setIsLoading(false);
    }
  };

  const watchProvince = form.watch('province');
  if (watchProvince !== selectedProvince) {
    setSelectedProvince(watchProvince);
    form.setValue('city', '');
    form.setValue('district', '');
  }

  const watchCity = form.watch('city');
  if (watchCity !== selectedCity) {
    setSelectedCity(watchCity);
    form.setValue('district', '');
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl text-center text-medical">个人信息</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="health-form-label">性别</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="health-input">
                          <SelectValue placeholder="请选择性别" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">男</SelectItem>
                        <SelectItem value="female">女</SelectItem>
                        <SelectItem value="other">其他</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="health-form-label">出生日期</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "health-input pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "yyyy-MM-dd")
                            ) : (
                              <span>请选择日期</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="health-form-label">身高 (cm)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="health-input"
                        placeholder="请输入身高"
                        min={50}
                        max={250}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="health-form-label">体重 (kg)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="health-input"
                        placeholder="请输入体重"
                        min={20}
                        max={300}
                        step={0.1}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="health-form-label">省份</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="health-input">
                          <SelectValue placeholder="请选择省份" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {provinces.map((province) => (
                          <SelectItem key={province} value={province}>
                            {province}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="health-form-label">城市</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value}
                      disabled={!selectedProvince}
                    >
                      <FormControl>
                        <SelectTrigger className="health-input">
                          <SelectValue placeholder="请选择城市" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {selectedProvince && 
                          cities[selectedProvince as keyof typeof cities]?.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="health-form-label">区域</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value}
                      disabled={!selectedCity}
                    >
                      <FormControl>
                        <SelectTrigger className="health-input">
                          <SelectValue placeholder="请选择区域" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {selectedCity && 
                          districts[selectedCity as keyof typeof districts]?.map((district) => (
                            <SelectItem key={district} value={district}>
                              {district}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="health-form-label">详细地址</FormLabel>
                  <FormControl>
                    <Textarea
                      className="health-input min-h-[80px]"
                      placeholder="请输入详细地址信息"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => form.reset()}
              >
                重置
              </Button>
              <Button 
                type="submit" 
                className="bg-medical hover:bg-medical-dark" 
                disabled={isLoading}
              >
                {isLoading ? "保存中..." : "保存"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoForm;
