import { ResolveEntitlements } from '@backbase/foundation-ang/entitlements';

export const PERMISSIONS = {
  canViewAccounts: 'ProductSummary.ProductSummary.view OR ProductSummary.ProductSummaryLimitedView.view',
  canViewAccountStatements: 'AccountStatements.ManageStatements.view',
};

export const entitlementFallbacks = async (resolveEntitlements: ResolveEntitlements) => {
  if (await resolveEntitlements(PERMISSIONS.canViewAccountStatements)) return 'account-statements';
  return 'error'; // TODO: we should add error page in case the user doesnt have any permissions
};
