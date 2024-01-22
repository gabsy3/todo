import { Injectable, inject } from '@angular/core';
import { ITodo } from '../models/todo.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  origTodo:ITodo[] = [];
  todos = new BehaviorSubject<ITodo[]>([]);
  httpClient = inject(HttpClient);
  constructor() {}

  initTodos() {
    return this.httpClient
      .get<ITodo[]>('http://localhost:3000/todos')
      .subscribe((data) => {
        this.origTodo = data;
        this.todos.next(data);
      });
  }
  getTodos() {
    return this.todos.asObservable();
  }
  addTodo(todo: ITodo) {
    return this.httpClient
      .post<ITodo[]>('http://localhost:3000/todos', todo)
  }
  updateTodo(todos: ITodo[], todo: ITodo) {
    const todoIndex = todos.findIndex((item) => item.id === todo.id);
    return this.httpClient.put<ITodo[]>(
      'http://localhost:3000/todos/',
      todoIndex
    );
  }
  removeTodo(todos: ITodo[], todo: ITodo) {
    return this.httpClient.delete<ITodo[]>('http://localhost:3000/todos/' + todo.id);
  }
  filterTodosByStatus(status: string) {
    if (status === 'ALL') {
      return this.origTodo;
    }
    return this.origTodo.filter((items) => items.status === status);
  }
}
