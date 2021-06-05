import { SidenavLink } from '../types/sidenav-link.type';

export const sidenavLinksConfig: SidenavLink[] = [
  {
    name: 'Маршруты',
    routerLink: '/routes/list',
  },
  {
    name: 'Новый маршрут',
    routerLink: '/routes/create',
  }
];
