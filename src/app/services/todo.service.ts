import { Injectable, inject } from '@angular/core';
import { ITodo } from '../models/todo.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  origTodo: ITodo[] = [];
  todos = new BehaviorSubject<ITodo[]>([]);
  httpClient = inject(HttpClient);
  totalTodos   = new BehaviorSubject<{totalOpened:number , totalClosed : number}>({totalOpened: 0, totalClosed :0})
  constructor() {}

  initTodos() {
    return this.httpClient
      .get<ITodo[]>('https://my-json-server.typicode.com/gabsy3/todo/todos')
      .subscribe((data) => {
        this.origTodo = data;
        this.todos.next(data);
        this.showTotal();
      });
  }
  getTotalTodos(){
    return this.totalTodos.asObservable();
  }
  getTodos() {
    return this.todos.asObservable();
  }
  addTodo(todo: ITodo) {
    return this.httpClient.post<ITodo[]>('https://my-json-server.typicode.com/gabsy3/todo/todos', todo);
  }
  updateTodo(todo: ITodo) {
    return this.httpClient.put<ITodo[]>(
      'https://my-json-server.typicode.com/gabsy3/todo/todos/' + todo.id , todo);
  }
  removeTodo(todo: ITodo) {
    return this.httpClient.delete<ITodo[]>(
      'https://my-json-server.typicode.com/gabsy3/todo/todos/' + todo.id
    );
  }
  filterTodosByStatus(status: string) {
    if (status === 'ALL') {
      return this.origTodo;
    }
    return this.origTodo.filter((items) => items.status === status);
  }
  showTotal(){
    const closed = this.origTodo.filter(data=> data.status === 'CLOSE').length;
    const opened = this.origTodo.filter(data=> data.status === 'OPEN').length;
    this.totalTodos.next({totalOpened: opened, totalClosed :closed});

  }
}
