import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-common-switch',
  standalone: true,
  imports: [],
  templateUrl: './common-switch.component.html',
  styleUrl: './common-switch.component.scss',
})
export class CommonSwitchComponent {
  @Input() labelOn!: string;
  @Input() labelOff!: string;
  @Input() isOn!: boolean;
  @Output() toggleSwitchEvent = new EventEmitter<string>();

  handleSwitchClick() {
    this.toggleSwitchEvent.emit();
  }
}
