
import Layout from '@/components/Layout';
import WearableDataDisplay from '@/components/dashboard/WearableDataDisplay';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const WearableSuggestions = [
  {
    title: '华为智能手表',
    description: '支持心率、血氧、睡眠分析等全方位健康监测',
    price: '¥1,999',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  },
  {
    title: '小米手环7',
    description: '血氧监测、精准心率、多种运动模式',
    price: '¥249',
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd962?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  },
  {
    title: 'Apple Watch Series 8',
    description: '全面健康功能，心电图、血氧监测等',
    price: '¥2,999',
    image: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  },
];

const DeviceConnectionGuides = [
  { device: '华为手表系列', steps: '打开华为运动健康App > 设备 > 添加设备 > 按照提示操作' },
  { device: '小米手环系列', steps: '打开小米运动App > 我的 > 添加设备 > 扫描设备' },
  { device: 'Apple Watch', steps: '靠近iPhone > 按照iPhone上的自动提示进行配对 > 完成设置' },
  { device: 'Fitbit设备', steps: '下载Fitbit App > 账户 > 设置设备 > 按照App提示操作' },
];

const WearablesPage = () => {
  return (
    <Layout>
      <div className="container px-4 py-6">
        <div className="flex flex-col md:flex-row items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-medical mb-2">智能穿戴设备中心</h1>
            <p className="text-muted-foreground max-w-2xl mb-4">
              查看您智能设备记录的健康数据，获取专业分析和建议，助您掌握自身健康状况
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="bg-medical hover:bg-medical-dark">
              连接新设备
            </Button>
          </div>
        </div>
        
        {/* 主要的穿戴设备数据展示区域 */}
        <WearableDataDisplay />
        
        {/* 设备连接指南 */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">设备连接指南</h2>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/3">设备名称</TableHead>
                    <TableHead>连接步骤</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {DeviceConnectionGuides.map((guide, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{guide.device}</TableCell>
                      <TableCell>{guide.steps}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        
        {/* 推荐穿戴设备 */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">推荐健康智能穿戴设备</h2>
          <Carousel className="w-full">
            <CarouselContent>
              {WearableSuggestions.map((item, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card>
                    <CardHeader className="pb-2">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="h-48 w-full object-cover rounded-md"
                      />
                    </CardHeader>
                    <CardContent>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription className="mt-2">{item.description}</CardDescription>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <span className="font-bold text-medical">{item.price}</span>
                      <Button variant="outline">了解详情</Button>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </Layout>
  );
};

export default WearablesPage;
