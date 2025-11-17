import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

interface Appointment {
  id: number;
  employeeId: number;
  date: string;
  time: string;
  type: string;
  status: string;
}

interface InspectionsTabProps {
  appointments: Appointment[];
  employees: Employee[];
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  setSelectedEmployee: (employee: Employee | null) => void;
  setIsMedicalCardDialogOpen: (open: boolean) => void;
}

export const InspectionsTab = ({ 
  appointments, 
  employees, 
  selectedDate, 
  setSelectedDate, 
  setSelectedEmployee, 
  setIsMedicalCardDialogOpen 
}: InspectionsTabProps) => {
  const todayAppointments = appointments.filter(apt => apt.date === selectedDate);
  const upcomingAppointments = appointments.filter(apt => new Date(apt.date) > new Date(selectedDate));
  const needsInspection = employees.filter(emp => emp.status === 'Требуется осмотр');

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Календарь осмотров</span>
              <Select value={selectedDate} onValueChange={setSelectedDate}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-11-18">18 ноября 2024</SelectItem>
                  <SelectItem value="2024-11-19">19 ноября 2024</SelectItem>
                  <SelectItem value="2024-11-20">20 ноября 2024</SelectItem>
                  <SelectItem value="2024-11-21">21 ноября 2024</SelectItem>
                  <SelectItem value="2024-11-22">22 ноября 2024</SelectItem>
                </SelectContent>
              </Select>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayAppointments.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">Нет запланированных осмотров</p>
              ) : (
                todayAppointments.map(apt => {
                  const employee = employees.find(e => e.id === apt.employeeId);
                  if (!employee) return null;
                  return (
                    <div key={apt.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold">{apt.time}</div>
                          <div className="text-xs text-muted-foreground">{apt.type}</div>
                        </div>
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-sm text-muted-foreground">{employee.position} • {employee.department}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{apt.status}</Badge>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setSelectedEmployee(employee);
                            setIsMedicalCardDialogOpen(true);
                          }}
                        >
                          <Icon name="file-text" className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Требуют внепланового осмотра</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {needsInspection.map(emp => (
                <div key={emp.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{emp.name}</div>
                    <div className="text-sm text-muted-foreground">{emp.position} • {emp.department}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-red-500 text-white">Высокий риск</Badge>
                    <Button variant="outline" size="sm">
                      <Icon name="calendar" className="h-4 w-4 mr-2" />
                      Записать
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Статистика</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-muted-foreground">Сегодня</span>
                <span className="text-sm font-medium">{todayAppointments.length}</span>
              </div>
              <div className="text-2xl font-bold">{todayAppointments.length} осмотров</div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-muted-foreground">Ближайшие</span>
                <span className="text-sm font-medium">{upcomingAppointments.length}</span>
              </div>
              <div className="text-lg font-semibold">{upcomingAppointments.length} запланировано</div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-muted-foreground">Требуют осмотра</span>
                <span className="text-sm font-medium">{needsInspection.length}</span>
              </div>
              <div className="text-lg font-semibold text-red-600">{needsInspection.length} сотрудников</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Быстрые действия</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" variant="outline">
              <Icon name="calendar-plus" className="h-4 w-4 mr-2" />
              Новая запись
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Icon name="file-text" className="h-4 w-4 mr-2" />
              Отчет за период
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Icon name="download" className="h-4 w-4 mr-2" />
              Экспорт данных
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
