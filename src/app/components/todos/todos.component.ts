import { Component, OnInit, inject } from '@angular/core';
import { ITodo, todoStatus } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { TodoComponent } from '../todo/todo.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [TodoComponent, MatButtonModule, CommonModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent implements OnInit {
  todoService = inject(TodoService);
  todos$ = this.todoService.getTodos();
  todosArr = this.todoService.todos.getValue();
  ngOnInit(): void {
    this.todoService.initTodos();

  }
  filterTodoByStatus(status: todoStatus) {
    const filterdArr = this.todoService.filterTodosByStatus(status);
    this.todoService.todos.next(this.todosArr);
    this.todoService.todos.next(filterdArr);
  }
}
