import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, of, throwError } from "rxjs";
// all the below imports
import { map, catchError } from 'rxjs/operators';

import { AlertService } from "./alert.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  showContent = false;
  blogPosts: { title: string; body: string }[];

  constructor(private http: HttpClient, private alertService: AlertService) {}

  onLoadContent() {
    this.showContent = true
  }

  onShowAlert() {
    this.alertService.showAlert();
  }

  ngOnInit() {
    this.http
      .get<{ id: number; userId: number; title: string; body: string }[]>(
        "https://jsonplaceholder.typicode.com/posts"
      )
      .pipe(map(data => {
        return data.map(el => ({ title: el.title, body: el.body }));
      }), catchError(error => {
        return throwError('Something went wrong!');
      }))
      // .mergeMap(transformedData => transformedData)
      .subscribe((transformedData: {title: string, body: string}[]) => {
        this.blogPosts = transformedData;
      });
  }
}
