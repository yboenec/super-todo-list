import { DomSanitizer } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    this.addIcon('account_box', 'account_box');
    this.addIcon('check', 'check');
  }

  private addIcon(iconName: string, iconFile: string) {
    this.iconRegistry.addSvgIcon(
      iconName,
      this.sanitizer.bypassSecurityTrustResourceUrl(
        `../assets/icons_svg/${iconFile}.svg`
      )
    );
  }
}
