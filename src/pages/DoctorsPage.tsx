
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search, Heart } from "lucide-react";
import { useState } from "react";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  avatar: string;
  rating: number;
  experience: string;
  available: boolean;
}

const DoctorsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [doctors] = useState<Doctor[]>([
    {
      id: "1",
      name: "张教授",
      specialty: "中医内科",
      hospital: "上海中医药大学附属医院",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 4.9,
      experience: "30年",
      available: true,
    },
    {
      id: "2",
      name: "李医师",
      specialty: "针灸推拿",
      hospital: "北京中医医院",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 4.7,
      experience: "15年",
      available: true,
    },
    {
      id: "3",
      name: "王主任",
      specialty: "中医妇科",
      hospital: "广州中医药大学第一附属医院",
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 4.8,
      experience: "25年",
      available: false,
    },
    {
      id: "4",
      name: "陈医师",
      specialty: "中医儿科",
      hospital: "成都中医药大学附属医院",
      avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 4.6,
      experience: "18年",
      available: true,
    },
    {
      id: "5",
      name: "郑教授",
      specialty: "中医肿瘤科",
      hospital: "上海中医药大学附属岳阳医院",
      avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 4.9,
      experience: "28年",
      available: true,
    },
    {
      id: "6",
      name: "吴主任",
      specialty: "中医骨伤科",
      hospital: "南京中医药大学附属医院",
      avatar: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 4.8,
      experience: "22年",
      available: true,
    }
  ]);

  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="container px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-medical mb-2">找中医</h1>
            <p className="text-muted-foreground">寻找专业中医师，在线咨询预约</p>
          </div>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            className="pl-10" 
            placeholder="搜索医生、科室或医院"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>

        <div className="flex overflow-x-auto gap-2 pb-4 mb-4 scrollbar-hide">
          <Button variant="outline" className="rounded-full whitespace-nowrap">全部科室</Button>
          <Button variant="outline" className="rounded-full whitespace-nowrap">内科</Button>
          <Button variant="outline" className="rounded-full whitespace-nowrap">妇科</Button>
          <Button variant="outline" className="rounded-full whitespace-nowrap">儿科</Button>
          <Button variant="outline" className="rounded-full whitespace-nowrap">肿瘤科</Button>
          <Button variant="outline" className="rounded-full whitespace-nowrap">骨伤科</Button>
          <Button variant="outline" className="rounded-full whitespace-nowrap">针灸推拿</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="health-card">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <img src={doctor.avatar} alt={doctor.name} className="object-cover" />
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg flex items-center">
                        {doctor.name}
                        <span className="ml-2 text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                          {doctor.rating}分
                        </span>
                      </CardTitle>
                      <CardDescription>{doctor.specialty}</CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">所在医院</span>
                    <span className="font-medium">{doctor.hospital}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">执业经验</span>
                    <span className="font-medium">{doctor.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">可预约状态</span>
                    <span className={`font-medium ${doctor.available ? "text-health" : "text-gray-500"}`}>
                      {doctor.available ? "可预约" : "暂不可约"}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full ${doctor.available ? "bg-medical hover:bg-medical-dark" : "bg-gray-200 hover:bg-gray-300 cursor-not-allowed"}`}
                  disabled={!doctor.available}
                >
                  立即预约
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default DoctorsPage;
