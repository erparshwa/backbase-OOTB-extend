import { NgModule } from '@angular/core';
import { APP_ACCOUNT_STATEMENT_BASE_PATH, APP_ARRANGEMENT_MANAGER_BASE_PATH } from '../service-paths.module';
import {
  ACCOUNT_STATEMENT_BUSINESS_JOURNEY_ACCOUNT_STATEMENT_BASE_PATH,
  ACCOUNT_STATEMENT_BUSINESS_JOURNEY_ARRANGEMENT_MANAGER_BASE_PATH,
  ACCOUNT_STATEMENT_BUSINESS_JOURNEY_CONFIGURATION_TOKEN,
  AccountStatementBusinessJourneyConfiguration,
} from '@backbase/account-statement-business-journey-ang';
import { CustomAccountStatementModule } from '@backbase/business/feature/custom-account-statement';

@NgModule({
  imports: [CustomAccountStatementModule],
  providers: [
    {
      provide: ACCOUNT_STATEMENT_BUSINESS_JOURNEY_CONFIGURATION_TOKEN,
      useValue: {
        pageSize: 5,
        selectMultipleAccounts: true,
      } as Partial<AccountStatementBusinessJourneyConfiguration>,
    },
    {
      provide: ACCOUNT_STATEMENT_BUSINESS_JOURNEY_ACCOUNT_STATEMENT_BASE_PATH,
      useExisting: APP_ACCOUNT_STATEMENT_BASE_PATH,
    },
    {
      provide: ACCOUNT_STATEMENT_BUSINESS_JOURNEY_ARRANGEMENT_MANAGER_BASE_PATH,
      useExisting: APP_ARRANGEMENT_MANAGER_BASE_PATH,
    },
  ],
})
export class AccountStatementJourneyBundleModule {}
