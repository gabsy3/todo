import { Component, Input, OnInit, inject } from '@angular/core';
import { ITodo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent  implements OnInit{
  todoService = inject(TodoService);
  @Input() todo!: ITodo;
  ngOnInit(): void {
  }
  updateTodo(todo:ITodo){
    
  }
  removeTodo(todo:ITodo){
    this.todoService.removeTodo(todo.id);
  }
}
