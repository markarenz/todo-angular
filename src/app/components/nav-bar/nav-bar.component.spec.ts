import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoService } from '../../services/todo-service';
import { NavBarComponent } from './nav-bar.component';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle filter switch click', () => {
    const mockTodoService = fixture.debugElement.injector.get(TodoService);
    const spyToggleShowAllFunction = spyOn(mockTodoService, 'toggleShowAll');
    expect(component).toBeTruthy();
    fixture.nativeElement.querySelector('.common-switch').dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(spyToggleShowAllFunction).toHaveBeenCalled();
  });
});
