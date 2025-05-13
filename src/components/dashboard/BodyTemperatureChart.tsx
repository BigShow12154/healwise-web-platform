
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// 体温数据类型
interface TemperatureDataPoint {
  time: string;
  value: number;
}

interface BodyTemperatureChartProps {
  data: TemperatureDataPoint[];
  averageTemp: number;
  minTemp: number;
  maxTemp: number;
}

const BodyTemperatureChart: React.FC<BodyTemperatureChartProps> = ({ 
  data, 
  averageTemp, 
  minTemp, 
  maxTemp 
}) => {
  return (
    <Card className="health-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">体温监测</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[35, 42]} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#F27E63" 
                strokeWidth={2}
                dot={{ r: 4 }} 
                name="体温"
                unit="°C"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 text-sm text-muted-foreground">
          平均体温: <span className="font-medium text-foreground">{averageTemp}°C</span> ·
          最高: <span className="font-medium text-foreground">{maxTemp}°C</span> ·
          最低: <span className="font-medium text-foreground">{minTemp}°C</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default BodyTemperatureChart;
