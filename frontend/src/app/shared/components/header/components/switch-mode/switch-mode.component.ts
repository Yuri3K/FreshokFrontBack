import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SwitchModeService } from '../../../../../core/services/switch-mode.service';
import { AsyncPipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-switch-mode',
  imports: [
    MatButtonModule,
    MatIconModule,
    AsyncPipe,
    MatTooltipModule
  ],
  templateUrl: './switch-mode.component.html',
  styleUrl: './switch-mode.component.scss'
})
export class SwitchModeComponent {
  readonly switchModeService = inject(SwitchModeService)
  readonly isDarkTheme$ = this.switchModeService.isDarkTheme$
}
