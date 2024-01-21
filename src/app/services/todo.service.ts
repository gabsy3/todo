import { Injectable, inject } from '@angular/core';
import { ITodo } from '../models/todo.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, tap  } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos = new BehaviorSubject<ITodo[]>([]);
  httpClient = inject(HttpClient);
  constructor() {}

  initTodos() {
    this.httpClient
      .get<ITodo[]>('http://localhost:3000/todos')
      .subscribe((data) => {
        this.todos.next(data);
      });
  }
  getTodos() {
    return this.todos;
  }
  addTodo(todo: ITodo) {
    this.httpClient
      .post<ITodo[]>('http://localhost:3000/todos', todo)
      .subscribe((data) => {
        this.todos.next(data);
      });
  }
  updateTodo(todos: ITodo[], todo: ITodo) {
    const todoIndex = todos.findIndex((item) => item.id === todo.id);
    this.httpClient
      .put<ITodo[]>('http://localhost:3000/todos/', todoIndex)
      .subscribe((data) => {
        this.todos.next(data);
      });
  }
  removeTodo(todos: ITodo[], todo: ITodo) {
    this.httpClient
      .delete<ITodo[]>('http://localhost:3000/todos/' + todo.id)
      .subscribe((data) => {
        this.todos.next(data);
      });
  }
  filterTodosByStatus(status: string) {
    if(status === "ALL"){
      return this.todos.getValue();
    }
    return this.todos.getValue().filter(items => items.status === status);
  }
}
