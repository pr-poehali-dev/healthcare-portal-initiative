export interface Employee {
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

export interface Appointment {
  id: number;
  employeeId: number;
  date: string;
  time: string;
  type: string;
  status: string;
}

export const mockEmployees: Employee[] = [
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

export const mockAppointments: Appointment[] = [
  { id: 1, employeeId: 3, date: '2024-11-18', time: '09:00', type: 'Периодический', status: 'Запланирован' },
  { id: 2, employeeId: 9, date: '2024-11-18', time: '09:30', type: 'Периодический', status: 'Запланирован' },
  { id: 3, employeeId: 15, date: '2024-11-18', time: '10:00', type: 'Периодический', status: 'Запланирован' },
  { id: 4, employeeId: 7, date: '2024-11-19', time: '09:00', type: 'Плановый', status: 'Запланирован' },
  { id: 5, employeeId: 11, date: '2024-11-19', time: '10:30', type: 'Плановый', status: 'Запланирован' },
  { id: 6, employeeId: 1, date: '2024-11-20', time: '14:00', type: 'Контрольный', status: 'Запланирован' },
];
