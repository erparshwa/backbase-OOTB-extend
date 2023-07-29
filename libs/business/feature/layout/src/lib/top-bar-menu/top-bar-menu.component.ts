import { Component } from '@angular/core';
import { LayoutService } from '@backbase/ui-ang/layout';

@Component({
  selector: 'bb-top-bar-menu',
  templateUrl: './top-bar-menu.component.html',
})
export class TopBarMenuComponent {
  constructor(public readonly layoutService: LayoutService) {}
}
