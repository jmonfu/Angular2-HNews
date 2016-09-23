import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

import { HackerNewsAPIService } from '../hackernews-api.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})

export class StoriesComponent implements OnInit {
  typeSub: any;
  pageSub: any;
  items;
  storiesType;
  pageNum: number;
  listStart: number;

  constructor(
    private _hackerNewsAPIService: HackerNewsAPIService, 
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    //We then subscribe to the route data property and store storiesType into a component variable in the ngOnInit hook.
    this.typeSub = this.route
      .data
      .subscribe(data => this.storiesType = data.storiesType);

    //And finally, we subscribe to the route parameters and obtain the page number. We then fetch the list of stories using our data service.
    //To signal completion, we use onCompleted() to update a listStart variable which is used as the starting value of our ordered list (which you can see in the markup below). 
    this.pageSub = this.route.params.subscribe(params => {
      this.pageNum = +params['page'] ? +params['page'] : 1;
      this._hackerNewsAPIService.fetchStories(this.storiesType, this.pageNum)
                              .subscribe(
                                items => this.items = items,
                                error => console.log('Error fetching' + this.storiesType + 'stories'),
                                () => this.listStart = ((this.pageNum - 1) * 30) + 1);
    });
  }
}