import { Component, Input } from '@angular/core';
import { ToDo } from '../../../types';
import { TodoService } from '../../services/todo-service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent {
  @Input() todo!: ToDo;

  constructor(private _todoService: TodoService) {}

  handleEditTodoModalOpen(id: number) {
    this._todoService.openTodoEditModal(id);
  }

  handleToggleComplete(id: number) {
    this._todoService.toggleComplete(id);
  }

  handleDeleteItem(id: number) {
    this._todoService.deleteTodoItem(id);
  }
}
