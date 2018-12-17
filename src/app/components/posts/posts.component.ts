import {Component, HostListener, OnInit} from '@angular/core';
import {IPost} from '../../interfaces/IPost';
import {FeedService} from '../../services/feed/feed.service';

@Component({
  selector: 'orlo-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: IPost[];
  viewPort: IPost[];
  allItems: any;
  page = 1;
  pageSize = 9;
  rendered = false;

  resizeGridItem(item) {
    const grid = document.getElementsByClassName('posts-wrapper')[0];
    const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
    const rowSpan = Math.ceil((item.querySelector('.card').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
    item.style.gridRowEnd = 'span ' + rowSpan;
  }

  resizeAllGridItems() {
    this.allItems = document.getElementsByClassName('item');
    for (let x = 0; x < this.allItems.length; x++) {
      this.resizeGridItem(this.allItems[x]);
    }
    this.rendered = true;
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (this.rendered && (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 150) {
      this.page++;
      this.viewPort = this.posts.slice(0, this.page * this.pageSize);
      this.resizeAllGridItems();
    }
  }

  @HostListener('window:resize', [])
  onResize(): void {
    this.resizeAllGridItems();
  }


  constructor(private feedsService: FeedService) {
  }

  update() {
    this.feedsService.updateAllFeedPosts();
  }

  ngOnInit() {
    this.feedsService.postsSubscription().subscribe((res: IPost[]) => {
      this.posts = res;
      this.viewPort = this.posts.slice(0, this.pageSize);
      setTimeout(() => {
        this.resizeAllGridItems();
      });

    });
  }


}
