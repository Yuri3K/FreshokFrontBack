import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { ApiService } from './api.service';

export interface Lang {
  id: string
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class LangsService {
  private readonly apiService = inject(ApiService)

  private readonly langsSubject = new BehaviorSubject<Lang[]>([])
  langs$ = this.langsSubject.asObservable()

  constructor() {
    this.getLangsFromDb().subscribe()
  }

  get langs(): Lang[] {
    return this.langsSubject.getValue()
  }

  private setLangs(langs: Lang[]) {
    this.langsSubject.next(langs)
  }

  private getLangsFromDb(): Observable<Lang[]> {
    if(this.langs.length) {
      return of(this.langs)
    } else {
      return this.apiService.get<Lang[]>('/langs')
        .pipe(tap(langs => this.setLangs(langs)))
    }
  }
}
