import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  map
} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ISearchUser, IUser } from './users.types';
const URL_BASE = 'https://randomuser.me/api/';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public searchUsers(name: string, page, itemsPerPage): Observable<ISearchUser> {
    return this.http.get<any>(this.getUrl(name, page, itemsPerPage)).pipe(
      map(response => response)
    );
  }

  public getUser(id: string): Observable<IUser> {
    return this.http.get<any>(`${URL_BASE}id/${id}`).pipe(
      map(response => response.results)
    );
  }

  getUrl(seed: string, page: number, itempsPerPage: number): string {
    return `${URL_BASE}?page=${page}&results=${itempsPerPage}&seed=${seed}`;
  }
}
