import { Component, OnInit, inject } from '@angular/core';
import { ITodo, todoStatus } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { TodoComponent } from '../todo/todo.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs';

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
  todosOpen:number = 0;
  todosClose:number = 0;
  status : string = 'ALL';
  ngOnInit(): void {
    this.todoService.initTodos();
    this.showTotalTodos();

  }
  filterTodoByStatus(status: todoStatus) {
    this.status = status;
    const filterdArr = this.todoService.filterTodosByStatus(status);
    this.todoService.todos.next(filterdArr);
  }
  showTotalTodos(){
    this.todos$.pipe(tap(data=> {
      this.todosOpen = data.filter(item => item.status === 'OPEN').length;
      this.todosClose = data.filter(item => item.status === 'CLOSE').length;
    })).subscribe();
  }
}
