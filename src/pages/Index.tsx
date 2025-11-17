import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
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

const mockEmployees: Employee[] = [
  { id: 1, name: 'Иванов Иван Иванович', position: 'Токарь', department: 'Цех №1', healthGroup: 1, lastCheck: '2024-10-15', status: 'Допущен', riskLevel: 'low', birthDate: '1985-03-12', age: 39, bmi: 24.5, waist: 88, bloodPressure: '120/80', glucose: 5.2 },
  { id: 2, name: 'Петрова Мария Сергеевна', position: 'Сварщик', department: 'Цех №2', healthGroup: 2, lastCheck: '2024-09-20', status: 'Допущен', riskLevel: 'medium', birthDate: '1978-07-23', age: 46, bmi: 27.3, waist: 95, bloodPressure: '135/85', glucose: 5.8 },
  { id: 3, name: 'Сидоров Петр Алексеевич', position: 'Маляр', department: 'Цех №1', healthGroup: 3, lastCheck: '2024-08-12', status: 'Требуется осмотр', riskLevel: 'high', birthDate: '1972-11-05', age: 52, bmi: 31.2, waist: 105, bloodPressure: '145/95', glucose: 6.5 },
  { id: 4, name: 'Козлова Анна Дмитриевна', position: 'Монтажник', department: 'Цех №3', healthGroup: 1, lastCheck: '2024-11-01', status: 'Допущен', riskLevel: 'low', birthDate: '1992-05-18', age: 32, bmi: 22.8, waist: 75, bloodPressure: '115/75', glucose: 4.9 },
  { id: 5, name: 'Морозов Сергей Павлович', position: 'Электрик', department: 'Цех №2', healthGroup: 2, lastCheck: '2024-10-28', status: 'Допущен', riskLevel: 'medium', birthDate: '1980-09-30', age: 44, bmi: 26.7, waist: 92, bloodPressure: '130/82', glucose: 5.5 },
  { id: 6, name: 'Волкова Елена Андреевна', position: 'Оператор', department: 'Цех №1', healthGroup: 1, lastCheck: '2024-11-10', status: 'Допущен', riskLevel: 'low', birthDate: '1995-02-14', age: 29, bmi: 21.5, waist: 72, bloodPressure: '118/76', glucose: 4.8 },
  { id: 7, name: 'Кузнецов Дмитрий Олегович', position: 'Слесарь', department: 'Цех №3', healthGroup: 2, lastCheck: '2024-10-05', status: 'Допущен', riskLevel: 'medium', birthDate: '1976-12-20', age: 47, bmi: 28.1, waist: 97, bloodPressure: '138/88', glucose: 5.9 },
  { id: 8, name: 'Смирнова Ольга Викторовна', position: 'Контролер', department: 'Отдел ОТК', healthGroup: 1, lastCheck: '2024-11-12', status: 'Допущен', riskLevel: 'low', birthDate: '1988-06-08', age: 36, bmi: 23.4, waist: 80, bloodPressure: '122/78', glucose: 5.1 },
  { id: 9, name: 'Попов Алексей Николаевич', position: 'Фрезеровщик', department: 'Цех №1', healthGroup: 3, lastCheck: '2024-07-15', status: 'Требуется осмотр', riskLevel: 'high', birthDate: '1970-04-25', age: 54, bmi: 32.5, waist: 108, bloodPressure: '150/98', glucose: 6.8 },
  { id: 10, name: 'Соколова Татьяна Ивановна', position: 'Упаковщик', department: 'Склад', healthGroup: 1, lastCheck: '2024-11-08', status: 'Допущен', riskLevel: 'low', birthDate: '1991-08-17', age: 33, bmi: 24.0, waist: 82, bloodPressure: '120/80', glucose: 5.0 },
  { id: 11, name: 'Новиков Владимир Петрович', position: 'Механик', department: 'Цех №2', healthGroup: 2, lastCheck: '2024-09-28', status: 'Допущен', riskLevel: 'medium', birthDate: '1979-01-12', age: 45, bmi: 27.8, waist: 96, bloodPressure: '136/86', glucose: 5.7 },
  { id: 12, name: 'Лебедева Наталья Сергеевна', position: 'Лаборант', department: 'Лаборатория', healthGroup: 1, lastCheck: '2024-11-14', status: 'Допущен', riskLevel: 'low', birthDate: '1993-10-03', age: 31, bmi: 22.1, waist: 76, bloodPressure: '116/74', glucose: 4.9 },
  { id: 13, name: 'Орлов Михаил Александрович', position: 'Штамповщик', department: 'Цех №3', healthGroup: 2, lastCheck: '2024-10-22', status: 'Допущен', riskLevel: 'medium', birthDate: '1981-03-28', age: 43, bmi: 26.2, waist: 90, bloodPressure: '132/84', glucose: 5.4 },
  { id: 14, name: 'Павлова Ирина Дмитриевна', position: 'Кладовщик', department: 'Склад', healthGroup: 1, lastCheck: '2024-11-05', status: 'Допущен', riskLevel: 'low', birthDate: '1994-07-19', age: 30, bmi: 23.7, waist: 79, bloodPressure: '119/77', glucose: 5.0 },
  { id: 15, name: 'Федоров Игорь Васильевич', position: 'Сборщик', department: 'Цех №2', healthGroup: 3, lastCheck: '2024-06-30', status: 'Требуется осмотр', riskLevel: 'high', birthDate: '1973-11-22', age: 51, bmi: 30.8, waist: 103, bloodPressure: '148/94', glucose: 6.6 },
  { id: 16, name: 'Васильева Светлана Павловна', position: 'Инспектор', department: 'Отдел ОТК', healthGroup: 1, lastCheck: '2024-11-11', status: 'Допущен', riskLevel: 'low', birthDate: '1990-04-15', age: 34, bmi: 24.3, waist: 81, bloodPressure: '121/79', glucose: 5.1 },
  { id: 17, name: 'Романов Андрей Геннадьевич', position: 'Литейщик', department: 'Цех №1', healthGroup: 2, lastCheck: '2024-10-18', status: 'Допущен', riskLevel: 'medium', birthDate: '1977-09-07', age: 47, bmi: 28.5, waist: 98, bloodPressure: '137/87', glucose: 5.8 },
  { id: 18, name: 'Николаева Екатерина Олеговна', position: 'Диспетчер', department: 'Офис', healthGroup: 1, lastCheck: '2024-11-13', status: 'Допущен', riskLevel: 'low', birthDate: '1996-01-25', age: 28, bmi: 21.8, waist: 74, bloodPressure: '117/75', glucose: 4.8 },
  { id: 19, name: 'Григорьев Константин Львович', position: 'Наладчик', department: 'Цех №3', healthGroup: 2, lastCheck: '2024-09-15', status: 'Допущен', riskLevel: 'medium', birthDate: '1982-06-11', age: 42, bmi: 27.1, waist: 93, bloodPressure: '134/85', glucose: 5.6 },
  { id: 20, name: 'Михайлова Юлия Александровна', position: 'Комплектовщик', department: 'Склад', healthGroup: 1, lastCheck: '2024-11-09', status: 'Допущен', riskLevel: 'low', birthDate: '1989-12-30', age: 34, bmi: 23.0, waist: 78, bloodPressure: '120/78', glucose: 5.0 },
];

const mockAppointments = [
  { id: 1, employeeId: 3, date: '2024-11-18', time: '09:00', type: 'Периодический', status: 'Запланирован' },
  { id: 2, employeeId: 9, date: '2024-11-18', time: '09:30', type: 'Периодический', status: 'Запланирован' },
  { id: 3, employeeId: 15, date: '2024-11-18', time: '10:00', type: 'Периодический', status: 'Запланирован' },
  { id: 4, employeeId: 7, date: '2024-11-19', time: '09:00', type: 'Плановый', status: 'Запланирован' },
  { id: 5, employeeId: 11, date: '2024-11-19', time: '10:30', type: 'Плановый', status: 'Запланирован' },
  { id: 6, employeeId: 1, date: '2024-11-20', time: '14:00', type: 'Контрольный', status: 'Запланирован' },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCalculator, setSelectedCalculator] = useState('findrisc');
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGroup, setFilterGroup] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isNewEmployeeDialogOpen, setIsNewEmployeeDialogOpen] = useState(false);
  const [isMedicalCardDialogOpen, setIsMedicalCardDialogOpen] = useState(false);
  const [selectedCalculatorEmployee, setSelectedCalculatorEmployee] = useState<number | null>(null);
  const [appointments, setAppointments] = useState(mockAppointments);
  const [selectedDate, setSelectedDate] = useState('2024-11-18');

  const getHealthGroupColor = (group: number) => {
    if (group === 1) return 'bg-green-500';
    if (group === 2) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getRiskBadge = (level: string) => {
    if (level === 'low') return <Badge className="bg-green-500 text-white">Низкий</Badge>;
    if (level === 'medium') return <Badge className="bg-yellow-500 text-white">Средний</Badge>;
    return <Badge className="bg-red-500 text-white">Высокий</Badge>;
  };

  const getStatusBadge = (status: string) => {
    if (status === 'Допущен') return <Badge variant="outline" className="border-green-500 text-green-700">Допущен</Badge>;
    return <Badge variant="outline" className="border-yellow-500 text-yellow-700">Требуется осмотр</Badge>;
  };

  const filteredAndSortedEmployees = employees
    .filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           emp.position.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGroup = filterGroup === 'all' || emp.healthGroup === parseInt(filterGroup);
      const matchesStatus = filterStatus === 'all' || 
                           (filterStatus === 'cleared' && emp.status === 'Допущен') ||
                           (filterStatus === 'pending' && emp.status === 'Требуется осмотр');
      const matchesDepartment = filterDepartment === 'all' || emp.department === filterDepartment;
      return matchesSearch && matchesGroup && matchesStatus && matchesDepartment;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'position') return a.position.localeCompare(b.position);
      if (sortBy === 'department') return a.department.localeCompare(b.department);
      if (sortBy === 'lastCheck') return new Date(b.lastCheck).getTime() - new Date(a.lastCheck).getTime();
      return 0;
    });

  const departments = Array.from(new Set(employees.map(e => e.department)));

  const renderFindrisc = (employeeData?: Employee) => {
    const [age, setAge] = useState(employeeData?.age?.toString() || '');
    const [bmi, setBmi] = useState(employeeData?.bmi?.toString() || '');
    const [waist, setWaist] = useState(employeeData?.waist?.toString() || '');
    const [activity, setActivity] = useState('');
    const [vegetables, setVegetables] = useState('');
    const [medications, setMedications] = useState('');
    const [glucose, setGlucose] = useState('');
    const [family, setFamily] = useState('');
    const [score, setScore] = useState<number | null>(null);

    const calculateFindrisc = () => {
      let total = 0;
      
      const ageNum = parseInt(age);
      if (ageNum < 45) total += 0;
      else if (ageNum < 55) total += 2;
      else if (ageNum < 65) total += 3;
      else total += 4;

      const bmiNum = parseFloat(bmi);
      if (bmiNum < 25) total += 0;
      else if (bmiNum < 30) total += 1;
      else total += 3;

      const waistNum = parseInt(waist);
      if (waistNum < 94) total += 0;
      else if (waistNum < 102) total += 3;
      else total += 4;

      if (activity === 'yes') total += 0;
      else total += 2;

      if (vegetables === 'daily') total += 0;
      else total += 1;

      if (medications === 'yes') total += 2;
      if (glucose === 'yes') total += 5;

      if (family === 'yes') total += 5;
      else if (family === 'close') total += 3;

      setScore(total);
    };

    const getRiskLevel = (score: number) => {
      if (score < 7) return { level: 'Низкий', desc: 'Риск развития диабета 1%', color: 'text-green-600' };
      if (score < 12) return { level: 'Слегка повышенный', desc: 'Риск 4%', color: 'text-yellow-600' };
      if (score < 15) return { level: 'Умеренный', desc: 'Риск 17%', color: 'text-orange-600' };
      if (score < 20) return { level: 'Высокий', desc: 'Риск 33%', color: 'text-red-600' };
      return { level: 'Очень высокий', desc: 'Риск 50%', color: 'text-red-700' };
    };

    return (
      <div className="space-y-4">
        {employeeData && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-4">
              <p className="font-medium">Данные загружены для: {employeeData.name}</p>
            </CardContent>
          </Card>
        )}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Возраст</Label>
            <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Введите возраст" />
          </div>
          <div>
            <Label>ИМТ (кг/м²)</Label>
            <Input type="number" step="0.1" value={bmi} onChange={(e) => setBmi(e.target.value)} placeholder="Индекс массы тела" />
          </div>
          <div>
            <Label>Окружность талии (см)</Label>
            <Input type="number" value={waist} onChange={(e) => setWaist(e.target.value)} placeholder="Окружность талии" />
          </div>
          <div>
            <Label>Физическая активность &gt;30 мин/день</Label>
            <Select value={activity} onValueChange={setActivity}>
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
            <Label>Овощи и фрукты ежедневно</Label>
            <Select value={vegetables} onValueChange={setVegetables}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Да</SelectItem>
                <SelectItem value="no">Нет</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Принимали ли препараты от давления</Label>
            <Select value={medications} onValueChange={setMedications}>
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
            <Label>Повышенный уровень глюкозы в анализах</Label>
            <Select value={glucose} onValueChange={setGlucose}>
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
            <Select value={family} onValueChange={setFamily}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no">Нет</SelectItem>
                <SelectItem value="close">Да, близкие родственники</SelectItem>
                <SelectItem value="yes">Да, родители/дети</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={calculateFindrisc} className="w-full">Рассчитать риск</Button>
        {score !== null && (
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle>Результат оценки</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-2xl font-bold">Сумма баллов: {score}</p>
                <p className={`text-xl font-semibold ${getRiskLevel(score).color}`}>
                  {getRiskLevel(score).level}
                </p>
                <p className="text-muted-foreground">{getRiskLevel(score).desc}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  const renderMedicalCardDialog = () => {
    if (!selectedEmployee) return null;

    return (
      <Dialog open={isMedicalCardDialogOpen} onOpenChange={setIsMedicalCardDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Медицинская карта - {selectedEmployee.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Личные данные</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">ФИО:</span>
                    <span className="font-medium">{selectedEmployee.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Дата рождения:</span>
                    <span className="font-medium">{selectedEmployee.birthDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Возраст:</span>
                    <span className="font-medium">{selectedEmployee.age} лет</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Должность:</span>
                    <span className="font-medium">{selectedEmployee.position}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Подразделение:</span>
                    <span className="font-medium">{selectedEmployee.department}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Показатели здоровья</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Группа здоровья:</span>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${getHealthGroupColor(selectedEmployee.healthGroup)}`}></div>
                      <span className="font-medium">{selectedEmployee.healthGroup}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Статус:</span>
                    {getStatusBadge(selectedEmployee.status)}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Риск:</span>
                    {getRiskBadge(selectedEmployee.riskLevel)}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Последний осмотр:</span>
                    <span className="font-medium">{selectedEmployee.lastCheck}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Антропометрия и витальные показатели</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label>ИМТ (кг/м²)</Label>
                    <Input type="number" step="0.1" defaultValue={selectedEmployee.bmi} />
                  </div>
                  <div>
                    <Label>Окружность талии (см)</Label>
                    <Input type="number" defaultValue={selectedEmployee.waist} />
                  </div>
                  <div>
                    <Label>АД (мм рт.ст.)</Label>
                    <Input defaultValue={selectedEmployee.bloodPressure} />
                  </div>
                  <div>
                    <Label>Глюкоза (ммоль/л)</Label>
                    <Input type="number" step="0.1" defaultValue={selectedEmployee.glucose} />
                  </div>
                  <div>
                    <Label>Частота пульса (уд/мин)</Label>
                    <Input type="number" placeholder="72" />
                  </div>
                  <div>
                    <Label>Температура (°C)</Label>
                    <Input type="number" step="0.1" placeholder="36.6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Анамнез и жалобы</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Жалобы на момент осмотра</Label>
                  <Textarea placeholder="Опишите жалобы пациента..." rows={3} />
                </div>
                <div>
                  <Label>Анамнез заболеваний</Label>
                  <Textarea placeholder="Хронические заболевания, операции..." rows={3} defaultValue={selectedEmployee.medicalHistory} />
                </div>
                <div>
                  <Label>Вредные привычки</Label>
                  <Textarea placeholder="Курение, алкоголь..." rows={2} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Результаты осмотра специалистов</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <Label>Терапевт</Label>
                    <Input placeholder="Заключение" />
                  </div>
                  <div>
                    <Label>Невролог</Label>
                    <Input placeholder="Заключение" />
                  </div>
                  <div>
                    <Label>Офтальмолог</Label>
                    <Input placeholder="Заключение" />
                  </div>
                  <div>
                    <Label>Отоларинголог</Label>
                    <Input placeholder="Заключение" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Заключение врача</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Группа здоровья</Label>
                  <Select defaultValue={selectedEmployee.healthGroup.toString()}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">I группа</SelectItem>
                      <SelectItem value="2">II группа</SelectItem>
                      <SelectItem value="3">III группа</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Решение о допуске</Label>
                  <Select defaultValue={selectedEmployee.status === 'Допущен' ? 'cleared' : 'restricted'}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cleared">Допущен к работе</SelectItem>
                      <SelectItem value="restricted">Допущен с ограничениями</SelectItem>
                      <SelectItem value="not_cleared">Не допущен</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Рекомендации</Label>
                  <Textarea placeholder="Рекомендации по лечению, наблюдению..." rows={4} />
                </div>
              </CardContent>
            </Card>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMedicalCardDialogOpen(false)}>Отмена</Button>
            <Button onClick={() => {
              setIsMedicalCardDialogOpen(false);
            }}>Сохранить карту</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  const renderNewEmployeeDialog = () => {
    const [newEmployee, setNewEmployee] = useState({
      name: '',
      position: '',
      department: '',
      birthDate: '',
      healthGroup: 1,
    });

    const handleSave = () => {
      const age = new Date().getFullYear() - new Date(newEmployee.birthDate).getFullYear();
      const employee: Employee = {
        id: employees.length + 1,
        ...newEmployee,
        age,
        lastCheck: new Date().toISOString().split('T')[0],
        status: 'Требуется осмотр',
        riskLevel: 'low',
      };
      setEmployees([...employees, employee]);
      setIsNewEmployeeDialogOpen(false);
    };

    return (
      <Dialog open={isNewEmployeeDialogOpen} onOpenChange={setIsNewEmployeeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Создание карточки нового сотрудника</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>ФИО</Label>
              <Input value={newEmployee.name} onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})} placeholder="Иванов Иван Иванович" />
            </div>
            <div>
              <Label>Должность</Label>
              <Input value={newEmployee.position} onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})} placeholder="Токарь" />
            </div>
            <div>
              <Label>Подразделение</Label>
              <Select value={newEmployee.department} onValueChange={(val) => setNewEmployee({...newEmployee, department: val})}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите подразделение" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Дата рождения</Label>
              <Input type="date" value={newEmployee.birthDate} onChange={(e) => setNewEmployee({...newEmployee, birthDate: e.target.value})} />
            </div>
            <div>
              <Label>Группа здоровья</Label>
              <Select value={newEmployee.healthGroup.toString()} onValueChange={(val) => setNewEmployee({...newEmployee, healthGroup: parseInt(val)})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">I группа</SelectItem>
                  <SelectItem value="2">II группа</SelectItem>
                  <SelectItem value="3">III группа</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewEmployeeDialogOpen(false)}>Отмена</Button>
            <Button onClick={handleSave}>Создать</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Icon name="HeartPulse" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">МедПортал</h1>
                <p className="text-sm text-slate-500">Промышленная медицина</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Icon name="Bell" size={18} />
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="Settings" size={18} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid bg-white shadow-sm">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Icon name="LayoutDashboard" size={16} className="mr-2" />
              Главная
            </TabsTrigger>
            <TabsTrigger value="employees" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Icon name="Users" size={16} className="mr-2" />
              Сотрудники
            </TabsTrigger>
            <TabsTrigger value="inspections" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Icon name="Stethoscope" size={16} className="mr-2" />
              Осмотры
            </TabsTrigger>
            <TabsTrigger value="calculators" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Icon name="Calculator" size={16} className="mr-2" />
              Калькуляторы
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Icon name="BarChart3" size={16} className="mr-2" />
              Аналитика
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="hover-scale transition-all hover:shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600">Всего сотрудников</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-bold text-slate-800">{employees.length}</p>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Icon name="Users" className="text-blue-600" size={24} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-scale transition-all hover:shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600">Допущены к работе</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-bold text-green-600">{employees.filter(e => e.status === 'Допущен').length}</p>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Icon name="CheckCircle" className="text-green-600" size={24} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-scale transition-all hover:shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600">Требуется осмотр</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-bold text-yellow-600">{employees.filter(e => e.status === 'Требуется осмотр').length}</p>
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Icon name="AlertCircle" className="text-yellow-600" size={24} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-scale transition-all hover:shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600">Высокий риск</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-bold text-red-600">{employees.filter(e => e.riskLevel === 'high').length}</p>
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <Icon name="AlertTriangle" className="text-red-600" size={24} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Распределение по группам здоровья</CardTitle>
                  <CardDescription>Структура здоровья сотрудников</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[1, 2, 3].map(group => {
                    const count = employees.filter(e => e.healthGroup === group).length;
                    const percent = Math.round((count / employees.length) * 100);
                    return (
                      <div key={group} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-4 h-4 ${getHealthGroupColor(group)} rounded`}></div>
                            <span className="text-sm font-medium">{group === 1 ? 'I' : group === 2 ? 'II' : 'III'} группа здоровья</span>
                          </div>
                          <span className="text-sm font-bold">{count} чел ({percent}%)</span>
                        </div>
                        <Progress value={percent} className="h-2" />
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Распределение по подразделениям</CardTitle>
                  <CardDescription>Численность персонала</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {departments.slice(0, 5).map(dept => {
                    const count = employees.filter(e => e.department === dept).length;
                    const percent = Math.round((count / employees.length) * 100);
                    return (
                      <div key={dept} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{dept}</span>
                          <span className="text-sm font-bold">{count} чел</span>
                        </div>
                        <Progress value={percent} className="h-2" />
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Ближайшие медицинские осмотры</CardTitle>
                <CardDescription>Запланированные мероприятия</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {appointments.slice(0, 3).map(apt => {
                    const employee = employees.find(e => e.id === apt.employeeId);
                    return (
                      <div key={apt.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Icon name="Calendar" className="text-blue-600" size={20} />
                          <div>
                            <p className="font-medium text-sm">{employee?.name} - {apt.type}</p>
                            <p className="text-xs text-slate-500">{apt.date}, {apt.time}</p>
                          </div>
                        </div>
                        <Badge variant="outline">{apt.status}</Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="employees" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Реестр сотрудников</CardTitle>
                    <CardDescription>Полная база сотрудников с показателями здоровья</CardDescription>
                  </div>
                  <Button onClick={() => setIsNewEmployeeDialogOpen(true)}>
                    <Icon name="Plus" className="mr-2" size={16} />
                    Добавить сотрудника
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex flex-col md:flex-row gap-3">
                  <Input 
                    placeholder="Поиск по ФИО или должности..." 
                    className="flex-1"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                    <SelectTrigger className="md:w-48">
                      <SelectValue placeholder="Подразделение" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все подразделения</SelectItem>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={filterGroup} onValueChange={setFilterGroup}>
                    <SelectTrigger className="md:w-48">
                      <SelectValue placeholder="Группа здоровья" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все группы</SelectItem>
                      <SelectItem value="1">I группа</SelectItem>
                      <SelectItem value="2">II группа</SelectItem>
                      <SelectItem value="3">III группа</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="md:w-48">
                      <SelectValue placeholder="Статус" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все статусы</SelectItem>
                      <SelectItem value="cleared">Допущен</SelectItem>
                      <SelectItem value="pending">Требуется осмотр</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="md:w-48">
                      <SelectValue placeholder="Сортировка" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">По имени</SelectItem>
                      <SelectItem value="position">По должности</SelectItem>
                      <SelectItem value="department">По подразделению</SelectItem>
                      <SelectItem value="lastCheck">По дате осмотра</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="rounded-lg border">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">ФИО</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Должность</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Подразделение</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Группа</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Последний осмотр</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Риск</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Статус</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Действия</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {filteredAndSortedEmployees.map((employee) => (
                        <tr key={employee.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 text-sm font-medium text-slate-900">{employee.name}</td>
                          <td className="px-4 py-3 text-sm text-slate-600">{employee.position}</td>
                          <td className="px-4 py-3 text-sm text-slate-600">{employee.department}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center space-x-2">
                              <div className={`w-3 h-3 rounded-full ${getHealthGroupColor(employee.healthGroup)}`}></div>
                              <span className="text-sm">{employee.healthGroup}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-600">{employee.lastCheck}</td>
                          <td className="px-4 py-3">{getRiskBadge(employee.riskLevel)}</td>
                          <td className="px-4 py-3">{getStatusBadge(employee.status)}</td>
                          <td className="px-4 py-3">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                setSelectedEmployee(employee);
                                setIsMedicalCardDialogOpen(true);
                              }}
                            >
                              <Icon name="FileText" size={16} />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-sm text-slate-600">
                  Показано {filteredAndSortedEmployees.length} из {employees.length} сотрудников
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inspections" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Календарь медицинских осмотров</CardTitle>
                    <CardDescription>Запланированные и проведенные осмотры</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <Label>Выберите дату</Label>
                      <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                    </div>
                    <div className="space-y-3">
                      {appointments.filter(apt => apt.date === selectedDate).map(apt => {
                        const employee = employees.find(e => e.id === apt.employeeId);
                        return (
                          <Card key={apt.id} className="bg-slate-50">
                            <CardContent className="pt-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <div className="text-center">
                                    <p className="text-2xl font-bold text-blue-600">{apt.time}</p>
                                  </div>
                                  <div>
                                    <p className="font-semibold">{employee?.name}</p>
                                    <p className="text-sm text-slate-600">{employee?.position}, {employee?.department}</p>
                                    <p className="text-sm text-slate-500">{apt.type}</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Button 
                                    size="sm"
                                    onClick={() => {
                                      setSelectedEmployee(employee || null);
                                      setIsMedicalCardDialogOpen(true);
                                    }}
                                  >
                                    Открыть карту
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                      {appointments.filter(apt => apt.date === selectedDate).length === 0 && (
                        <div className="text-center py-8 text-slate-500">
                          <Icon name="Calendar" className="mx-auto mb-2" size={48} />
                          <p>На выбранную дату осмотров не запланировано</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Статистика осмотров</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-slate-600">Запланировано</p>
                      <p className="text-2xl font-bold text-blue-600">{appointments.length}</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-slate-600">Проведено в этом месяце</p>
                      <p className="text-2xl font-bold text-green-600">45</p>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="text-sm text-slate-600">Просрочено</p>
                      <p className="text-2xl font-bold text-yellow-600">3</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Быстрые действия</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="CalendarPlus" className="mr-2" size={16} />
                      Запланировать осмотр
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="FileText" className="mr-2" size={16} />
                      Создать отчет
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="Download" className="mr-2" size={16} />
                      Экспорт данных
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calculators" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Калькуляторы медицинских рисков</CardTitle>
                <CardDescription>Инструменты оценки состояния здоровья с привязкой к сотрудникам</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 space-y-4">
                  <div>
                    <Label>Выберите сотрудника (опционально)</Label>
                    <Select 
                      value={selectedCalculatorEmployee?.toString() || 'none'} 
                      onValueChange={(val) => setSelectedCalculatorEmployee(val === 'none' ? null : parseInt(val))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Ручной ввод данных" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Ручной ввод данных</SelectItem>
                        {employees.map(emp => (
                          <SelectItem key={emp.id} value={emp.id.toString()}>
                            {emp.name} - {emp.position}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Калькулятор</Label>
                    <Select value={selectedCalculator} onValueChange={setSelectedCalculator}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="findrisc">Риск диабета (FINDRISC)</SelectItem>
                        <SelectItem value="fogoros">Риск внезапной сердечной смерти (Fogoros)</SelectItem>
                        <SelectItem value="cha2ds2vasc">Риск тромбоэмболии (CHA₂DS₂-VASc)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {selectedCalculator === 'findrisc' && renderFindrisc(
                  selectedCalculatorEmployee ? employees.find(e => e.id === selectedCalculatorEmployee) : undefined
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Средний возраст</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-blue-600">
                    {Math.round(employees.reduce((sum, e) => sum + e.age, 0) / employees.length)} лет
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Средний ИМТ</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-green-600">
                    {(employees.filter(e => e.bmi).reduce((sum, e) => sum + (e.bmi || 0), 0) / employees.filter(e => e.bmi).length).toFixed(1)}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Процент допущенных</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-yellow-600">
                    {Math.round((employees.filter(e => e.status === 'Допущен').length / employees.length) * 100)}%
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Анализ по подразделениям</CardTitle>
                  <CardDescription>Распределение групп здоровья</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {departments.map(dept => {
                      const deptEmployees = employees.filter(e => e.department === dept);
                      const group1 = deptEmployees.filter(e => e.healthGroup === 1).length;
                      const group2 = deptEmployees.filter(e => e.healthGroup === 2).length;
                      const group3 = deptEmployees.filter(e => e.healthGroup === 3).length;
                      
                      return (
                        <div key={dept} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-sm">{dept}</span>
                            <span className="text-xs text-slate-600">{deptEmployees.length} чел</span>
                          </div>
                          <div className="flex h-6 rounded overflow-hidden">
                            <div 
                              className="bg-green-500" 
                              style={{width: `${(group1 / deptEmployees.length) * 100}%`}}
                              title={`I группа: ${group1}`}
                            ></div>
                            <div 
                              className="bg-yellow-500" 
                              style={{width: `${(group2 / deptEmployees.length) * 100}%`}}
                              title={`II группа: ${group2}`}
                            ></div>
                            <div 
                              className="bg-red-500" 
                              style={{width: `${(group3 / deptEmployees.length) * 100}%`}}
                              title={`III группа: ${group3}`}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-slate-600">
                            <span>I: {group1}</span>
                            <span>II: {group2}</span>
                            <span>III: {group3}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Показатели здоровья по предприятию</CardTitle>
                  <CardDescription>Средние значения</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Нормальное АД (&lt;130/85)</span>
                      <span className="font-bold">72%</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Нормальный ИМТ (18.5-25)</span>
                      <span className="font-bold">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Нормальная глюкоза (&lt;5.6)</span>
                      <span className="font-bold">68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Отсутствие вредных привычек</span>
                      <span className="font-bold">58%</span>
                    </div>
                    <Progress value={58} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Динамика показателей здоровья</CardTitle>
                <CardDescription>Изменение за последние 6 месяцев</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Группа здоровья I</h4>
                    <div className="space-y-2">
                      {['Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь'].map((month, i) => {
                        const values = [48, 52, 54, 56, 58, 60];
                        return (
                          <div key={month} className="flex justify-between items-center text-sm">
                            <span className="text-slate-600">{month}</span>
                            <div className="flex items-center space-x-2">
                              <Progress value={values[i]} className="h-2 w-20" />
                              <span className="font-bold w-8">{values[i]}%</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Группа здоровья II</h4>
                    <div className="space-y-2">
                      {['Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь'].map((month, i) => {
                        const values = [38, 35, 33, 32, 30, 30];
                        return (
                          <div key={month} className="flex justify-between items-center text-sm">
                            <span className="text-slate-600">{month}</span>
                            <div className="flex items-center space-x-2">
                              <Progress value={values[i]} className="h-2 w-20" />
                              <span className="font-bold w-8">{values[i]}%</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Группа здоровья III</h4>
                    <div className="space-y-2">
                      {['Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь'].map((month, i) => {
                        const values = [14, 13, 13, 12, 12, 10];
                        return (
                          <div key={month} className="flex justify-between items-center text-sm">
                            <span className="text-slate-600">{month}</span>
                            <div className="flex items-center space-x-2">
                              <Progress value={values[i]} className="h-2 w-20" />
                              <span className="font-bold w-8">{values[i]}%</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Отчеты и документы</CardTitle>
                <CardDescription>Сформированные отчеты за период</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  <Button variant="outline" className="w-full justify-start h-auto py-3">
                    <Icon name="FileText" className="mr-2" size={18} />
                    <div className="text-left">
                      <p className="font-medium">Отчет по профосмотрам</p>
                      <p className="text-xs text-slate-500">IV квартал 2024</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="w-full justify-start h-auto py-3">
                    <Icon name="FileText" className="mr-2" size={18} />
                    <div className="text-left">
                      <p className="font-medium">Анализ заболеваемости</p>
                      <p className="text-xs text-slate-500">По подразделениям</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="w-full justify-start h-auto py-3">
                    <Icon name="FileText" className="mr-2" size={18} />
                    <div className="text-left">
                      <p className="font-medium">Статистика вредных факторов</p>
                      <p className="text-xs text-slate-500">Годовой отчет</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="w-full justify-start h-auto py-3">
                    <Icon name="FileText" className="mr-2" size={18} />
                    <div className="text-left">
                      <p className="font-medium">Сводка по группам здоровья</p>
                      <p className="text-xs text-slate-500">Ноябрь 2024</p>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {renderMedicalCardDialog()}
      {renderNewEmployeeDialog()}
    </div>
  );
};

export default Index;
