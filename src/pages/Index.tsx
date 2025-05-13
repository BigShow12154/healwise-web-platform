
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Index = () => {
  useEffect(() => {
    document.title = 'HealWise - 健康管理平台';
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full bg-white border-b py-4 px-6">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-medical" />
            <span className="text-xl font-bold text-medical">HealWise</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" size="sm">
              <Link to="/login">登录</Link>
            </Button>
            <Button asChild size="sm" className="bg-medical hover:bg-medical-dark">
              <Link to="/register">注册</Link>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <section className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50">
          <div className="container px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-medical tracking-tight mb-6">
              全方位健康管理平台
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
              通过智能穿戴设备数据分析，为您和您的家人提供个性化健康管理服务
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                className="text-lg py-6 px-8 bg-medical hover:bg-medical-dark"
              >
                <Link to="/dashboard">进入平台</Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                className="text-lg py-6 px-8"
              >
                <Link to="/register">免费注册</Link>
              </Button>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container px-4">
            <h2 className="text-3xl font-bold text-center mb-12">平台功能</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-medical" />
                </div>
                <h3 className="text-xl font-semibold mb-2">健康数据记录</h3>
                <p className="text-gray-600">
                  从智能穿戴设备收集数据，持续监测您的健康状况
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-health" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">健康报告分析</h3>
                <p className="text-gray-600">
                  基于您的健康数据提供专业分析和建议
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">在线医生咨询</h3>
                <p className="text-gray-600">
                  连接专业医生，获取个性化健康建议
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">家庭健康管理</h3>
                <p className="text-gray-600">
                  为全家人建立健康档案，共同管理健康
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">症状记录与分析</h3>
                <p className="text-gray-600">
                  记录身体不适，获取初步诊断建议
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">健康产品商城</h3>
                <p className="text-gray-600">
                  购买专业健康产品，提升生活品质
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-blue-50">
          <div className="container px-4 text-center">
            <h2 className="text-3xl font-bold mb-12">立即开始您的健康管理</h2>
            <Button 
              asChild 
              size="lg" 
              className="text-lg py-6 px-8 bg-medical hover:bg-medical-dark"
            >
              <Link to="/register">免费注册</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-900 text-white py-8">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-medical-light" />
                <span className="text-lg font-bold text-medical-light">HealWise</span>
              </div>
              <p className="text-sm text-gray-400 mt-1">
                您的全方位健康管理解决方案
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <a href="#" className="text-gray-300 hover:text-white">关于我们</a>
              <a href="#" className="text-gray-300 hover:text-white">隐私政策</a>
              <a href="#" className="text-gray-300 hover:text-white">服务条款</a>
              <a href="#" className="text-gray-300 hover:text-white">联系我们</a>
            </div>
          </div>
          
          <div className="mt-8 pt-4 border-t border-gray-800 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} HealWise健康管理平台. 保留所有权利.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
