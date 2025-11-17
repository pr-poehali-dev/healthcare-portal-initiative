import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

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

interface EmployeesTabProps {
  employees: Employee[];
  setEmployees: (employees: Employee[]) => void;
  setSelectedEmployee: (employee: Employee | null) => void;
  setIsMedicalCardDialogOpen: (open: boolean) => void;
}

const NewEmployeeDialog = ({ employees, setEmployees }: { employees: Employee[]; setEmployees: (employees: Employee[]) => void }) => {
  const [open, setOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    position: '',
    department: '',
    birthDate: '',
  });

  const handleAddEmployee = () => {
    const today = new Date();
    const birthDate = new Date(newEmployee.birthDate);
    const age = today.getFullYear() - birthDate.getFullYear();
    
    const employee: Employee = {
      id: Math.max(...employees.map(e => e.id)) + 1,
      name: newEmployee.name,
      position: newEmployee.position,
      department: newEmployee.department,
      healthGroup: 1,
      lastCheck: '',
      status: 'Требуется осмотр',
      riskLevel: 'low',
      birthDate: newEmployee.birthDate,
      age: age,
    };
    
    setEmployees([...employees, employee]);
    setOpen(false);
    setNewEmployee({ name: '', position: '', department: '', birthDate: '' });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Icon name="user-plus" className="mr-2 h-4 w-4" />
          Добавить сотрудника
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить нового сотрудника</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>ФИО</Label>
            <Input 
              value={newEmployee.name}
              onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
              placeholder="Иванов Иван Иванович"
            />
          </div>
          <div>
            <Label>Должность</Label>
            <Input 
              value={newEmployee.position}
              onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
              placeholder="Токарь"
            />
          </div>
          <div>
            <Label>Отдел</Label>
            <Input 
              value={newEmployee.department}
              onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
              placeholder="Цех №1"
            />
          </div>
          <div>
            <Label>Дата рождения</Label>
            <Input 
              type="date"
              value={newEmployee.birthDate}
              onChange={(e) => setNewEmployee({...newEmployee, birthDate: e.target.value})}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Отмена</Button>
          <Button onClick={handleAddEmployee}>Добавить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const MedicalCardDialog = ({ employee, open, onOpenChange }: { employee: Employee | null; open: boolean; onOpenChange: (open: boolean) => void }) => {
  if (!employee) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Медицинская карта: {employee.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-muted-foreground">Должность</Label>
              <p className="font-medium">{employee.position}</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Отдел</Label>
              <p className="font-medium">{employee.department}</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Дата рождения</Label>
              <p className="font-medium">{new Date(employee.birthDate).toLocaleDateString('ru-RU')}</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Возраст</Label>
              <p className="font-medium">{employee.age} лет</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Группа здоровья</Label>
              <p className="font-medium">Группа {employee.healthGroup}</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Последний осмотр</Label>
              <p className="font-medium">{employee.lastCheck ? new Date(employee.lastCheck).toLocaleDateString('ru-RU') : 'Не проводился'}</p>
            </div>
          </div>

          {employee.bmi && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Антропометрические данные</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ИМТ:</span>
                  <span className="font-medium">{employee.bmi}</span>
                </div>
                {employee.waist && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Окружность талии:</span>
                    <span className="font-medium">{employee.waist} см</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {employee.bloodPressure && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Показатели здоровья</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Артериальное давление:</span>
                  <span className="font-medium">{employee.bloodPressure} мм рт.ст.</span>
                </div>
                {employee.glucose && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Глюкоза крови:</span>
                    <span className="font-medium">{employee.glucose} ммоль/л</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {employee.medicalHistory && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Анамнез</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{employee.medicalHistory}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const EmployeesTab = ({ employees, setEmployees, setSelectedEmployee, setIsMedicalCardDialogOpen }: EmployeesTabProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGroup, setFilterGroup] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [selectedEmployeeLocal, setSelectedEmployeeLocal] = useState<Employee | null>(null);
  const [isMedicalCardDialogOpenLocal, setIsMedicalCardDialogOpenLocal] = useState(false);

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
      const matchesStatus = filterStatus === 'all' || emp.status === filterStatus;
      const matchesDepartment = filterDepartment === 'all' || emp.department === filterDepartment;
      return matchesSearch && matchesGroup && matchesStatus && matchesDepartment;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'group') return a.healthGroup - b.healthGroup;
      if (sortBy === 'lastCheck') return new Date(b.lastCheck).getTime() - new Date(a.lastCheck).getTime();
      if (sortBy === 'risk') {
        const riskOrder = { low: 1, medium: 2, high: 3 };
        return riskOrder[b.riskLevel as keyof typeof riskOrder] - riskOrder[a.riskLevel as keyof typeof riskOrder];
      }
      return 0;
    });

  const departments = Array.from(new Set(employees.map(e => e.department)));

  const handleOpenMedicalCard = (employee: Employee) => {
    setSelectedEmployeeLocal(employee);
    setSelectedEmployee(employee);
    setIsMedicalCardDialogOpenLocal(true);
    setIsMedicalCardDialogOpen(true);
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 flex-1">
            <div className="relative flex-1 max-w-sm">
              <Icon name="search" className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по ФИО или должности..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterGroup} onValueChange={setFilterGroup}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Группа здоровья" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все группы</SelectItem>
                <SelectItem value="1">Группа 1</SelectItem>
                <SelectItem value="2">Группа 2</SelectItem>
                <SelectItem value="3">Группа 3</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="Допущен">Допущен</SelectItem>
                <SelectItem value="Требуется осмотр">Требуется осмотр</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Отдел" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все отделы</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Сортировка" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">По имени</SelectItem>
                <SelectItem value="group">По группе</SelectItem>
                <SelectItem value="lastCheck">По дате осмотра</SelectItem>
                <SelectItem value="risk">По уровню риска</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <NewEmployeeDialog employees={employees} setEmployees={setEmployees} />
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium">ФИО</th>
                    <th className="text-left p-4 font-medium">Должность</th>
                    <th className="text-left p-4 font-medium">Отдел</th>
                    <th className="text-left p-4 font-medium">Группа</th>
                    <th className="text-left p-4 font-medium">Последний осмотр</th>
                    <th className="text-left p-4 font-medium">Статус</th>
                    <th className="text-left p-4 font-medium">Риск</th>
                    <th className="text-left p-4 font-medium">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedEmployees.map(employee => (
                    <tr key={employee.id} className="border-t hover:bg-muted/50">
                      <td className="p-4">{employee.name}</td>
                      <td className="p-4">{employee.position}</td>
                      <td className="p-4">{employee.department}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${getHealthGroupColor(employee.healthGroup)}`} />
                          {employee.healthGroup}
                        </div>
                      </td>
                      <td className="p-4">{employee.lastCheck ? new Date(employee.lastCheck).toLocaleDateString('ru-RU') : '-'}</td>
                      <td className="p-4">{getStatusBadge(employee.status)}</td>
                      <td className="p-4">{getRiskBadge(employee.riskLevel)}</td>
                      <td className="p-4">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleOpenMedicalCard(employee)}
                        >
                          <Icon name="file-text" className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="text-sm text-muted-foreground">
          Показано {filteredAndSortedEmployees.length} из {employees.length} сотрудников
        </div>
      </div>

      <MedicalCardDialog 
        employee={selectedEmployeeLocal} 
        open={isMedicalCardDialogOpenLocal} 
        onOpenChange={setIsMedicalCardDialogOpenLocal}
      />
    </>
  );
};
