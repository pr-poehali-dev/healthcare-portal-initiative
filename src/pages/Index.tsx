import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Employee {
  id: number;
  name: string;
  age: number;
  department: string;
  position: string;
  healthGroup: number;
  nextExam: string;
  lastExam: string;
  status: string;
  phone: string;
  email: string;
  bmi?: number;
  bloodPressure?: string;
  glucose?: number;
  cholesterol?: number;
  contraindications?: string[];
  medicalHistory?: string;
}

interface Appointment {
  id: number;
  employeeId: number;
  employeeName: string;
  date: string;
  time: string;
  type: string;
  status: string;
  doctor: string;
}

const mockEmployees: Employee[] = [
  {
    id: 1,
    name: 'Иванов Иван Иванович',
    age: 35,
    department: 'Производственный цех №1',
    position: 'Оператор станка',
    healthGroup: 1,
    nextExam: '2024-12-15',
    lastExam: '2024-06-15',
    status: 'Допущен',
    phone: '+7 (900) 123-45-67',
    email: 'ivanov@company.com',
    bmi: 24.5,
    bloodPressure: '120/80',
    glucose: 5.2,
    cholesterol: 4.8,
    contraindications: ['Работа на высоте'],
    medicalHistory: 'Без особенностей',
  },
  {
    id: 2,
    name: 'Петрова Анна Сергеевна',
    age: 28,
    department: 'Лаборатория',
    position: 'Химик-аналитик',
    healthGroup: 1,
    nextExam: '2025-01-10',
    lastExam: '2024-07-10',
    status: 'Допущен',
    phone: '+7 (900) 234-56-78',
    email: 'petrova@company.com',
    bmi: 22.1,
    bloodPressure: '115/75',
    glucose: 4.9,
    cholesterol: 4.2,
  },
  {
    id: 3,
    name: 'Сидоров Петр Николаевич',
    age: 52,
    department: 'Производственный цех №2',
    position: 'Мастер участка',
    healthGroup: 2,
    nextExam: '2024-11-20',
    lastExam: '2024-05-20',
    status: 'Допущен с ограничениями',
    phone: '+7 (900) 345-67-89',
    email: 'sidorov@company.com',
    bmi: 27.3,
    bloodPressure: '135/85',
    glucose: 6.1,
    cholesterol: 5.8,
    contraindications: ['Работа в условиях повышенного шума'],
  },
  {
    id: 4,
    name: 'Кузнецова Мария Александровна',
    age: 41,
    department: 'Склад',
    position: 'Кладовщик',
    healthGroup: 1,
    nextExam: '2025-02-05',
    lastExam: '2024-08-05',
    status: 'Допущен',
    phone: '+7 (900) 456-78-90',
    email: 'kuznetsova@company.com',
    bmi: 23.8,
    bloodPressure: '118/78',
    glucose: 5.0,
    cholesterol: 4.5,
  },
  {
    id: 5,
    name: 'Смирнов Дмитрий Владимирович',
    age: 45,
    department: 'Ремонтно-механический цех',
    position: 'Слесарь-ремонтник',
    healthGroup: 3,
    nextExam: '2024-11-25',
    lastExam: '2024-08-25',
    status: 'Направлен на доп. обследование',
    phone: '+7 (900) 567-89-01',
    email: 'smirnov@company.com',
    bmi: 29.5,
    bloodPressure: '145/95',
    glucose: 7.2,
    cholesterol: 6.5,
    contraindications: ['Работа с вибрацией', 'Тяжелый физический труд'],
  },
];

const mockAppointments: Appointment[] = [
  { id: 1, employeeId: 1, employeeName: 'Иванов И.И.', date: '2024-11-18', time: '09:00', type: 'Периодический осмотр', status: 'Запланирован', doctor: 'Терапевт' },
  { id: 2, employeeId: 3, employeeName: 'Сидоров П.Н.', date: '2024-11-18', time: '10:30', type: 'Периодический осмотр', status: 'В процессе', doctor: 'Терапевт' },
  { id: 3, employeeId: 5, employeeName: 'Смирнов Д.В.', date: '2024-11-18', time: '14:00', type: 'Дополнительное обследование', status: 'Запланирован', doctor: 'Кардиолог' },
  { id: 4, employeeId: 2, employeeName: 'Петрова А.С.', date: '2024-11-19', time: '09:30', type: 'Предварительный осмотр', status: 'Запланирован', doctor: 'Терапевт' },
];

const getHealthGroupColor = (group: number) => {
  switch (group) {
    case 1: return 'bg-green-100 text-green-800 border-green-300';
    case 2: return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 3: return 'bg-red-100 text-red-800 border-red-300';
    default: return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

const getStatusColor = (status: string) => {
  if (status.includes('Допущен') && !status.includes('ограничениями')) return 'bg-green-100 text-green-800 border-green-300';
  if (status.includes('ограничениями')) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
  if (status.includes('Не допущен') || status.includes('обследование')) return 'bg-red-100 text-red-800 border-red-300';
  return 'bg-gray-100 text-gray-800 border-gray-300';
};

const getAppointmentStatusColor = (status: string) => {
  if (status === 'Завершен') return 'bg-green-100 text-green-800';
  if (status === 'В процессе') return 'bg-blue-100 text-blue-800';
  if (status === 'Запланирован') return 'bg-gray-100 text-gray-800';
  if (status === 'Отменен') return 'bg-red-100 text-red-800';
  return 'bg-gray-100 text-gray-800';
};

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [healthGroupFilter, setHealthGroupFilter] = useState('all');
  const [selectedCalculator, setSelectedCalculator] = useState('findrisc');
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isMedicalCardDialogOpen, setIsMedicalCardDialogOpen] = useState(false);
  const [selectedCalculatorEmployee, setSelectedCalculatorEmployee] = useState<number | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [selectedDate, setSelectedDate] = useState('2024-11-18');

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || emp.department === departmentFilter;
    const matchesHealthGroup = healthGroupFilter === 'all' || emp.healthGroup.toString() === healthGroupFilter;
    return matchesSearch && matchesDepartment && matchesHealthGroup;
  });

  const departments = Array.from(new Set(employees.map(e => e.department)));

  const filteredAppointments = appointments.filter(app => app.date === selectedDate);

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

          <TabsContent value="dashboard">
            <div className="grid gap-6">
              <div className="grid md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-slate-600">Всего сотрудников</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">{employees.length}</div>
                    <p className="text-xs text-slate-500 mt-1">Активных работников</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-slate-600">Осмотры сегодня</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">{filteredAppointments.length}</div>
                    <p className="text-xs text-slate-500 mt-1">Запланировано</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-slate-600">Группа I</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">{employees.filter(e => e.healthGroup === 1).length}</div>
                    <p className="text-xs text-slate-500 mt-1">Здоровые</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-slate-600">Требуют внимания</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-yellow-600">{employees.filter(e => e.healthGroup >= 2).length}</div>
                    <p className="text-xs text-slate-500 mt-1">Группы II-III</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Ближайшие осмотры</CardTitle>
                    <CardDescription>Запланированные на сегодня</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {filteredAppointments.map(appointment => (
                        <div key={appointment.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{appointment.employeeName}</p>
                            <p className="text-xs text-slate-600">{appointment.type}</p>
                          </div>
                          <div className="text-right mr-4">
                            <p className="text-sm font-medium">{appointment.time}</p>
                            <p className="text-xs text-slate-600">{appointment.doctor}</p>
                          </div>
                          <Badge className={getAppointmentStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Распределение по группам здоровья</CardTitle>
                    <CardDescription>Актуальная статистика</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map(group => {
                        const count = employees.filter(e => e.healthGroup === group).length;
                        const percentage = (count / employees.length) * 100;
                        return (
                          <div key={group}>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm font-medium">Группа {group}</span>
                              <span className="text-sm text-slate-600">{count} чел ({percentage.toFixed(0)}%)</span>
                            </div>
                            <Progress value={percentage} className="h-2" />
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="employees">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>База данных сотрудников</CardTitle>
                    <CardDescription>Управление медицинскими картами</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Icon name="UserPlus" size={16} className="mr-2" />
                        Добавить сотрудника
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Добавить нового сотрудника</DialogTitle>
                        <DialogDescription>Заполните информацию о сотруднике</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">ФИО</Label>
                            <Input id="name" placeholder="Иванов Иван Иванович" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="age">Возраст</Label>
                            <Input id="age" type="number" placeholder="35" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="department">Подразделение</Label>
                            <Input id="department" placeholder="Производственный цех №1" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="position">Должность</Label>
                            <Input id="position" placeholder="Оператор станка" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Телефон</Label>
                            <Input id="phone" placeholder="+7 (900) 123-45-67" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="ivanov@company.com" />
                          </div>
                        </div>
                        <Button className="w-full">Сохранить</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Поиск по ФИО, подразделению или должности..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                      <SelectTrigger className="w-full md:w-[250px]">
                        <SelectValue placeholder="Подразделение" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все подразделения</SelectItem>
                        {departments.map(dept => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={healthGroupFilter} onValueChange={setHealthGroupFilter}>
                      <SelectTrigger className="w-full md:w-[200px]">
                        <SelectValue placeholder="Группа здоровья" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все группы</SelectItem>
                        <SelectItem value="1">Группа I</SelectItem>
                        <SelectItem value="2">Группа II</SelectItem>
                        <SelectItem value="3">Группа III</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ФИО</TableHead>
                          <TableHead>Возраст</TableHead>
                          <TableHead>Подразделение</TableHead>
                          <TableHead>Должность</TableHead>
                          <TableHead>Группа</TableHead>
                          <TableHead>Следующий осмотр</TableHead>
                          <TableHead>Статус</TableHead>
                          <TableHead>Действия</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredEmployees.map((employee) => (
                          <TableRow key={employee.id}>
                            <TableCell className="font-medium">{employee.name}</TableCell>
                            <TableCell>{employee.age}</TableCell>
                            <TableCell>{employee.department}</TableCell>
                            <TableCell>{employee.position}</TableCell>
                            <TableCell>
                              <Badge className={getHealthGroupColor(employee.healthGroup)}>
                                {employee.healthGroup}
                              </Badge>
                            </TableCell>
                            <TableCell>{employee.nextExam}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(employee.status)}>
                                {employee.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => {
                                  setSelectedEmployee(employee);
                                  setIsMedicalCardDialogOpen(true);
                                }}
                              >
                                <Icon name="Eye" size={16} />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Dialog open={isMedicalCardDialogOpen} onOpenChange={setIsMedicalCardDialogOpen}>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Медицинская карта</DialogTitle>
                  <DialogDescription>Подробная информация о сотруднике</DialogDescription>
                </DialogHeader>
                {selectedEmployee && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-slate-600">ФИО</Label>
                        <p className="font-medium">{selectedEmployee.name}</p>
                      </div>
                      <div>
                        <Label className="text-slate-600">Возраст</Label>
                        <p className="font-medium">{selectedEmployee.age} лет</p>
                      </div>
                      <div>
                        <Label className="text-slate-600">Подразделение</Label>
                        <p className="font-medium">{selectedEmployee.department}</p>
                      </div>
                      <div>
                        <Label className="text-slate-600">Должность</Label>
                        <p className="font-medium">{selectedEmployee.position}</p>
                      </div>
                      <div>
                        <Label className="text-slate-600">Телефон</Label>
                        <p className="font-medium">{selectedEmployee.phone}</p>
                      </div>
                      <div>
                        <Label className="text-slate-600">Email</Label>
                        <p className="font-medium">{selectedEmployee.email}</p>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-3">Медицинские показатели</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-slate-600">ИМТ</Label>
                          <p className="font-medium">{selectedEmployee.bmi || 'Не указано'}</p>
                        </div>
                        <div>
                          <Label className="text-slate-600">Артериальное давление</Label>
                          <p className="font-medium">{selectedEmployee.bloodPressure || 'Не указано'}</p>
                        </div>
                        <div>
                          <Label className="text-slate-600">Глюкоза</Label>
                          <p className="font-medium">{selectedEmployee.glucose ? `${selectedEmployee.glucose} ммоль/л` : 'Не указано'}</p>
                        </div>
                        <div>
                          <Label className="text-slate-600">Холестерин</Label>
                          <p className="font-medium">{selectedEmployee.cholesterol ? `${selectedEmployee.cholesterol} ммоль/л` : 'Не указано'}</p>
                        </div>
                      </div>
                    </div>

                    {selectedEmployee.contraindications && selectedEmployee.contraindications.length > 0 && (
                      <div className="border-t pt-4">
                        <h4 className="font-semibold mb-3">Противопоказания</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {selectedEmployee.contraindications.map((item, index) => (
                            <li key={index} className="text-sm text-slate-700">{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-3">Группа здоровья</h4>
                      <Badge className={getHealthGroupColor(selectedEmployee.healthGroup)}>
                        Группа {selectedEmployee.healthGroup}
                      </Badge>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-3">Статус допуска</h4>
                      <Badge className={getStatusColor(selectedEmployee.status)}>
                        {selectedEmployee.status}
                      </Badge>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <Icon name="Edit" size={16} className="mr-2" />
                        Редактировать
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Icon name="FileText" size={16} className="mr-2" />
                        Печать карты
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="inspections">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Календарь осмотров</CardTitle>
                  <CardDescription>Планирование и учет медицинских осмотров</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-[200px]"
                      />
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button>
                            <Icon name="Plus" size={16} className="mr-2" />
                            Запланировать осмотр
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Новый осмотр</DialogTitle>
                            <DialogDescription>Запланируйте медицинский осмотр</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>Сотрудник</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Выберите сотрудника" />
                                </SelectTrigger>
                                <SelectContent>
                                  {employees.map(emp => (
                                    <SelectItem key={emp.id} value={emp.id.toString()}>
                                      {emp.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Дата</Label>
                                <Input type="date" />
                              </div>
                              <div className="space-y-2">
                                <Label>Время</Label>
                                <Input type="time" />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label>Тип осмотра</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Выберите тип" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="periodic">Периодический</SelectItem>
                                  <SelectItem value="preliminary">Предварительный</SelectItem>
                                  <SelectItem value="additional">Дополнительный</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Специалист</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Выберите врача" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="therapist">Терапевт</SelectItem>
                                  <SelectItem value="cardiologist">Кардиолог</SelectItem>
                                  <SelectItem value="neurologist">Невролог</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <Button className="w-full">Запланировать</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Время</TableHead>
                            <TableHead>Сотрудник</TableHead>
                            <TableHead>Тип осмотра</TableHead>
                            <TableHead>Специалист</TableHead>
                            <TableHead>Статус</TableHead>
                            <TableHead>Действия</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredAppointments.map((appointment) => (
                            <TableRow key={appointment.id}>
                              <TableCell className="font-medium">{appointment.time}</TableCell>
                              <TableCell>
                                <Button
                                  variant="link"
                                  className="p-0 h-auto font-medium"
                                  onClick={() => {
                                    const emp = employees.find(e => e.id === appointment.employeeId);
                                    if (emp) {
                                      setSelectedEmployee(emp);
                                      setIsMedicalCardDialogOpen(true);
                                    }
                                  }}
                                >
                                  {appointment.employeeName}
                                </Button>
                              </TableCell>
                              <TableCell>{appointment.type}</TableCell>
                              <TableCell>{appointment.doctor}</TableCell>
                              <TableCell>
                                <Badge className={getAppointmentStatusColor(appointment.status)}>
                                  {appointment.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button variant="ghost" size="sm">
                                    <Icon name="Edit" size={16} />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Icon name="Trash2" size={16} />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="calculators">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Медицинские калькуляторы</CardTitle>
                  <CardDescription>Расчет индексов и рисков для здоровья</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={selectedCalculator} onValueChange={setSelectedCalculator}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="findrisc">FINDRISC</TabsTrigger>
                      <TabsTrigger value="bmi">ИМТ</TabsTrigger>
                    </TabsList>

                    <TabsContent value="findrisc" className="space-y-4 mt-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">Шкала FINDRISC</h4>
                        <p className="text-sm text-blue-800">
                          Финская шкала оценки риска развития сахарного диабета 2 типа в течение 10 лет
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label>Выберите сотрудника</Label>
                        <Select
                          value={selectedCalculatorEmployee?.toString() || ''}
                          onValueChange={(value) => setSelectedCalculatorEmployee(parseInt(value))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите сотрудника" />
                          </SelectTrigger>
                          <SelectContent>
                            {employees.map(emp => (
                              <SelectItem key={emp.id} value={emp.id.toString()}>
                                {emp.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {selectedCalculatorEmployee && (
                        <div className="space-y-4 border-t pt-4">
                          <div className="space-y-2">
                            <Label>1. Возраст</Label>
                            <Select defaultValue="35-44">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="<45">Менее 45 лет (0 баллов)</SelectItem>
                                <SelectItem value="45-54">45-54 года (2 балла)</SelectItem>
                                <SelectItem value="55-64">55-64 года (3 балла)</SelectItem>
                                <SelectItem value=">64">Более 64 лет (4 балла)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>2. Индекс массы тела (ИМТ)</Label>
                            <Select defaultValue="25-30">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="<25">Менее 25 кг/м² (0 баллов)</SelectItem>
                                <SelectItem value="25-30">25-30 кг/м² (1 балл)</SelectItem>
                                <SelectItem value=">30">Более 30 кг/м² (3 балла)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>3. Окружность талии</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="m-<94">М: &lt;94 см (0 баллов)</SelectItem>
                                <SelectItem value="m-94-102">М: 94-102 см (3 балла)</SelectItem>
                                <SelectItem value="m->102">М: &gt;102 см (4 балла)</SelectItem>
                                <SelectItem value="f-<80">Ж: &lt;80 см (0 баллов)</SelectItem>
                                <SelectItem value="f-80-88">Ж: 80-88 см (3 балла)</SelectItem>
                                <SelectItem value="f->88">Ж: &gt;88 см (4 балла)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>4. Физическая активность (30 мин/день)</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="yes">Да (0 баллов)</SelectItem>
                                <SelectItem value="no">Нет (2 балла)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>5. Употребление овощей и фруктов</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="yes">Каждый день (0 баллов)</SelectItem>
                                <SelectItem value="no">Не каждый день (1 балл)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <Button className="w-full">Рассчитать риск</Button>

                          <div className="bg-green-50 p-4 rounded-lg mt-4">
                            <h4 className="font-semibold text-green-900 mb-2">Результат: Низкий риск</h4>
                            <p className="text-sm text-green-800 mb-3">
                              Сумма баллов: 5
                              <br />
                              Риск развития диабета: 1% (1 из 100)
                            </p>
                            <p className="text-xs text-green-700">
                              Рекомендация: Поддерживайте здоровый образ жизни
                            </p>
                          </div>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="bmi" className="space-y-4 mt-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">Калькулятор ИМТ</h4>
                        <p className="text-sm text-blue-800">
                          Индекс массы тела (ИМТ) = вес (кг) / рост² (м)
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Вес (кг)</Label>
                          <Input type="number" placeholder="70" />
                        </div>
                        <div className="space-y-2">
                          <Label>Рост (см)</Label>
                          <Input type="number" placeholder="175" />
                        </div>
                      </div>

                      <Button className="w-full">Рассчитать ИМТ</Button>

                      <div className="space-y-3 pt-4 border-t">
                        <h4 className="font-semibold">Интерпретация результатов:</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between p-2 bg-blue-50 rounded">
                            <span>Менее 18.5</span>
                            <span className="font-medium">Недостаточная масса</span>
                          </div>
                          <div className="flex justify-between p-2 bg-green-50 rounded">
                            <span>18.5 - 24.9</span>
                            <span className="font-medium">Нормальная масса</span>
                          </div>
                          <div className="flex justify-between p-2 bg-yellow-50 rounded">
                            <span>25.0 - 29.9</span>
                            <span className="font-medium">Избыточная масса</span>
                          </div>
                          <div className="flex justify-between p-2 bg-orange-50 rounded">
                            <span>30.0 - 34.9</span>
                            <span className="font-medium">Ожирение I степени</span>
                          </div>
                          <div className="flex justify-between p-2 bg-red-50 rounded">
                            <span>35.0+</span>
                            <span className="font-medium">Ожирение II-III степени</span>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="space-y-6">
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
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
