import { Component, Inject, OnInit } from '@angular/core';
import { IPV4_REGEX } from '../../tokens/ipv4-regex.token';
import { ROUTER_INTERFACES } from '../../tokens/route-interfaces.token';
import { SUBNET_MASKS } from '../../tokens/subnet-masks.token';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoutesDataService } from '../../services/routes-data.service';

@Component({
  selector: 'app-route-creation-form',
  templateUrl: './route-creation-form.component.html',
  styleUrls: ['./route-creation-form.component.scss']
})
export class RouteCreationFormComponent implements OnInit {

  public readonly formGroup: FormGroup;

  constructor(
    @Inject(IPV4_REGEX)
    private ipv4RegExp: RegExp,
    @Inject(ROUTER_INTERFACES)
    public routerInterfaces: string[],
    @Inject(SUBNET_MASKS)
    public subnetMasks: string[],
    private formBuilder: FormBuilder,
    private routesDataService: RoutesDataService,
  ) {
    this.formGroup = this.formBuilder.group({
      address: [null, [
        Validators.required, Validators.pattern(this.ipv4RegExp)
      ]],
      mask: [null, Validators.required],
      gateway: [null, [
        Validators.required, Validators.pattern(this.ipv4RegExp)
      ]],
      interface: '',
    });
  }

  public ngOnInit(): void {
  }

  public handleSubmitClick(): void {
    if (this.formGroup.valid) {
      this.routesDataService.create(this.formGroup.value);
    }
  }

}
