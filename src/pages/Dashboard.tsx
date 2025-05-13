import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Calendar, FileText, Heart, Search, ShoppingCart, User, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const featureCards = [{
  title: '个人信息',
  description: '管理您的基本信息、身高体重等个人健康数据',
  icon: User,
  color: 'bg-blue-100',
  iconColor: 'text-medical',
  link: '/profile'
}, {
  title: '症状记录',
  description: '记录身体不适症状，方便医生了解您的健康状况',
  icon: Heart,
  color: 'bg-red-100',
  iconColor: 'text-red-500',
  link: '/symptoms'
}, {
  title: '健康问诊',
  description: '填写详细的健康问卷，上传检查报告',
  icon: FileText,
  color: 'bg-amber-100',
  iconColor: 'text-amber-500',
  link: '/questionnaire'
}, {
  title: '智能穿戴',
  description: '查看您的智能设备记录的健康数据和趋势',
  icon: Activity,
  color: 'bg-purple-100',
  iconColor: 'text-purple-500',
  link: '/wearables'
}, {
  title: '家庭管理',
  description: '管理家庭成员健康信息，关注亲人健康',
  icon: Users,
  color: 'bg-green-100',
  iconColor: 'text-health',
  link: '/family'
}, {
  title: '找医生',
  description: '搜索专业医生，在线预约咨询',
  icon: Search,
  color: 'bg-cyan-100',
  iconColor: 'text-cyan-500',
  link: '/doctors'
}, {
  title: '健康商城',
  description: '购买健康产品，提升生活品质',
  icon: ShoppingCart,
  color: 'bg-orange-100',
  iconColor: 'text-orange-500',
  link: '/shop'
}, {
  title: '预约检查',
  description: '在线预约体检和医疗检查服务',
  icon: Calendar,
  color: 'bg-indigo-100',
  iconColor: 'text-indigo-500',
  link: '/appointments'
}];

const Dashboard = () => {
  return <Layout>
      <div className="container px-4">
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-3xl font-bold text-medical mb-2">欢迎使用译脉中医健康管理平台</h1>
          <p className="text-muted-foreground max-w-2xl">全面的多模态数字化健康管理解决方案，连接智能设备数据，提供专业健康分析和建议</p>
        </div>
        
        <section className="mb-12 bg-medical/5 rounded-lg p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:max-w-lg mb-6 md:mb-0">
              <h2 className="text-xl font-semibold text-medical mb-2">开始您的健康管理</h2>
              <p className="text-muted-foreground mb-4">
                完善个人信息，连接您的智能设备，获取个性化的健康建议和分析。
              </p>
              <Button className="bg-medical hover:bg-medical-dark" asChild>
                <Link to="/profile">立即开始</Link>
              </Button>
            </div>
            <div className="w-full md:w-auto">
              <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Health Management" className="rounded-md max-h-48 w-auto object-cover" />
            </div>
          </div>
        </section>
        
        <h2 className="text-2xl font-semibold mb-6">功能与服务</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featureCards.map((card, index) => <Card key={index} className="health-card overflow-hidden">
              <CardHeader className="pb-2">
                <div className={`w-10 h-10 rounded-full ${card.color} flex items-center justify-center mb-3`}>
                  <card.icon className={`h-5 w-5 ${card.iconColor}`} />
                </div>
                <CardTitle className="text-xl">{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{card.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full justify-start hover:bg-transparent hover:text-medical" asChild>
                  <Link to={card.link}>查看详情</Link>
                </Button>
              </CardFooter>
            </Card>)}
        </div>
        
        <div className="mt-16 bg-muted rounded-lg p-6 text-center">
          <h3 className="text-lg font-medium mb-2">健康云诊断</h3>
          <p className="text-muted-foreground mb-4 max-w-xl mx-auto">
            基于您的健康数据和症状记录，使用AI技术进行初步分析和健康建议
          </p>
          <Button className="bg-health hover:bg-health-dark mx-auto">
            开始云诊断
          </Button>
        </div>
      </div>
    </Layout>;
};
export default Dashboard;
