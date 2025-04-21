import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:3000/users";
  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.url);
  }
  getUserById(id: string): Observable<Users> {
    return this.http.get<Users>(`${this.url}/${id}`);
  }

  addUser(user: Users): Observable<Users> {
    return this.http.post<Users>(this.url, user);
  }

  updateUser(id: string, updatedUser: Users): Observable<Users> {
    return this.http.put<Users>(`${this.url}/${id}`, updatedUser);
  }
}
