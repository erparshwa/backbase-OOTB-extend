import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AccountStatement,
  AccountStatementHttpService,
  PostAccountStatementsRequestParams,
} from '@backbase/account-statements-http-ang';
import { catchError, map, of, throwError } from 'rxjs';

@Injectable()
export class AccountStatementCustomDataService {
  constructor(private readonly accountStatementsHttpService: AccountStatementHttpService) {}

  // To get the account statements
  getAccountStatementsBusiness(params: PostAccountStatementsRequestParams) {
    return !!params?.accountStatementsPostRequest?.accountIds?.length
      ? this.accountStatementsHttpService.postAccountStatements(params, 'response').pipe(
          catchError(() => {
            alert('Something went wrong');
            return throwError(() => new Error('Something went wrong'));
          }),
        )
      : of(new HttpResponse<AccountStatement[]>());
  }

  // To get the account statement download url
  getAccountStatementDownloadUrl(uid: string) {
    return this.accountStatementsHttpService.downloadAccountStatementsUrl({
      uid,
    });
  }

  // To load the categories
  loadCategories() {
    return this.accountStatementsHttpService.getCategories('response').pipe(
      map(({ body }) => {
        if (body === null) {
          throw new Error('Response does not contain body');
        }
        return body.categories;
      }),
    );
  }
}
