import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'orlo-home',
  templateUrl: './home.component.html',

  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor() {
  }

  feedShown = false;

  toggleFeed() {
    this.feedShown = !this.feedShown;
  }

  ngOnInit() {

  }

}
