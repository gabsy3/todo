import { Component, OnInit, inject } from '@angular/core';
import { ITodo, todoStatus } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { TodoComponent } from '../todo/todo.component';
import {MatButtonModule} from '@angular/material/button';



@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [TodoComponent , MatButtonModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent implements OnInit{
  todoService = inject(TodoService);
  todos:ITodo[] = [];
  ngOnInit(): void {
    this.getAllTodo();
  }
  getAllTodo(){
    this.todoService.getTodos().subscribe(data => this.todos = data);
  }
  filterTodoByStatus(status:todoStatus){
    this.todoService.filterTodosByStatus(status).subscribe(data => this.todos = data);
  }
}
