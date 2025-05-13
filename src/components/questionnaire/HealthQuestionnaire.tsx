
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
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';
import { Upload } from 'lucide-react';

const formSchema = z.object({
  medicalHistory: z.string()
    .min(10, { message: "请详细描述您的病史，至少10个字符" })
    .max(1000, { message: "病史描述最多1000个字符" }),
  durationYears: z.coerce.number()
    .min(0, { message: "年龄不能为负数" })
    .max(100, { message: "年龄不能超过100" }),
  durationMonths: z.coerce.number()
    .min(0, { message: "月份不能为负数" })
    .max(11, { message: "月份不能超过11" }),
  treatmentHistory: z.string()
    .min(10, { message: "请详细描述您的治疗方法及效果，至少10个字符" })
    .max(1000, { message: "治疗方法及效果描述最多1000个字符" }),
});

type FormValues = z.infer<typeof formSchema>;

const HealthQuestionnaire = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      medicalHistory: '',
      durationYears: 0,
      durationMonths: 0,
      treatmentHistory: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      console.log('Health questionnaire submitted:', values);
      console.log('Uploaded files:', files);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      toast.success("问诊表已提交");
    } catch (error) {
      toast.error("提交失败，请稍后再试");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const newFiles = Array.from(fileList);
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl text-center text-medical">健康问诊表</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="medicalHistory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="health-form-label">病史</FormLabel>
                  <FormControl>
                    <Textarea
                      className="health-input min-h-[120px]"
                      placeholder="请详细描述您的病史..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="durationYears"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="health-form-label">病龄（年）</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="health-input"
                        placeholder="0"
                        min={0}
                        max={100}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="durationMonths"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="health-form-label">病龄（月）</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="health-input"
                        placeholder="0"
                        min={0}
                        max={11}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="treatmentHistory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="health-form-label">治疗方法及效果</FormLabel>
                  <FormControl>
                    <Textarea
                      className="health-input min-h-[120px]"
                      placeholder="请详细描述您曾尝试的治疗方法及其效果..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div>
              <label htmlFor="file-upload" className="health-form-label block mb-2">
                上传病例检查报告
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  multiple
                  className="sr-only"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-1 text-sm text-gray-600">
                    点击或拖拽文件到此处上传
                  </p>
                  <p className="text-xs text-gray-500">
                    支持 PDF、JPEG、PNG、DOC 格式，单个文件不超过10MB
                  </p>
                </label>
              </div>
              
              {files.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">已上传文件:</h4>
                  <ul className="space-y-2">
                    {files.map((file, index) => (
                      <li 
                        key={index} 
                        className="flex items-center justify-between bg-gray-50 p-2 rounded text-sm"
                      >
                        <span className="truncate max-w-[250px]">{file.name}</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleRemoveFile(index)}
                        >
                          删除
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-end space-x-2">
        <Button 
          variant="outline" 
          onClick={() => form.reset()}
        >
          重置
        </Button>
        <Button 
          onClick={form.handleSubmit(onSubmit)}
          className="bg-medical hover:bg-medical-dark" 
          disabled={isLoading}
        >
          {isLoading ? "提交中..." : "提交问诊表"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HealthQuestionnaire;
