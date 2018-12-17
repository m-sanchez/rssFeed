import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {IFeed} from '../../interfaces/IFeed';
import {IPost} from '../../interfaces/IPost';
import {forkJoin} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';

@Injectable()
export class FeedService {
  private postsSubject: BehaviorSubject<any> = new BehaviorSubject<IPost[]>([]);
  private _feeds: IFeed[];

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) {
    this._feeds = JSON.parse(localStorage.getItem('feeds')) || [];
    this.populatePosts(false);
  }

  static sortFunction(postA: IPost, postB: IPost) {
    const dateA = new Date(postA.pubDate);
    const dateB = new Date(postB.pubDate);
    if (dateA < dateB) {
      return 1;
    }
    if (dateA > dateB) {
      return -1;
    }
    return 0;
  }

  get feeds() {
    return this._feeds;
  }

  populatePosts(force: boolean) {
    const posts = JSON.parse(localStorage.getItem('posts'));
    if (posts && !force) {
      this.postsSubject.next(posts);
    } else {
      this.updateAllFeedPosts();
    }
  }

  public postsSubscription(): Observable<any> {
    return this.postsSubject.asObservable();
  }


  getSingleFeedPosts(feed: IFeed) {
    return this.http.get<any>(`${environment.apiHost}${feed.url}`);
  }

  updateAllFeedPosts() {
    this.spinner.show();
    this.postsSubject.next([]);
    const arrayPromises = this._feeds.map((feed) => {
      return this.getSingleFeedPosts(feed);
    });
    forkJoin(arrayPromises).subscribe((values: any) => {
      const postArrays = values.map((singleFeed, index) => singleFeed.items.map((singlePost) => {
        singlePost.feedName = this._feeds[index].name;
        singlePost.source = singleFeed.feed.url;
        return singlePost;
      }));
      const newArr = Array.prototype.concat(...postArrays);
      this.postsSubject.next(newArr.sort(FeedService.sortFunction));
      localStorage.setItem('posts', JSON.stringify(this.postsSubject.value));
      this.spinner.hide();
    });
  }


  createFeed(newFeed: IFeed) {
    this.spinner.show();
    return new Promise((resolve, reject) => {
      this.getSingleFeedPosts(newFeed).subscribe((res) => {
        const newItems = res.items.map(singlePost => {
          singlePost.feedName = newFeed.name;
          singlePost.source = res.feed.url;
          return singlePost;
        });
        const newPosts = [...this.postsSubject.value, ...newItems];
        this.postsSubject.next(newPosts.sort(FeedService.sortFunction));
        localStorage.setItem('posts', JSON.stringify(this.postsSubject.value));
        newFeed = {...newFeed, ...res.feed};
        this._feeds.push(newFeed);
        localStorage.setItem('feeds', JSON.stringify(this._feeds));
        this.spinner.hide();
        resolve();
      }, (res) => {
        this.spinner.hide();
        reject(res && res.error ? res.error.message : 'Something went wrong');
      });
    });
  }

  removeFeed(feedToRemove: IFeed) {
    const index = this._feeds.indexOf(feedToRemove);
    const postsArray = this.postsSubject.value.filter((post: IPost) => {
      return post.source !== feedToRemove.url;
    });
    this.postsSubject.next(postsArray);
    localStorage.setItem('posts', JSON.stringify(this.postsSubject.value));
    if (index > -1) {
      this._feeds.splice(index, 1);
    }
    localStorage.setItem('feeds', JSON.stringify(this._feeds));
  }
}
