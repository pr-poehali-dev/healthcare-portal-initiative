import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { mockEmployees, mockAppointments, Employee, Appointment } from '@/components/medical/types';
import { DashboardTab } from '@/components/medical/DashboardTab';
import { EmployeesTab } from '@/components/medical/EmployeesTab';
import { InspectionsTab } from '@/components/medical/InspectionsTab';
import { CalculatorsTab } from '@/components/medical/CalculatorsTab';
import { AnalyticsTab } from '@/components/medical/AnalyticsTab';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCalculator, setSelectedCalculator] = useState('findrisc');
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isMedicalCardDialogOpen, setIsMedicalCardDialogOpen] = useState(false);
  const [selectedCalculatorEmployee, setSelectedCalculatorEmployee] = useState<number | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [selectedDate, setSelectedDate] = useState('2024-11-18');

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
            <DashboardTab employees={employees} appointments={appointments} />
          </TabsContent>

          <TabsContent value="employees">
            <EmployeesTab 
              employees={employees}
              setEmployees={setEmployees}
              setSelectedEmployee={setSelectedEmployee}
              setIsMedicalCardDialogOpen={setIsMedicalCardDialogOpen}
            />
          </TabsContent>

          <TabsContent value="inspections">
            <InspectionsTab 
              appointments={appointments}
              employees={employees}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              setSelectedEmployee={setSelectedEmployee}
              setIsMedicalCardDialogOpen={setIsMedicalCardDialogOpen}
            />
          </TabsContent>

          <TabsContent value="calculators">
            <CalculatorsTab 
              employees={employees}
              selectedCalculator={selectedCalculator}
              setSelectedCalculator={setSelectedCalculator}
              selectedCalculatorEmployee={selectedCalculatorEmployee}
              setSelectedCalculatorEmployee={setSelectedCalculatorEmployee}
            />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsTab employees={employees} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
