import { Injectable, inject } from '@angular/core';
import { ITodo } from '../models/todo.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos = new Observable<ITodo[]>();
  httpClient = inject(HttpClient);
  constructor() {}
  getTodos(): Observable<ITodo[]> {
    this.todos = this.httpClient.get<ITodo[]>('http://localhost:3000/todos');
    return this.todos;
  }
  addTodo(todo: ITodo) {
    this.todos.pipe(
      map((todos) => {
        todos.push(todo);
      })
    );
  }
  updateTodo(todo: ITodo) {
    this.todos.pipe(
      map((todos) => {
        const todoIndex = todos.findIndex((item) => item.id === todo.id);
        todos[todoIndex].title = todo.title;
        todos[todoIndex].description = todo.description;
        todos[todoIndex].status = todo.status;
      })
    );
  }
  removeTodo(todoId: string) {
    this.todos.pipe(
      map((todos) => {
        const todoIndex = todos.findIndex((item) => item.id === todoId);
        return todos.slice(todoIndex, todoIndex + 1);
      })
    );
  }
  filterTodosByStatus(status: string) {
    if (status === 'ALL') {
      return this.todos.pipe(map((todos) => todos));
    }
    return this.todos.pipe(
      map((todos) => todos.filter((items) => items.status === status))
    );
  }
}
