import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'orlo-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Orlo';
  translationsReady = false;

  constructor(translate: TranslateService) {

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('es');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('es');

    translate.get('DATA.NAME').subscribe(() => {
      this.translationsReady = true;
    });
  }
}
