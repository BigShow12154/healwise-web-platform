
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// 血氧数据类型
interface BloodOxygenDataPoint {
  time: string;
  value: number;
}

interface BloodOxygenChartProps {
  data: BloodOxygenDataPoint[];
  averageValue: number;
  minValue: number;
  maxValue: number;
}

const BloodOxygenChart: React.FC<BloodOxygenChartProps> = ({ 
  data, 
  averageValue, 
  minValue, 
  maxValue 
}) => {
  return (
    <Card className="health-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">血氧饱和度</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="bloodOxygen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1EAEDB" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#1EAEDB" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" />
              <YAxis domain={[90, 100]} />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#1EAEDB"
                fillOpacity={1}
                fill="url(#bloodOxygen)"
                name="血氧"
                unit="%"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 text-sm text-muted-foreground">
          平均血氧水平: <span className="font-medium text-foreground">{averageValue}%</span> ·
          最高: <span className="font-medium text-foreground">{maxValue}%</span> ·
          最低: <span className="font-medium text-foreground">{minValue}%</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default BloodOxygenChart;
