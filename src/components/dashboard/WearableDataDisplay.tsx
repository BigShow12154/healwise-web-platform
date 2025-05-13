
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Activity, ThermometerSun } from 'lucide-react';
import { toast } from 'sonner';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import BloodOxygenChart from './BloodOxygenChart';
import BodyTemperatureChart from './BodyTemperatureChart';
import HealthMetricsCard from './HealthMetricsCard';

// Mock data for heart rate
const heartRateData = [
  { time: '00:00', value: 68 },
  { time: '03:00', value: 65 },
  { time: '06:00', value: 72 },
  { time: '09:00', value: 85 },
  { time: '12:00', value: 90 },
  { time: '15:00', value: 87 },
  { time: '18:00', value: 95 },
  { time: '21:00', value: 78 },
];

// Mock data for sleep
const sleepData = [
  { date: '周一', deep: 2.5, light: 4.5, awake: 0.5 },
  { date: '周二', deep: 3.0, light: 4.0, awake: 0.2 },
  { date: '周三', deep: 2.0, light: 3.5, awake: 1.0 },
  { date: '周四', deep: 2.8, light: 4.2, awake: 0.3 },
  { date: '周五', deep: 3.2, light: 3.8, awake: 0.4 },
  { date: '周六', deep: 3.5, light: 5.0, awake: 0.2 },
  { date: '周日', deep: 3.0, light: 4.5, awake: 0.3 },
];

// Mock data for steps
const stepsData = [
  { date: '周一', steps: 8245 },
  { date: '周二', steps: 9345 },
  { date: '周三', steps: 7654 },
  { date: '周四', steps: 10234 },
  { date: '周五', steps: 8543 },
  { date: '周六', steps: 12345 },
  { date: '周日', steps: 9876 },
];

// Mock data for blood oxygen
const bloodOxygenData = [
  { time: '00:00', value: 97 },
  { time: '03:00', value: 96 },
  { time: '06:00', value: 95 },
  { time: '09:00', value: 98 },
  { time: '12:00', value: 97 },
  { time: '15:00', value: 96 },
  { time: '18:00', value: 97 },
  { time: '21:00', value: 96 },
];

// Mock data for body temperature
const bodyTemperatureData = [
  { time: '00:00', value: 36.5 },
  { time: '03:00', value: 36.3 },
  { time: '06:00', value: 36.4 },
  { time: '09:00', value: 36.7 },
  { time: '12:00', value: 37.0 },
  { time: '15:00', value: 36.9 },
  { time: '18:00', value: 36.8 },
  { time: '21:00', value: 36.6 },
];

const WearableDataDisplay = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'heart', 'sleep', 'activity'

  // 计算血氧平均值、最高值和最低值
  const avgBloodOxygen = Math.round(bloodOxygenData.reduce((sum, item) => sum + item.value, 0) / bloodOxygenData.length);
  const maxBloodOxygen = Math.max(...bloodOxygenData.map(item => item.value));
  const minBloodOxygen = Math.min(...bloodOxygenData.map(item => item.value));

  // 计算体温平均值、最高值和最低值
  const avgBodyTemp = Number((bodyTemperatureData.reduce((sum, item) => sum + item.value, 0) / bodyTemperatureData.length).toFixed(1));
  const maxBodyTemp = Math.max(...bodyTemperatureData.map(item => item.value));
  const minBodyTemp = Math.min(...bodyTemperatureData.map(item => item.value));

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("数据已更新");
    }, 1000);
  };

  const handleHistoryQuery = () => {
    toast.info("历史数据查询功能即将上线");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-medical">智能穿戴设备数据</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleHistoryQuery}
            className="flex items-center gap-1"
          >
            <Calendar className="h-4 w-4" />
            <span>历史数据</span>
          </Button>
          <Button
            onClick={handleRefresh}
            className="bg-medical hover:bg-medical-dark"
            disabled={isRefreshing}
          >
            {isRefreshing ? "更新中..." : "更新数据"}
          </Button>
        </div>
      </div>
      
      {/* 数据类型切换选项卡 */}
      <div className="flex flex-wrap gap-2 border-b pb-4">
        <Button 
          variant={activeTab === 'all' ? 'default' : 'outline'}
          onClick={() => setActiveTab('all')}
          className={activeTab === 'all' ? 'bg-medical hover:bg-medical-dark' : ''}
        >
          全部数据
        </Button>
        <Button 
          variant={activeTab === 'heart' ? 'default' : 'outline'}
          onClick={() => setActiveTab('heart')}
          className={activeTab === 'heart' ? 'bg-medical hover:bg-medical-dark' : ''}
        >
          心率 & 血氧
        </Button>
        <Button 
          variant={activeTab === 'sleep' ? 'default' : 'outline'}
          onClick={() => setActiveTab('sleep')}
          className={activeTab === 'sleep' ? 'bg-medical hover:bg-medical-dark' : ''}
        >
          睡眠
        </Button>
        <Button 
          variant={activeTab === 'activity' ? 'default' : 'outline'}
          onClick={() => setActiveTab('activity')}
          className={activeTab === 'activity' ? 'bg-medical hover:bg-medical-dark' : ''}
        >
          活动 & 体温
        </Button>
      </div>
      
      {/* 健康指标统计卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <HealthMetricsCard
          title="静息心率"
          value={72}
          unit="bpm"
          status="normal"
          description="您的静息心率处于正常范围，表明心脏健康状况良好。"
          min={60}
          max={100}
          icon={<Activity className="h-4 w-4 text-medical" />}
        />
        <HealthMetricsCard
          title="血氧水平"
          value={97}
          unit="%"
          status="normal"
          description="您的血氧饱和度正常，肺功能良好。"
          min={90}
          max={100}
          icon={<Activity className="h-4 w-4 text-cyan-500" />}
        />
        <HealthMetricsCard
          title="平均体温"
          value={36.7}
          unit="°C"
          status="normal"
          description="您的体温在正常范围内，无发热症状。"
          min={36}
          max={38}
          icon={<ThermometerSun className="h-4 w-4 text-amber-500" />}
        />
        <HealthMetricsCard
          title="日均步数"
          value={9463}
          unit="步"
          status="normal"
          description="您的日均步数达标，身体活动水平良好。"
          min={0}
          max={15000}
          icon={<Activity className="h-4 w-4 text-green-500" />}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 根据选项卡显示不同图表 */}
        {(activeTab === 'all' || activeTab === 'heart') && (
          <>
            {/* Heart Rate Card */}
            <Card className="health-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">心率监测</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={heartRateData}>
                      <defs>
                        <linearGradient id="heartRate" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1E88E5" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#1E88E5" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="time" />
                      <YAxis domain={[50, 120]} />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#1E88E5" 
                        fillOpacity={1} 
                        fill="url(#heartRate)" 
                        name="心率"
                        unit="bpm"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  平均心率: <span className="font-medium text-foreground">82 bpm</span> · 
                  最高心率: <span className="font-medium text-foreground">95 bpm</span> · 
                  最低心率: <span className="font-medium text-foreground">65 bpm</span>
                </div>
              </CardContent>
            </Card>
            
            {/* Blood Oxygen Chart */}
            <BloodOxygenChart 
              data={bloodOxygenData}
              averageValue={avgBloodOxygen}
              minValue={minBloodOxygen}
              maxValue={maxBloodOxygen}
            />
          </>
        )}
        
        {(activeTab === 'all' || activeTab === 'sleep') && (
          /* Sleep Card */
          <Card className="health-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">睡眠质量</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sleepData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="deep" name="深度睡眠" stackId="a" fill="#1E88E5" unit="h" />
                    <Bar dataKey="light" name="浅度睡眠" stackId="a" fill="#64B5F6" unit="h" />
                    <Bar dataKey="awake" name="清醒" stackId="a" fill="#E1F5FE" unit="h" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                平均睡眠时长: <span className="font-medium text-foreground">7.4 小时</span> · 
                深度睡眠: <span className="font-medium text-foreground">2.9 小时</span>
              </div>
            </CardContent>
          </Card>
        )}
        
        {(activeTab === 'all' || activeTab === 'activity') && (
          <>
            {/* Steps Card */}
            <Card className="health-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">每日步数</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stepsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar 
                        dataKey="steps" 
                        name="步数" 
                        fill="#4CAF50" 
                        radius={[4, 4, 0, 0]} 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  日均步数: <span className="font-medium text-foreground">9,463</span> · 
                  本周总步数: <span className="font-medium text-foreground">66,242</span>
                </div>
              </CardContent>
            </Card>
            
            {/* Body Temperature Chart */}
            <BodyTemperatureChart 
              data={bodyTemperatureData}
              averageTemp={avgBodyTemp}
              minTemp={minBodyTemp}
              maxTemp={maxBodyTemp}
            />
          </>
        )}
      </div>
      
      {/* 健康建议和提醒 */}
      <Card className="bg-muted/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">健康建议</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-medical mr-2">•</span> 
              您的血氧水平稳定，但偶有轻微波动，建议保持规律作息，睡眠时保持房间通风。
            </li>
            <li className="flex items-start">
              <span className="text-health mr-2">•</span> 
              心率在正常范围内，但有时波动较大，可能与情绪或运动强度有关，建议适当调整运动强度。
            </li>
            <li className="flex items-start">
              <span className="text-amber-500 mr-2">•</span> 
              体温记录显示正常，无异常波动，请继续保持良好的生活习惯。
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span> 
              步数达标，活动量适中，有助于维持健康体重和增强心肺功能。
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default WearableDataDisplay;
