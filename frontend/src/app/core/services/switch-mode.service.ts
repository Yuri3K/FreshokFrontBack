import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwitchModeService {
  private readonly document = inject(DOCUMENT);
  private htmlElement = this.document.querySelector('html')!;
  private isDarkThemeSubject = new BehaviorSubject<boolean>(false)

  isDarkTheme$ = this.isDarkThemeSubject.asObservable()

  get mode(): boolean {
    return this.isDarkThemeSubject.getValue()
  }

  setMode(mode: boolean) {
    this.isDarkThemeSubject.next(mode)
  }

  toggleMode() {
    if (this.mode) {
      this.setMode(false)
      this.htmlElement.style.colorScheme = 'light'
    } else {
      this.setMode(true)
      this.htmlElement.style.colorScheme = 'dark'
    }
  }
}
