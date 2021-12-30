import { Component, OnDestroy, OnInit } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, OnDestroy {

  posts: ScullyRoute[] = [];
  private routeSub: Subscription | undefined;

  constructor(
    private scullyService: ScullyRoutesService
  ) { }

  ngOnInit(): void {
    this.routeSub = this.scullyService.available$.subscribe(
      next => {
        this.posts = next.filter(item => item.title);
      }
    );
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();   
  }
}
