import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import 'rxjs/Rx'; // This or ...
// all the below imports
import "rxjs/add/observable/of";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  showContent = false;
  blogPosts: { title: string; body: string }[];

  constructor(private http: HttpClient) {}

  onLoadContent() {
    this.showContent = true
  }

  ngOnInit() {
    this.http
      .get<{ id: number; userId: number; title: string; body: string }[]>(
        "https://jsonplaceholder.typicode.com/posts"
      )
      .map(data => {
        return data.map(el => ({ title: el.title, body: el.body }));
      })
      // .mergeMap(transformedData => transformedData)
      .catch(error => {
        return Observable.throw('Something went wrong!');
      })
      .subscribe((transformedData: {title: string, body: string}[]) => {
        this.blogPosts = transformedData;
      });
  }
}
