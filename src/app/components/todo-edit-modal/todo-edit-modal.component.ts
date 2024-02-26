import { Component, ViewChild, ElementRef } from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo-service';

@Component({
  selector: 'app-todo-edit-modal',
  standalone: true,
  imports: [FormsModule, A11yModule],
  templateUrl: './todo-edit-modal.component.html',
  styleUrl: './todo-edit-modal.component.scss',
})
export class TodoEditModalComponent {
  trapFocus: boolean = true;

  @ViewChild('modalInput', { static: false }) modalInput!: ElementRef;
  // @ViewChild('todo-input') modalInput!: ElementRef;
  todoEditInputValue: string;
  subscription: Subscription;
  editingTodoId: number = -1;

  constructor(private _todoService: TodoService) {
    this.subscription = Subscription.EMPTY;
    this.todoEditInputValue = '';
  }

  ngOnInit() {
    this.subscription = this._todoService.editingTodoIdObs.subscribe((data: number) => {
      this.editingTodoId = data;
      if (data > 0) {
        setTimeout(() => {
          this.modalInput.nativeElement.focus();
        }, 100);
      }
      const currentLabel = this._todoService.getTodoLabelById(data);
      this.todoEditInputValue = currentLabel;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleModalCancel() {
    this._todoService.closeTodoEditModal();
  }

  handleModalOk() {
    this._todoService.editModalSaveTodo(this.todoEditInputValue);
  }
}
