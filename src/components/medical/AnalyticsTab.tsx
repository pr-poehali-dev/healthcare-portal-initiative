import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { Employee } from './types';

interface AnalyticsTabProps {
  employees: Employee[];
}

export const AnalyticsTab = ({ employees }: AnalyticsTabProps) => {
  const departments = Array.from(new Set(employees.map(e => e.department)));

  return (
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
    </div>
  );
};
