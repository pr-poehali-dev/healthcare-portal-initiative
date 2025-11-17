import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { Employee, Appointment } from './types';
import { getHealthGroupColor } from './utils';

interface DashboardTabProps {
  employees: Employee[];
  appointments: Appointment[];
}

export const DashboardTab = ({ employees, appointments }: DashboardTabProps) => {
  const departments = Array.from(new Set(employees.map(e => e.department)));

  return (
    <div className="space-y-6">
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
    </div>
  );
};
