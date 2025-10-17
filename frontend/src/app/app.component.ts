import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwitchModeService } from './core/services/switch-mode.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly switchModeService = inject(SwitchModeService)

  ngOnInit(): void {
    this.switchModeService.init()
  }
}
