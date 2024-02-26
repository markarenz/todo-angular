import { Component } from '@angular/core';
import { TodoService } from '../../services/todo-service';
import { Subscription } from 'rxjs';
import { CommonSwitchComponent } from '../common-switch/common-switch.component';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonSwitchComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  isShowingAll: boolean = true;
  private subscription: Subscription;

  constructor(private _todoService: TodoService) {
    this.subscription = Subscription.EMPTY;
  }
  ngOnInit() {
    this.subscription = this._todoService.isShowingAllObs.subscribe((data: boolean) => {
      this.isShowingAll = data;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  toggleIsShowingAll() {
    this._todoService.toggleShowAll();
  }
}
