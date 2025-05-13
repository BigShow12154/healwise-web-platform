
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { PlusCircle } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, { message: "姓名至少需要2个字符" }),
  relation: z.string().min(1, { message: "请选择关系" }),
  idNumber: z.string().min(18, { message: "请输入有效的身份证号" }).max(18),
  phone: z.string().min(11, { message: "请输入有效的手机号" }).max(11),
});

interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  idNumber: string;
  phone: string;
  avatar: string;
  lastCheckup: string;
}

const FamilyPage = () => {
  const [members, setMembers] = useState<FamilyMember[]>([
    {
      id: "1",
      name: "王晓红",
      relation: "母亲",
      idNumber: "310************123",
      phone: "138********",
      avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      lastCheckup: "2024-04-15",
    },
    {
      id: "2",
      name: "王大明",
      relation: "父亲",
      idNumber: "310************456",
      phone: "139********",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      lastCheckup: "2024-03-22",
    },
  ]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      relation: "",
      idNumber: "",
      phone: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newMember: FamilyMember = {
      id: Date.now().toString(),
      name: values.name,
      relation: values.relation,
      idNumber: values.idNumber,
      phone: values.phone,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      lastCheckup: "尚未进行体检",
    };
    setMembers([...members, newMember]);
    form.reset();
  };

  const handleDelete = (id: string) => {
    if (confirm("确定要删除此家庭成员吗？")) {
      setMembers(members.filter(member => member.id !== id));
    }
  };

  return (
    <Layout>
      <div className="container px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-medical mb-2">家庭健康管理</h1>
            <p className="text-muted-foreground">管理您家庭成员的健康信息，共同关注家庭健康</p>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button className="mt-4 md:mt-0 bg-medical hover:bg-medical-dark">
                <PlusCircle className="h-4 w-4 mr-2" />
                添加家庭成员
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>添加家庭成员</SheetTitle>
                <SheetDescription>
                  请填写家庭成员的基本信息，以便为他们创建健康档案
                </SheetDescription>
              </SheetHeader>
              <div className="py-4">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>姓名</FormLabel>
                          <FormControl>
                            <Input placeholder="请输入家庭成员姓名" {...field} />
                          </FormControl>
                          <FormDescription>请填写真实姓名</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="relation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>关系</FormLabel>
                          <FormControl>
                            <Input placeholder="例如：父母、子女、配偶" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="idNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>身份证号</FormLabel>
                          <FormControl>
                            <Input placeholder="请输入18位身份证号" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>联系电话</FormLabel>
                          <FormControl>
                            <Input placeholder="请输入手机号码" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full bg-medical hover:bg-medical-dark mt-4"
                    >
                      添加成员
                    </Button>
                  </form>
                </Form>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((member) => (
            <Card key={member.id} className="health-card">
              <CardHeader className="pb-2 flex flex-row items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <img src={member.avatar} alt={member.name} className="object-cover" />
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription>{member.relation}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">身份证号</span>
                    <span>{member.idNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">联系电话</span>
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">上次体检</span>
                    <span>{member.lastCheckup}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="w-1/2" asChild>
                  <a href={`/family/${member.id}`}>查看档案</a>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-1/2 ml-2 hover:bg-red-50 hover:text-red-600" 
                  onClick={() => handleDelete(member.id)}
                >
                  删除
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default FamilyPage;
