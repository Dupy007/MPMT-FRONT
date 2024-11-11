import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "./auth.service";
import {environment} from "../../env";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = environment.apiURL+"/project";
  private headers: any;

  constructor(private http: HttpClient, private authservice: AuthService) {
    this.headers = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + authservice.token};
  }

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, {headers: this.headers});
  }

  getProjectById(id: string | null): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, {headers: this.headers});
  }

  createProject(project: any): Observable<any> {
    return this.http.post(this.apiUrl, project, {headers: this.headers});
  }

  updateProject(id: string, project: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, project, {headers: this.headers});
  }
  linkProject(id: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/link`, data, {headers: this.headers});
  }
}
