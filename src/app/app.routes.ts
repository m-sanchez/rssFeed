import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {PostsComponent} from './components/posts/posts.component';
import {FeedsComponent} from './components/feeds/feeds.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'feeds', component: FeedsComponent},
  {path: 'posts', component: PostsComponent},
  // otherwise redirect to home
  {path: '**', redirectTo: ''}];

export const routing = RouterModule.forRoot(appRoutes);
