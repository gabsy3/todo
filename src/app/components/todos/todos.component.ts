import { Component, OnInit, inject } from '@angular/core';
import { ITodo, todoStatus } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { TodoComponent } from '../todo/todo.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { tap } from 'rxjs';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [TodoComponent, MatButtonModule, CommonModule, MatDividerModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent implements OnInit {
  todoService = inject(TodoService);
  dialog = inject(MatDialog);
  todos$ = this.todoService.getTodos();
  lastTodoIndex: number = 0;
  totalTodos: { totalOpened: number; totalClosed: number } = {
    totalOpened: 0,
    totalClosed: 0,
  };
  status: string = 'ALL';
  ngOnInit(): void {
    this.todoService.initTodos();
    this.showTotalTodos();
    this.getLastTodoIndex();
  }
  addTodoClicked(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { action: 'add', id: this.lastTodoIndex },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.todoService.addTodo(result);
      }
    });
  }
  getLastTodoIndex() {
    this.todos$
      .pipe(
        tap((data) => {
          this.lastTodoIndex = +data[data.length - 1]?.id;
          this.lastTodoIndex++;
        })
      )
      .subscribe();
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
