
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
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

const WearableDataDisplay = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        
        {/* Sleep Card */}
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
        
        {/* Add more cards for other metrics */}
      </div>
    </div>
  );
};

export default WearableDataDisplay;
