import {Component, OnInit} from '@angular/core';
import {IFeed} from '../../interfaces/IFeed';
import {FeedService} from '../../services/feed/feed.service';
import {FormBuilder, Validators} from '@angular/forms';
import {AlertService} from '../../services/alerts/alert.service';

@Component({
  selector: 'orlo-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss']
})
export class FeedsComponent implements OnInit {
  feeds: IFeed[];
  feedFilter:string;
  feedForm = this.formBuilder.group({
    name: ['', Validators.required],
    url: ['', Validators.required]
  });

  constructor(private feedsService: FeedService, private formBuilder: FormBuilder, private alertService: AlertService) {
  }

  ngOnInit() {
    this.feeds = this.feedsService.feeds;
  }

  removeFeed(feed) {
    this.feedsService.removeFeed(feed);
  }

  newFeed() {
    this.feedsService.createFeed(this.feedForm.value).then(() => {
        this.feedForm.reset();
        this.alertService.success('New feed added successfully',);
      }, (errorMessage) => {
        this.alertService.error(errorMessage);
      }
    );
  }
}
