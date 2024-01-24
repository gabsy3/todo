import { Component, OnInit, inject } from '@angular/core';
import { ITodo, todoStatus } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { TodoComponent } from '../todo/todo.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import { tap } from 'rxjs';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [TodoComponent, MatButtonModule, CommonModule , MatDividerModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent implements OnInit {
  todoService = inject(TodoService);
  todos$ = this.todoService.getTodos();
  totalTodos: { totalOpened: number; totalClosed: number } = {
    totalOpened: 0,
    totalClosed: 0,
  };
  status: string = 'ALL';
  ngOnInit(): void {
    this.todoService.initTodos();
    this.showTotalTodos();
  }
  filterTodoByStatus(status: todoStatus) {
    this.status = status;
    const filterdArr = this.todoService.filterTodosByStatus(status);
    this.todoService.todos.next(filterdArr);
  }
  showTotalTodos() {
    this.todoService.showTotal();
    this.todoService
      .getTotalTodos()
      .subscribe((data) => (this.totalTodos = data));
  }
}
