import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoItemComponent } from './todo-item.component';
import { TodoService } from '../../services/todo-service';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    component.todo = {
      id: 12345,
      isComplete: true,
      label: 'My Label',
      priority: 10,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    const spy = spyOn(component, 'handleDeleteItem');
    expect(component).toBeTruthy();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should trigger delete function if delete button is clicked', () => {
    const mockTodoService = fixture.debugElement.injector.get(TodoService);
    const spyDeleteFunction = spyOn(mockTodoService, 'deleteTodoItem');
    expect(component).toBeTruthy();
    fixture.nativeElement.querySelector('.btn-item-delete').dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(spyDeleteFunction).toHaveBeenCalled();
  });

  it('should trigger toggle complete function if checkbox is clicked', () => {
    const mockTodoService = fixture.debugElement.injector.get(TodoService);
    const spyCompleteToggleFunction = spyOn(mockTodoService, 'toggleComplete');
    expect(component).toBeTruthy();
    fixture.nativeElement.querySelector('.btn-item-complete').dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(spyCompleteToggleFunction).toHaveBeenCalled();
  });

  it('should open the modal when the todo label is clicked', () => {
    const mockTodoService = fixture.debugElement.injector.get(TodoService);
    const spyOpenModalFunction = spyOn(mockTodoService, 'openTodoEditModal');
    expect(component).toBeTruthy();
    fixture.nativeElement.querySelector('.btn-item-label').dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(spyOpenModalFunction).toHaveBeenCalled();
  });
});
