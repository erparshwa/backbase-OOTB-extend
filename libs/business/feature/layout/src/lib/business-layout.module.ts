import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from '@backbase/ui-ang/button';
import { IconModule } from '@backbase/ui-ang/icon';
import { LayoutModule } from '@backbase/ui-ang/layout';
import { LogoModule } from '@backbase/ui-ang/logo';
import { UserContextMenuWidgetModule } from '@backbase/user-context-menu-widget-ang';
import { BusinessLayoutComponent } from './business-layout.component';
import { TopBarMenuComponent } from './top-bar-menu/top-bar-menu.component';

@NgModule({
  declarations: [BusinessLayoutComponent, TopBarMenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    IconModule,
    UserContextMenuWidgetModule,
    LogoModule,
    LayoutModule,
  ],
  exports: [BusinessLayoutComponent, TopBarMenuComponent, LayoutModule],
})
export class BusinessLayoutModule {}
