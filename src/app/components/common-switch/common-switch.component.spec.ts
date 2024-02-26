import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonSwitchComponent } from './common-switch.component';

describe('CommonSwitchComponent', () => {
  let component: CommonSwitchComponent;
  let fixture: ComponentFixture<CommonSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonSwitchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommonSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle click and fire toggle function', () => {
    spyOn(component.toggleSwitchEvent, 'emit');
    expect(component).toBeTruthy();
    fixture.nativeElement.querySelector('.common-switch').dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.toggleSwitchEvent.emit).toHaveBeenCalled();
  });
});
