import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwitchModeService } from './core/services/switch-mode.service';
import { AuthService } from './core/services/auth.service';
import { AsyncPipe } from '@angular/common';
import { LoaderComponent } from './shared/components/loader/loader.component';
import {
  trigger,
  transition,
  style,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    AsyncPipe,
    LoaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1000ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  private readonly switchModeService = inject(SwitchModeService)
  private readonly authService = inject(AuthService)

  readonly authInitializing$ = this.authService.authInitializing$

  ngOnInit(): void {
    this.switchModeService.init()
  }

}
