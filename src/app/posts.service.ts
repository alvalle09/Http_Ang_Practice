import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from 'rxjs';
import { map, catchError, tap } from "rxjs/operators";
import { Post } from "./post.model";

@Injectable({ providedIn: "root" })
export class PostsService {
  //error = new Subject<string>();  

  constructor(private http: HttpClient){};

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };

    // Send Http request
    return this.http
      .post<{ name: string }>(
        "https://ng-complete-guide-d4625-default-rtdb.firebaseio.com/posts.json",
        postData,
        {
          observe: 'response',
          responseType: 'json'
        }
      );
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custon', 'key');

    return this.http
      .get<{ [key: string]: Post }>(
        "https://ng-complete-guide-d4625-default-rtdb.firebaseio.com/posts.json",
        {
          headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
          params: searchParams
        }
      )
      .pipe(
        map((responseData) => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError(errorRes => {
            // do some tasks with error, i.e. analytics
            return throwError(errorRes);
        })
      );
  }

  deletePosts() {
    return this.http.delete(
      "https://ng-complete-guide-d4625-default-rtdb.firebaseio.com/posts.json",
      {
        observe: 'events'
      })
      .pipe(
        tap(event => {
          console.log(event);
          if (event.type === HttpEventType.Sent) {
            // ...
          }
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }
}
