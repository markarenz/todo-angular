import { Injectable } from '@angular/core';
import { ToDo } from '../../types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private isShowingAll = new BehaviorSubject<boolean>(true);
  isShowingAllObs = this.isShowingAll.asObservable();

  private todoItems = new BehaviorSubject<ToDo[]>([]);
  private todoItemsSortedFiltered = new BehaviorSubject<ToDo[]>([]);
  todoObs = this.todoItemsSortedFiltered.asObservable();

  private editingTodoId = new BehaviorSubject<number>(-1);
  editingTodoIdObs = this.editingTodoId.asObservable();

  private storageKey: string = 'todos';

  constructor() {
    let todoItemsInitial: ToDo[] = [];
    const todoItemsInitialString = localStorage.getItem(this.storageKey);
    if (todoItemsInitialString) {
      try {
        todoItemsInitial = JSON.parse(todoItemsInitialString);
      } catch (err) {
        todoItemsInitial = [];
      }
    }
    this.todoItems.next([...todoItemsInitial]);
    this.isShowingAll.next(true);
    this.sortFilterTodos();
  }

  openTodoEditModal(id: number) {
    this.editingTodoId.next(id);
  }
  closeTodoEditModal() {
    this.editingTodoId.next(-1);
  }

  saveTodos() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.todoItems.getValue()));
  }

  editModalSaveTodo(editedLabel: string) {
    const prevTodoItems = this.todoItems.getValue();
    const editingId = this.editingTodoId.getValue();
    const thisTodo = prevTodoItems.find((item) => item.id === editingId);
    if (thisTodo) {
      const newTodos = prevTodoItems.map((item) =>
        item.id === editingId ? { ...item, label: editedLabel } : item,
      );
      this.todoItems.next([...newTodos]);
    }
    this.editingTodoId.next(-1);
    this.sortFilterTodos();
    this.saveTodos();
  }

  getTodoLabelById(id: number): string {
    return this.todoItems.getValue().find((item) => item.id === id)?.label || '';
  }

  sortFilterTodos() {
    const sortedTodos =
      this.todoItems.getValue().sort(function (a, b) {
        return b.priority - a.priority;
      }) || [];
    this.todoItemsSortedFiltered.next(
      this.isShowingAll.getValue() ? sortedTodos : sortedTodos.filter((item) => !item.isComplete),
    );
  }

  toggleShowAll() {
    this.isShowingAll.next(!this.isShowingAll.getValue());
    this.sortFilterTodos();
  }

  deleteTodoItem(id: number) {
    const prevTodoItems = this.todoItems.getValue();
    this.todoItems.next(prevTodoItems.filter((todo) => todo.id !== id));
    this.sortFilterTodos();
    this.saveTodos();
  }

  toggleComplete(id: number) {
    const prevTodoItems = this.todoItems.getValue();
    this.todoItems.next(
      prevTodoItems.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo,
      ),
    );
    this.sortFilterTodos();
    this.saveTodos();
  }

  createTodoItem(newTodoLabel: string) {
    const prevTodoItems = this.todoItems.getValue();
    console.log('create...', prevTodoItems);
    const newPriority =
      prevTodoItems.length === 0
        ? 1
        : prevTodoItems.reduce((acc, val) => {
            return acc.priority > val.priority ? acc : val;
          }).priority;

    const newItem = {
      id: new Date().getTime(),
      label: newTodoLabel,
      isComplete: false,
      priority: newPriority,
    };
    this.todoItems.next([newItem, ...prevTodoItems]);
    this.sortFilterTodos();
    this.saveTodos();
  }
}
