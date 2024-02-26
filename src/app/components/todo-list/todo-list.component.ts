import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { ToDo } from '../../../types';
import { TodoService } from '../../services/todo-service';
@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  subscription: Subscription;
  todoItems: ToDo[] = [];
  constructor(private _todoService: TodoService) {
    this.subscription = Subscription.EMPTY;
  }

  ngOnInit() {
    this.subscription = this._todoService.todoObs.subscribe((data: ToDo[]) => {
      this.todoItems = data;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
