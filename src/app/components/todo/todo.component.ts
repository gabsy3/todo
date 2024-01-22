import { Component, Input, OnInit, inject } from '@angular/core';
import { ITodo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnInit {
  todoService = inject(TodoService);
  todos$ = this.todoService.getTodos();

  @Input() todo!: ITodo;
  ngOnInit(): void {}
  updateTodo(todo: ITodo) {}
  removeTodo(todo: ITodo) {
    this.todoService.removeTodo(todo).subscribe((data) => {
      this.todos$ = this.todoService.getTodos();
    });
  }
}
