import { NgModule } from '@angular/core';
import {
  AccountStatementArchiveDownloadViewComponent,
  AccountStatementBusinessJourneyComponent,
  AccountStatementBusinessJourneyModule,
} from '@backbase/account-statement-business-journey-ang';
import { AccountStatementSharedFeatureModule } from '@backbase/account-statement-shared-feature';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from '@backbase/ui-ang/pagination';
import { LoadingIndicatorModule } from '@backbase/ui-ang/loading-indicator';
import { IconModule } from '@backbase/ui-ang/icon';
import { AccountStatementDomService } from '@backbase/account-statement-shared-ui';
import { ReactiveFormsModule } from '@angular/forms';
import { CollapsibleAccordionModule } from '@backbase/ui-ang/collapsible-accordion';
import { CollapsibleCardModule } from '@backbase/ui-ang/collapsible-card';
import { InputTextModule } from '@backbase/ui-ang/input-text';
import { DropdownMultiSelectModule } from '@backbase/ui-ang/dropdown-multi-select';
import { ButtonModule } from '@backbase/ui-ang/button';
import { CustomAccountStatementView } from './account-view/custom-account-statement-view.component';
import { AccountStatementCustomDataService } from './services/account-statement-data.service';

@NgModule({
  declarations: [CustomAccountStatementView],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PaginatorModule,
    LoadingIndicatorModule,
    IconModule,
    ButtonModule,
    CollapsibleAccordionModule,
    CollapsibleCardModule,
    InputTextModule,
    DropdownMultiSelectModule,
    AccountStatementSharedFeatureModule,
    AccountStatementBusinessJourneyModule.forRoot({
      routes: {
        path: '',
        component: AccountStatementBusinessJourneyComponent,
        children: [
          {
            path: '',
            component: CustomAccountStatementView,
          },
          {
            path: 'download',
            component: AccountStatementArchiveDownloadViewComponent,
          },
          { path: '**', redirectTo: '', pathMatch: 'full' },
        ],
      },
    }),
  ],
  providers: [AccountStatementCustomDataService, AccountStatementDomService],
})
export class CustomAccountStatementModule {}
