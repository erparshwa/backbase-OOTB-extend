import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {
  AccountStatementBusinessJourneyConfiguration,
  AccountStatementBusinessJourneyConfigurationService,
} from '@backbase/account-statement-business-journey-ang';
import { finalize, switchMap, tap } from 'rxjs';
import {
  AccountStatement,
  AccountStatementDocument,
  AccountStatementsPostRequest,
} from '@backbase/account-statements-http-ang';
import { AccountStatementDomService } from '@backbase/account-statement-shared-ui';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountStatementCustomDataService } from '../services/account-statement-data.service';

@Component({
  selector: 'bb-custom-account-statement-view',
  templateUrl: './custom-account-statement-view.component.html',
})
export class CustomAccountStatementView {
  config!: AccountStatementBusinessJourneyConfiguration;
  statements: AccountStatement[] = [];
  accountIds: string[] = [];
  categories: string[] = [];
  loading = false;
  totalRecords = 0;
  currentPage = 0;
  filter: Partial<AccountStatementsPostRequest> = {};

  filterForm: FormGroup = this.formBuilder.group({
    accountNumber: [''],
    categories: [[]],
  });

  //Whenever user selects/deselects the account(s), route params get updated and based on that this will fetch account statements
  statements$ = this.route.paramMap.pipe(
    tap((params) => {
      this.accountIds = this.getSelectedAccounts(params);
    }),
    switchMap(() => this.getAccountStatements(0)),
  );

  get isFilterApplied() {
    return Object.keys(this.filter).length > 0;
  }

  constructor(
    private configService: AccountStatementBusinessJourneyConfigurationService,
    private accountStatementCustomDataService: AccountStatementCustomDataService,
    private accountStatementDomService: AccountStatementDomService,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private route: ActivatedRoute,
  ) {
    this.configService.allConfig.subscribe((data) => {
      this.config = data;
    });

    this.accountStatementCustomDataService.loadCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  ngOnInit() {
    this.statements$.subscribe();
  }

  //To get the selected accounts from route params
  getSelectedAccounts(params: ParamMap) {
    const accounts = params.get('selectedAccount')?.split(',') || [];
    return !!accounts[0] ? accounts : [];
  }

  //To get the account statements from the backend
  getAccountStatements(page: number, filter: Partial<AccountStatementsPostRequest> = this.filter) {
    this.loading = true;
    return this.accountStatementCustomDataService
      .getAccountStatementsBusiness({
        accountStatementsPostRequest: {
          accountIds: this.accountIds,
          from: page,
          size: this.config.pageSize,
          dateFrom: '1970-01-01',
          dateTo: new Date().toISOString().split('T')[0],
          direction: this.config.sortingDirection,
          orderBy: this.config.sortingOrder,
          ...filter,
        },
      })
      .pipe(
        tap((response: HttpResponse<AccountStatement[]>) => {
          this.currentPage = page;
          this.totalRecords = Number(response.headers.get('x-total-count')) || 0;
          this.statements = response.body || [];
        }),
        finalize(() => {
          this.filter = filter;
          this.loading = false;
        }),
      );
  }

  // Pagination
  onPageChange(page: number) {
    this.getAccountStatements(page).subscribe();
  }

  //When filter is applied by user, this method will check and fetch the filtered statements
  onFilterSubmit() {
    const filter: Partial<AccountStatementsPostRequest> = {
      category:
        this.filterForm.value.categories && this.filterForm.value.categories.length > 0
          ? this.filterForm.value.categories
          : undefined,
      additions: {
        accountNumber: this.filterForm.value.accountNumber,
      },
    };

    if (filter.category || filter.additions?.accountNumber) {
      this.getAccountStatements(0, filter).subscribe();
    }
  }

  //When user resets the filter, this method will fetch all statements of selected accounts
  resetFilter() {
    this.filterForm.reset();
    this.getAccountStatements(0, {}).subscribe();
  }

  // View / download Doc methods

  getPdfDoc(documents: AccountStatementDocument[]) {
    return documents.find((document) => document.contentType === 'application/pdf');
  }

  viewOnline(documents: AccountStatementDocument[]) {
    const doc = this.getPdfDoc(documents);
    if (doc && doc.url) {
      this.accountStatementDomService.simulateLinkClick(
        {
          target: '_blank',
          href: doc.url,
        },
        this.renderer,
      );
    } else {
      this.goToDownloadFile(documents);
    }
  }

  goToDownloadFile(documents: AccountStatementDocument[]) {
    const doc = this.getPdfDoc(documents);
    if (doc && doc?.uid) {
      this.accountStatementDomService.simulateLinkClick(
        {
          target: '_blank',
          href: this.accountStatementCustomDataService.getAccountStatementDownloadUrl(doc.uid),
        },
        this.renderer,
      );
    }
  }
}
