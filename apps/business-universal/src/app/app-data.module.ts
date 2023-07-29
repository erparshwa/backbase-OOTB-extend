import { InjectionToken, NgModule } from '@angular/core';
import { ACCESS_CONTROL_BASE_PATH } from '@backbase/data-ang/accesscontrol';
import { ACCESS_CONTROL_BASE_PATH as ACCESS_CONTROL_V3_BASE_PATH } from '@backbase/accesscontrol-v3-http-ang';
import { ACCOUNT_STATEMENT_BASE_PATH } from '@backbase/data-ang/account-statements';
import { ARRANGEMENT_MANAGER_BASE_PATH } from '@backbase/data-ang/arrangements';
import { environment } from '../environments/environment';

const dataModulePaths: [InjectionToken<string>, string][] = [
  [ACCESS_CONTROL_BASE_PATH, '/access-control'],
  [ACCESS_CONTROL_V3_BASE_PATH, '/access-control'],
  [ACCOUNT_STATEMENT_BASE_PATH, '/account-statement'],
  [ARRANGEMENT_MANAGER_BASE_PATH, '/arrangement-manager'],
];

@NgModule({
  providers: [
    ...dataModulePaths.map(([token, servicePath]) => ({
      provide: token,
      useValue: `${environment.apiRoot}${servicePath}`,
    })),
  ],
})
export class AppDataModule {}
