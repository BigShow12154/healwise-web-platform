
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type BodyPart = {
  id: string;
  name: string;
  coordinates: { x: number; y: number; width: number; height: number };
  commonSymptoms: string[];
};

const bodyParts: BodyPart[] = [
  {
    id: 'head',
    name: '头部',
    coordinates: { x: 45, y: 5, width: 10, height: 10 },
    commonSymptoms: ['头痛', '头晕', '偏头痛', '头部肿胀'],
  },
  {
    id: 'chest',
    name: '胸部',
    coordinates: { x: 45, y: 25, width: 20, height: 10 },
    commonSymptoms: ['胸痛', '呼吸困难', '心悸', '胸闷'],
  },
  {
    id: 'abdomen',
    name: '腹部',
    coordinates: { x: 45, y: 37, width: 20, height: 10 },
    commonSymptoms: ['腹痛', '腹泻', '便秘', '胃灼热'],
  },
  {
    id: 'leftArm',
    name: '左臂',
    coordinates: { x: 30, y: 25, width: 10, height: 15 },
    commonSymptoms: ['疼痛', '肿胀', '麻木', '关节疼痛'],
  },
  {
    id: 'rightArm',
    name: '右臂',
    coordinates: { x: 60, y: 25, width: 10, height: 15 },
    commonSymptoms: ['疼痛', '肿胀', '麻木', '关节疼痛'],
  },
  {
    id: 'leftLeg',
    name: '左腿',
    coordinates: { x: 40, y: 50, width: 7, height: 20 },
    commonSymptoms: ['疼痛', '肿胀', '麻木', '关节疼痛'],
  },
  {
    id: 'rightLeg',
    name: '右腿',
    coordinates: { x: 53, y: 50, width: 7, height: 20 },
    commonSymptoms: ['疼痛', '肿胀', '麻木', '关节疼痛'],
  },
  {
    id: 'back',
    name: '背部',
    coordinates: { x: 75, y: 25, width: 10, height: 20 },
    commonSymptoms: ['背痛', '脊椎疼痛', '肌肉紧张', '姿势不良疼痛'],
  },
];

const BodySymptomSelector = () => {
  const [selectedPart, setSelectedPart] = useState<BodyPart | null>(null);
  const [symptomDescription, setSymptomDescription] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleBodyPartClick = (part: BodyPart) => {
    setSelectedPart(part);
    setSelectedSymptoms([]);
    setSymptomDescription('');
    setDialogOpen(true);
  };

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSaveSymptoms = () => {
    if (selectedPart) {
      toast.success(`已记录${selectedPart.name}症状`);
      setDialogOpen(false);
      
      // In a real app, save to database here
      console.log('Saved symptoms:', {
        bodyPart: selectedPart.name,
        selectedSymptoms,
        customDescription: symptomDescription,
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl text-center text-medical">身体症状选择器</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center mb-4">
          <p className="text-sm text-muted-foreground">
            请点击身体图上的相应部位来描述您的不适症状
          </p>
        </div>
        
        <div className="relative mx-auto" style={{ width: '300px', height: '400px' }}>
          {/* Simple body outline */}
          <svg width="300" height="400" viewBox="0 0 100 80" className="mx-auto">
            {/* Head */}
            <circle cx="50" cy="10" r="5" fill="#eeeeee" stroke="#cccccc" />
            
            {/* Body */}
            <rect x="45" y="15" width="10" height="25" fill="#eeeeee" stroke="#cccccc" />
            
            {/* Arms */}
            <rect x="35" y="20" width="10" height="5" fill="#eeeeee" stroke="#cccccc" />
            <rect x="55" y="20" width="10" height="5" fill="#eeeeee" stroke="#cccccc" />
            <rect x="30" y="25" width="5" height="15" fill="#eeeeee" stroke="#cccccc" />
            <rect x="65" y="25" width="5" height="15" fill="#eeeeee" stroke="#cccccc" />
            
            {/* Legs */}
            <rect x="45" y="40" width="5" height="25" fill="#eeeeee" stroke="#cccccc" />
            <rect x="50" y="40" width="5" height="25" fill="#eeeeee" stroke="#cccccc" />
          </svg>
          
          {/* Clickable areas */}
          {bodyParts.map((part) => (
            <div
              key={part.id}
              className="absolute cursor-pointer hover:bg-medical/20 transition-colors rounded"
              style={{
                left: `${part.coordinates.x}%`,
                top: `${part.coordinates.y}%`,
                width: `${part.coordinates.width}%`,
                height: `${part.coordinates.height}%`,
              }}
              onClick={() => handleBodyPartClick(part)}
            />
          ))}
          
          {/* Label for selected body part */}
          {selectedPart && (
            <div
              className="absolute bg-medical text-white px-2 py-1 rounded text-xs"
              style={{
                left: `${selectedPart.coordinates.x}%`,
                top: `${selectedPart.coordinates.y}%`,
                transform: 'translate(-50%, -100%)',
              }}
            >
              {selectedPart.name}
            </div>
          )}
        </div>
        
        <div className="text-center mt-4">
          <p className="text-sm text-muted-foreground">
            点击身体部位开始记录症状
          </p>
        </div>
      </CardContent>
      
      {/* Dialog for symptom selection */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedPart?.name}症状记录</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex flex-wrap gap-2">
              {selectedPart?.commonSymptoms.map((symptom) => (
                <Button
                  key={symptom}
                  variant={selectedSymptoms.includes(symptom) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSymptomToggle(symptom)}
                  className={selectedSymptoms.includes(symptom) ? "bg-medical" : ""}
                >
                  {symptom}
                </Button>
              ))}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                其他症状描述:
              </label>
              <Textarea
                id="description"
                value={symptomDescription}
                onChange={(e) => setSymptomDescription(e.target.value)}
                placeholder="请详细描述您的症状..."
                className="min-h-[100px]"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSaveSymptoms} className="bg-medical hover:bg-medical-dark">
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default BodySymptomSelector;
