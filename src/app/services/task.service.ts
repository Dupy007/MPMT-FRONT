import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";
import {environment} from "../../env";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = environment.apiURL+"/task";
  private headers: any;

  constructor(private http: HttpClient, private authservice: AuthService) {
    this.headers = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + authservice.token};
  }
  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, {headers: this.headers});
  }
  getTaskById(id: string | null): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, {headers: this.headers});
  }

  createTask(task: any): Observable<any> {
    return this.http.post(this.apiUrl, task, {headers: this.headers});
  }

  updateTask(task: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${task.id}`, task, {headers: this.headers});
  }
}
