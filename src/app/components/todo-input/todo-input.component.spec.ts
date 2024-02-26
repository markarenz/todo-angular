import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoService } from '../../services/todo-service';
import { TodoInputComponent } from './todo-input.component';

describe('TodoInputComponent', () => {
  let component: TodoInputComponent;
  let fixture: ComponentFixture<TodoInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger new todo service function when input is changed and the button is clicked', () => {
    const mockTodoService = fixture.debugElement.injector.get(TodoService);
    const spyCreateTodoFunction = spyOn(mockTodoService, 'createTodoItem');
    expect(component).toBeTruthy();

    // In Angular we can directly set the values inside a component!
    component.todoItemInputValue = 'New input value';

    fixture.nativeElement.querySelector('.btn-input-add').dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(spyCreateTodoFunction).toHaveBeenCalled();
  });
});
