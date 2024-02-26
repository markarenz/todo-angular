import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo-service';

@Component({
  selector: 'app-todo-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo-input.component.html',
  styleUrl: './todo-input.component.scss',
})
export class TodoInputComponent {
  todoItemInputValue: string;

  constructor(private _todoService: TodoService) {
    this.todoItemInputValue = '';
  }

  addNewTodoItem() {
    if (this.todoItemInputValue !== '') {
      this._todoService.createTodoItem(this.todoItemInputValue);
      this.todoItemInputValue = '';
    }
  }
}
