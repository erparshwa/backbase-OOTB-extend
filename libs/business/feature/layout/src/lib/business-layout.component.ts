import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '@backbase/ui-ang/layout';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'bb-business-layout',
  templateUrl: './business-layout.component.html',
})
export class BusinessLayoutComponent {
  constructor(
    public readonly layoutService: LayoutService,
    private readonly router: Router,
    private readonly oAuthService: OAuthService,
  ) {}

  logout() {
    this.oAuthService.logOut();
  }
}
