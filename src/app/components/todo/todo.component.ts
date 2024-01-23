import { Component, Input, OnInit, inject } from '@angular/core';
import { ITodo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { MatButtonModule } from '@angular/material/button';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnInit {
  todoService = inject(TodoService);
  @Input() todo!: ITodo;
  ngOnInit(): void {}
  updateTodo(todo: ITodo) {
    this.todoService.updateTodo(todo).subscribe((data) => {
      this.todoService.initTodos();
    });
  }
  removeTodo(todo: ITodo) {
    this.todoService.removeTodo(todo).subscribe((data) => {
      this.todoService.initTodos();
    });
  }
}
