import {Component, Input, OnInit} from '@angular/core';
import {IPost} from '../../../interfaces/IPost';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'orlo-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
  @Input() post: IPost;
  sanitizedContent: SafeHtml;

  constructor(private domSanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.sanitizedContent = this.domSanitizer.bypassSecurityTrustHtml(this.post.content);
  }

}
