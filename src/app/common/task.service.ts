import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../task-board/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  createTask(task: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, task);
  }

  getTasks(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/`);
  }

  getTasksPagination(
    page: number,
    limit: number,
    filter?: string
  ): Observable<Task[]> {
    let params = `?page=${page}&limit=${limit}`;
    if (filter) {
      params += `&filter=${filter}`;
    }
    return this.http.get<Task[]>(`${this.apiUrl}/pagination/${params}`);
  }

  updateTask(task: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${task._id}`, task);
  }

  getStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stats`);
  }
}
