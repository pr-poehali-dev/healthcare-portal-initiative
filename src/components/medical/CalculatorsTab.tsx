import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';

interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  healthGroup: number;
  lastCheck: string;
  status: string;
  riskLevel: string;
  birthDate: string;
  age: number;
  bmi?: number;
  waist?: number;
  bloodPressure?: string;
  glucose?: number;
  medicalHistory?: string;
}

interface CalculatorsTabProps {
  employees: Employee[];
  selectedCalculator: string;
  setSelectedCalculator: (calculator: string) => void;
  selectedCalculatorEmployee: number | null;
  setSelectedCalculatorEmployee: (employeeId: number | null) => void;
}

export const CalculatorsTab = ({ 
  employees, 
  selectedCalculator, 
  setSelectedCalculator, 
  selectedCalculatorEmployee, 
  setSelectedCalculatorEmployee 
}: CalculatorsTabProps) => {
  const [findriscData, setFindriscData] = useState({
    age: '',
    bmi: '',
    waist: '',
    physicalActivity: '',
    vegetables: '',
    bloodPressureMeds: '',
    highGlucose: '',
    familyDiabetes: '',
  });

  const calculateFindriscScore = () => {
    let score = 0;
    
    const age = parseInt(findriscData.age);
    if (age >= 45 && age < 54) score += 2;
    else if (age >= 54 && age < 64) score += 3;
    else if (age >= 64) score += 4;

    const bmi = parseFloat(findriscData.bmi);
    if (bmi >= 25 && bmi < 30) score += 1;
    else if (bmi >= 30) score += 3;

    const waist = parseFloat(findriscData.waist);
    if (waist >= 80 && waist < 88) score += 3;
    else if (waist >= 88) score += 4;

    if (findriscData.physicalActivity === 'no') score += 2;
    if (findriscData.vegetables === 'no') score += 1;
    if (findriscData.bloodPressureMeds === 'yes') score += 2;
    if (findriscData.highGlucose === 'yes') score += 5;
    
    if (findriscData.familyDiabetes === 'yes_close') score += 5;
    else if (findriscData.familyDiabetes === 'yes_distant') score += 3;

    return score;
  };

  const getFindriscRisk = (score: number) => {
    if (score < 7) return { level: 'Низкий', color: 'text-green-600', description: 'Риск развития диабета 2 типа в течение 10 лет: 1%' };
    if (score < 12) return { level: 'Слегка повышенный', color: 'text-yellow-600', description: 'Риск развития диабета 2 типа в течение 10 лет: 4%' };
    if (score < 15) return { level: 'Умеренный', color: 'text-orange-600', description: 'Риск развития диабета 2 типа в течение 10 лет: 17%' };
    if (score < 20) return { level: 'Высокий', color: 'text-red-600', description: 'Риск развития диабета 2 типа в течение 10 лет: 33%' };
    return { level: 'Очень высокий', color: 'text-red-700', description: 'Риск развития диабета 2 типа в течение 10 лет: 50%' };
  };

  const renderFindrisc = () => {
    const selectedEmployee = selectedCalculatorEmployee 
      ? employees.find(e => e.id === selectedCalculatorEmployee)
      : null;

    const score = calculateFindriscScore();
    const risk = getFindriscRisk(score);
    const isFormFilled = Object.values(findriscData).every(v => v !== '');

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Калькулятор FINDRISC</CardTitle>
            <CardDescription>
              Оценка риска развития сахарного диабета 2 типа в течение 10 лет
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Выберите сотрудника</Label>
              <Select 
                value={selectedCalculatorEmployee?.toString() || ''} 
                onValueChange={(value) => {
                  const empId = parseInt(value);
                  setSelectedCalculatorEmployee(empId);
                  const emp = employees.find(e => e.id === empId);
                  if (emp) {
                    setFindriscData({
                      age: emp.age.toString(),
                      bmi: emp.bmi?.toString() || '',
                      waist: emp.waist?.toString() || '',
                      physicalActivity: '',
                      vegetables: '',
                      bloodPressureMeds: '',
                      highGlucose: '',
                      familyDiabetes: '',
                    });
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите сотрудника" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map(emp => (
                    <SelectItem key={emp.id} value={emp.id.toString()}>
                      {emp.name} - {emp.position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedEmployee && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Возраст</Label>
                    <Input 
                      type="number" 
                      value={findriscData.age}
                      onChange={(e) => setFindriscData({...findriscData, age: e.target.value})}
                      placeholder="Возраст"
                    />
                  </div>
                  <div>
                    <Label>Индекс массы тела (ИМТ)</Label>
                    <Input 
                      type="number" 
                      step="0.1"
                      value={findriscData.bmi}
                      onChange={(e) => setFindriscData({...findriscData, bmi: e.target.value})}
                      placeholder="ИМТ"
                    />
                  </div>
                  <div>
                    <Label>Окружность талии (см)</Label>
                    <Input 
                      type="number"
                      value={findriscData.waist}
                      onChange={(e) => setFindriscData({...findriscData, waist: e.target.value})}
                      placeholder="Окружность талии"
                    />
                  </div>
                  <div>
                    <Label>Физическая активность (минимум 30 мин/день)</Label>
                    <Select 
                      value={findriscData.physicalActivity}
                      onValueChange={(value) => setFindriscData({...findriscData, physicalActivity: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Да</SelectItem>
                        <SelectItem value="no">Нет</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Ежедневное употребление овощей/фруктов</Label>
                    <Select 
                      value={findriscData.vegetables}
                      onValueChange={(value) => setFindriscData({...findriscData, vegetables: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Да</SelectItem>
                        <SelectItem value="no">Нет</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Принимаете лекарства от давления</Label>
                    <Select 
                      value={findriscData.bloodPressureMeds}
                      onValueChange={(value) => setFindriscData({...findriscData, bloodPressureMeds: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Да</SelectItem>
                        <SelectItem value="no">Нет</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Повышенный уровень глюкозы в прошлом</Label>
                    <Select 
                      value={findriscData.highGlucose}
                      onValueChange={(value) => setFindriscData({...findriscData, highGlucose: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Да</SelectItem>
                        <SelectItem value="no">Нет</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Диабет у родственников</Label>
                    <Select 
                      value={findriscData.familyDiabetes}
                      onValueChange={(value) => setFindriscData({...findriscData, familyDiabetes: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no">Нет</SelectItem>
                        <SelectItem value="yes_distant">Да, дальние родственники</SelectItem>
                        <SelectItem value="yes_close">Да, близкие родственники</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {isFormFilled && (
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Результат оценки</span>
                        <Badge className="text-lg px-4 py-1">{score} баллов</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">Уровень риска:</span>
                          <span className={`font-bold ${risk.color}`}>{risk.level}</span>
                        </div>
                        <Progress value={(score / 26) * 100} className="h-3" />
                      </div>
                      <p className="text-sm text-muted-foreground">{risk.description}</p>
                      
                      <div className="border-t pt-4 space-y-2">
                        <h4 className="font-semibold">Рекомендации:</h4>
                        <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                          {score >= 15 && (
                            <>
                              <li>Обратиться к эндокринологу для дополнительного обследования</li>
                              <li>Провести анализ на гликированный гемоглобин (HbA1c)</li>
                            </>
                          )}
                          {score >= 12 && (
                            <>
                              <li>Контроль массы тела и окружности талии</li>
                              <li>Увеличить физическую активность до 150 мин/неделю</li>
                            </>
                          )}
                          {score >= 7 && (
                            <>
                              <li>Соблюдать здоровую диету с ограничением простых углеводов</li>
                              <li>Регулярный контроль уровня глюкозы крови</li>
                            </>
                          )}
                          <li>Ежегодное профилактическое обследование</li>
                        </ul>
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1">
                          <Icon name="save" className="h-4 w-4 mr-2" />
                          Сохранить в карту
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Icon name="printer" className="h-4 w-4 mr-2" />
                          Распечатать
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Медицинские калькуляторы и шкалы</CardTitle>
          <CardDescription>Инструменты для оценки рисков и состояния здоровья</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${selectedCalculator === 'findrisc' ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setSelectedCalculator('findrisc')}
            >
              <CardContent className="p-6 text-center">
                <Icon name="activity" className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">FINDRISC</h3>
                <p className="text-sm text-muted-foreground mt-1">Риск диабета</p>
              </CardContent>
            </Card>
            <Card className="cursor-pointer transition-all hover:shadow-md opacity-50">
              <CardContent className="p-6 text-center">
                <Icon name="heart" className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <h3 className="font-semibold">SCORE</h3>
                <p className="text-sm text-muted-foreground mt-1">Сердечно-сосудистый риск</p>
              </CardContent>
            </Card>
            <Card className="cursor-pointer transition-all hover:shadow-md opacity-50">
              <CardContent className="p-6 text-center">
                <Icon name="calculator" className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <h3 className="font-semibold">ИМТ</h3>
                <p className="text-sm text-muted-foreground mt-1">Индекс массы тела</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {selectedCalculator === 'findrisc' && renderFindrisc()}
    </div>
  );
};
