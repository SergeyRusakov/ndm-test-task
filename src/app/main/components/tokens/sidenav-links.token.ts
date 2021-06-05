import { InjectionToken } from '@angular/core';
import { SidenavLink } from '../../types/sidenav-link.type';

export const SIDENAV_LINKS = new InjectionToken<SidenavLink[]>('Sidenav Links');
