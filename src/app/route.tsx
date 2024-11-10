import {Landing} from '@/app/Landing';
import TimeTable from '@/app/TimeTable';

export const Routeroot = () => {
  const token = localStorage.getItem('token') as string;
  return (token === '' ? <Landing /> : <TimeTable />);
};