import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoService } from './todo-service';
import { ToDo } from '../../types';
import { Subscription } from 'rxjs';

// mock
describe('TodoService', () => {
  let service: TodoService;
  let id: number;
  let subscription: Subscription = Subscription.EMPTY;
  let mockTodos: ToDo[] = [];
  let mockIsShowingAll: boolean = true;
  let mockEditingTodoId: number = -1;

  beforeEach(() => {
    service = new TodoService();
    mockTodos = [];
    subscription = service.todoObs.subscribe((value) => {
      mockTodos = value;
    });
    subscription.add(
      service.editingTodoIdObs.subscribe((value) => {
        mockEditingTodoId = value;
      }),
    );
    subscription.add(
      service.isShowingAllObs.subscribe((value) => {
        mockIsShowingAll = value;
      }),
    );

    // Mock Date()
    var baseTime = new Date(2024, 2, 25);
    jasmine.clock().mockDate(baseTime);

    // Mock local storage
    const localStorageMock = (() => {
      let store: { [key: string]: string } = {};

      return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
          store[key] = value.toString();
        },
      };
    })();

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
    // id based on the mock date
    id = 1711339200000;
  });
  afterEach(() => {
    subscription.unsubscribe();
  });

  it('handles creation', () => {
    service.createTodoItem('Test label 1');
    service.createTodoItem('Test label 2');
    expect(mockTodos.length).toBe(2);
  });

  it('handles deletion', () => {
    service.createTodoItem('Test label');
    service.deleteTodoItem(id);
    expect(mockTodos.length).toBe(0);
  });

  it('handles completion toggle', () => {
    service.createTodoItem('Test label');
    service.toggleComplete(id);
    expect(mockTodos[0].isComplete).toBe(true);
  });

  it('handles show all toggle', () => {
    expect(mockIsShowingAll).toBe(true);
    service.toggleShowAll();
    expect(mockIsShowingAll).toBe(false);
  });

  it('handles edit todo', () => {
    const oldLabel = 'Old label';
    const newLabel = 'New label';
    service.createTodoItem(oldLabel);
    expect(mockTodos[0].label).toEqual(oldLabel);
    service.openTodoEditModal(id);
    service.editModalSaveTodo(newLabel);
    expect(mockTodos[0].label).toEqual(newLabel);
  });

  it('handles close modal', () => {
    service.createTodoItem('Test label');
    service.openTodoEditModal(id);
    service.closeTodoEditModal();
    expect(mockEditingTodoId).toBe(-1);
  });
});
