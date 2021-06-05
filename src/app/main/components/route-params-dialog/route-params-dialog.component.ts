import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route } from '../../types/route.type';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPV4_REGEX } from '../../tokens/ipv4-regex.token';

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
    private formBuilder: FormBuilder,
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

}
