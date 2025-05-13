
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface HealthMetricsCardProps {
  title: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'danger';
  description: string;
  min: number;
  max: number;
  icon: React.ReactNode;
}

const getStatusColor = (status: 'normal' | 'warning' | 'danger') => {
  switch (status) {
    case 'normal':
      return 'bg-green-500';
    case 'warning':
      return 'bg-amber-500';
    case 'danger':
      return 'bg-red-500';
    default:
      return 'bg-green-500';
  }
};

const HealthMetricsCard: React.FC<HealthMetricsCardProps> = ({
  title,
  value,
  unit,
  status,
  description,
  min,
  max,
  icon,
}) => {
  // Calculate percentage for progress bar
  const percentage = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);
  
  return (
    <Card className="health-card">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg">{title}</CardTitle>
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-3xl font-bold">
              {value}
              <span className="text-sm ml-1 text-muted-foreground">{unit}</span>
            </span>
            <span className={`px-2 py-1 rounded text-xs font-medium text-white ${getStatusColor(status)}`}>
              {status === 'normal' ? '正常' : status === 'warning' ? '注意' : '异常'}
            </span>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>{min}</span>
              <span>{max}</span>
            </div>
            <Progress value={percentage} className="h-2" />
          </div>
          
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthMetricsCard;
