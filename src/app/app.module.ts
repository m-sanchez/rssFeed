import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {AlertModule} from 'ngx-bootstrap/alert';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {routing} from './app.routes';
import {SharedModule} from './shared/shared.module';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {FeedsComponent} from './components/feeds/feeds.component';
import {PostsComponent} from './components/posts/posts.component';
import {FeedService} from './services/feed/feed.service';
import {CommonModule} from '@angular/common';
import {SinglePostComponent} from './components/posts/single-post/single-post.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FilterFeedPipe } from './pipes/filter-feed.pipe';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

export function createTranslateLoader(http: HttpClient) {
  // return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FeedsComponent,
    PostsComponent,
    SinglePostComponent,
    FilterFeedPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule.forRoot(),
    CommonModule,
    NgxSpinnerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    routing,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [FeedService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
