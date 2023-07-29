/*
 *
 * The content of this file can be edited freely, but to maintain upgradability
 * this file should not be renamed and should always export an Angular module named
 * `AppRoutingModule`.
 *
 *
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntitlementsGuard } from '@backbase/foundation-ang/entitlements';
import { AuthGuard } from '@backbase/shared/feature/auth';
import { SharedUserContextGuard } from '@backbase/shared/feature/user-context';
import { entitlementFallbacks, PERMISSIONS } from './auth/permissions';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'account-statements',
  },
  {
    path: 'select-context',
    loadChildren: () => import('./user-context/user-context.module').then((m) => m.UserContextModule),
    data: {
      title: $localize`:@@context-selection.nav.item.title:Select Context`,
    },
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'account-statements',
      },

      /**
       * Accounts & Cards
       */
      {
        path: 'accounts',
        loadChildren: () =>
          import('./journeys/accounts-journey-bundle.module').then((m) => m.AccountsJourneyBundleModule),
        data: {
          title: $localize`:@@accounts.nav.item.title:Accounts`,
          entitlements: PERMISSIONS.canViewAccounts,
          redirectTo: entitlementFallbacks,
        },
      },
      {
        path: 'account-statements',
        loadChildren: () =>
          import('./journeys/accounts-statement-journey-bundle.module').then(
            (m) => m.AccountStatementJourneyBundleModule,
          ),
        data: {
          title: $localize`:@@account-statements.nav.item.title:Account Statements`,
          entitlements: PERMISSIONS.canViewAccountStatements,
          redirectTo: 'accounts',
        },
      },
    ],
    canActivate: [AuthGuard, SharedUserContextGuard],
    canActivateChild: [EntitlementsGuard],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'account-statements',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
