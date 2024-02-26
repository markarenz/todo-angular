import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoService } from '../../services/todo-service';
import { TodoEditModalComponent } from './todo-edit-modal.component';

describe('TodoEditModalComponent', () => {
  let component: TodoEditModalComponent;
  let fixture: ComponentFixture<TodoEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoEditModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle close click when opened', () => {
    const mockTodoService = fixture.debugElement.injector.get(TodoService);
    mockTodoService.openTodoEditModal(123);
    const spyCreateCloseModalFunction = spyOn(mockTodoService, 'closeTodoEditModal');
    fixture.nativeElement.querySelector('#todo-modal-cancel').dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(spyCreateCloseModalFunction).toHaveBeenCalled();
  });

  it('should handle creation of todo', () => {
    component.todoEditInputValue = 'New input value';
    const mockTodoService = fixture.debugElement.injector.get(TodoService);
    mockTodoService.openTodoEditModal(123);
    const spyCreateCloseModalFunction = spyOn(mockTodoService, 'editModalSaveTodo');
    fixture.nativeElement.querySelector('#todo-modal-ok').dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(spyCreateCloseModalFunction).toHaveBeenCalled();
  });
});
