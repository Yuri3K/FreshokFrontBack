import { DOCUMENT, Location } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwitchModeService {
  private readonly document = inject(DOCUMENT);
  private readonly route = inject(ActivatedRoute)
  private readonly router = inject(Router)

  private htmlElement = this.document.querySelector('html')!;
  private isDarkThemeSubject = new BehaviorSubject<boolean>(false)
  private readonly defaultMode = 'dark'

  isDarkTheme$ = this.isDarkThemeSubject.asObservable()

  private get mode(): boolean {
    return this.isDarkThemeSubject.getValue()
  }

  setMode(mode: boolean) {
    this.isDarkThemeSubject.next(mode)
  }

  init() {
    this.route.paramMap.subscribe(params => {
      const modeParam = params.get('mode');

      if (modeParam) {
        const mode = modeParam == 'light'
        this.setMode(mode)
        this.htmlElement.style.colorScheme = modeParam
      } else {
        this.applyMode(this.defaultMode)
      }
    })
  }

  private applyMode(modeType: 'light' | 'dark') {
    const isDarkMode = modeType === 'dark'
    this.setMode(isDarkMode)
    this.htmlElement.style.colorScheme = modeType
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { mode: modeType },
      queryParamsHandling: 'merge'
    })
  }

  toggleMode() {
    this.mode
      ? this.applyMode('light')
      : this.applyMode('dark')
  }
}
