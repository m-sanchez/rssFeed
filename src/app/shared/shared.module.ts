import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {AlertComponent} from './alert/alert.component';
import {AlertModule} from 'ngx-bootstrap/alert';

@NgModule({
  declarations: [AlertComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule,
    TranslateModule.forRoot()
  ],
  exports: [
    AlertComponent
  ]
})
export class SharedModule {
}
