import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from './entities/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private static API_TODO_PATH: string = `${environment.apiUrl}/todo`;

  constructor(private http: HttpClient) { }

  public getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(TodoService.API_TODO_PATH);
  }

  public addTodo(todo: Todo): Observable<any> {
    return this.http.post(TodoService.API_TODO_PATH, todo);
  }

  public updateTodoStatus(uuid: string): Observable<any> {
    return this.http.patch(`${TodoService.API_TODO_PATH}/${uuid}`, null);
  }

  public deleteTodo(uuid: string): Observable<any> {
    return this.http.delete(`${TodoService.API_TODO_PATH}/${uuid}`);
  }

  public deleteAllCompletedTodos(): Observable<any> {
    return this.http.delete(TodoService.API_TODO_PATH);
  }
}
