import { Component, Input, OnInit, inject } from '@angular/core';
import { ITodo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import {
  MatDialog,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule , CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnInit {
  todoService = inject(TodoService);
  dialog = inject(MatDialog);
  totalTodos: { totalOpened: number; totalClosed: number } = {
    totalOpened: 0,
    totalClosed: 0,
  };
  @Input() todo!: ITodo;
  ngOnInit(): void {}
  updateTodo(todo: ITodo) {
    this.todoService.updateTodo(todo).subscribe((data) => {
      this.todoService.initTodos();
      this.showTotalTodos();
    });
  }
  removeTodo(todo: ITodo) {
    this.todoService.removeTodo(todo).subscribe((data) => {
      this.todoService.initTodos();
      this.showTotalTodos();
    });
  }
  updateTodoClicked(todo: ITodo): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        id: todo.id,
        action:"update",
        title: todo.title,
        description: todo.description,
        status: todo.status,
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.updateTodo(result);
      }
    });
  }
  showTotalTodos() {
    this.todoService.showTotal();
    this.todoService
      .getTotalTodos()
      .subscribe((data) => (this.totalTodos = data));
  }
}
