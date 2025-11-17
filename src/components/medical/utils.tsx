import { Badge } from '@/components/ui/badge';

export const getHealthGroupColor = (group: number) => {
  if (group === 1) return 'bg-green-500';
  if (group === 2) return 'bg-yellow-500';
  return 'bg-red-500';
};

export const getRiskBadge = (level: string) => {
  if (level === 'low') return <Badge className="bg-green-500 text-white">Низкий</Badge>;
  if (level === 'medium') return <Badge className="bg-yellow-500 text-white">Средний</Badge>;
  return <Badge className="bg-red-500 text-white">Высокий</Badge>;
};

export const getStatusBadge = (status: string) => {
  if (status === 'Допущен') return <Badge variant="outline" className="border-green-500 text-green-700">Допущен</Badge>;
  return <Badge variant="outline" className="border-yellow-500 text-yellow-700">Требуется осмотр</Badge>;
};
