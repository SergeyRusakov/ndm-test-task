import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route } from '../../types/route.type';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IPV4_REGEX } from '../../tokens/ipv4-regex.token';
import { ROUTER_INTERFACES } from '../../tokens/route-interfaces.token';
import { SUBNET_MASKS } from '../../tokens/subnet-masks.token';
import { RoutesDataService } from '../../services/routes-data.service';
import { RouteUpdateForm } from '../../types/route-update-form.type';

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
    @Inject(IPV4_REGEX)
    private ipv4RegExp: RegExp,
    @Inject(ROUTER_INTERFACES)
    public routerInterfaces: string[],
    @Inject(SUBNET_MASKS)
    public subnetMasks: string[],
    private dialog: MatDialogRef<RouteParamsDialogComponent>,
    private formBuilder: FormBuilder,
    private routesDataService: RoutesDataService,
  ) {
    this.route = matDialogData;
    this.formGroup = this.formBuilder.group({
      address: [this.route.address, [
        Validators.required, Validators.pattern(this.ipv4RegExp)
      ]],
      mask: [this.route.mask, Validators.required],
      gateway: [this.route.gateway, [
        Validators.required, Validators.pattern(this.ipv4RegExp)
      ]],
      interface: this.route.interface,
    });
  }

  public ngOnInit(): void {
  }

  public handleSubmitClick(): void {
    if (this.formGroup.valid) {
      const changedValues: RouteUpdateForm = {}
      Object.keys(this.formGroup.value)
        .forEach(key => {
          if (this.route[key as keyof Route] !== this.formGroup.value[key]) {
            changedValues[key as keyof RouteUpdateForm] = this.formGroup.value[key];
          }
        });
      if (Object.keys(changedValues).length) {
        this.routesDataService.updateRoute(changedValues, this.route.uuid);
        this.dialog.close();
      }
    }
  }

  public handleExitClick(): void {
    this.dialog.close();
  }

  public handleDeleteClick(): void {
    this.routesDataService.delete(this.route.uuid);
    this.dialog.close();
  }


}
