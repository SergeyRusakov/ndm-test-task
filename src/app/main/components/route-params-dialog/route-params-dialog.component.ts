import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Route } from '../../types/route.type';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-route-params-dialog',
  templateUrl: './route-params-dialog.component.html',
  styleUrls: ['./route-params-dialog.component.scss']
})
export class RouteParamsDialogComponent implements OnInit {

  public formGroup: FormGroup;
  private route: Route;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private matDialogData: Route,
    private formBuilder: FormBuilder,
  ) {
    this.route = matDialogData;
    this.formGroup = this.formBuilder.group({
      address: this.route.address ,
      mask: this.route.mask,
      gateway: this.route.gateway,
      interface: this.route.interface,
    });
  }

  public ngOnInit(): void {
  }

}
