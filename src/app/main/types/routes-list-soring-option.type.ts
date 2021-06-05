import { Route } from './route.type';

export interface RoutesListSoringOption {
  column: keyof Route;
  isDesc: boolean;
}
