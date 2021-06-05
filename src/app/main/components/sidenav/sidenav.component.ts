import { Component, Inject, OnInit } from '@angular/core';
import { SIDENAV_LINKS } from '../tokens/sidenav-links.token';
import { SidenavLink } from '../../types/sidenav-link.type';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(
    @Inject(SIDENAV_LINKS)
    public sidenavLinks: SidenavLink[],
  ) { }

  public ngOnInit(): void {
  }

}
