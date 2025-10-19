import { inject, Injectable } from '@angular/core';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { firebaseAuth } from '../firebase.client';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly router = inject(Router)

  private readonly userSub = new BehaviorSubject<User | null | undefined>(undefined)
  private readonly authInitializingSub = new BehaviorSubject<boolean>(true)

  user$ = this.userSub.asObservable()
  authInitializing$ = this.authInitializingSub.asObservable()

  constructor() { 
    onAuthStateChanged(firebaseAuth, user => {
      console.log("🔸 user:", user)
      this.userSub.next(user)
      this.authInitializingSub.next(false)

      if(user) {
        const currentUrl = this.router.url
        if(currentUrl == '/login') {
          this.router.navigate(['/home'])
        }
      } else {
        this.router.navigate(['/login'])
      }
    })

    // setTimeout(() => {
    //   console.log('LOGOUT')
    //   this.logout()
    // }, 5000);
  }

  async signInWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(firebaseAuth, provider)
  }

  // Метод для выхода
  async logout(): Promise<void> {
    await signOut(firebaseAuth)
  }

  // Получить текущий idToken для отправки на бэкенд
  async getIdToken(forceRefresh = false): Promise<string | null> {
    console.log("getIdToken")
    const user = firebaseAuth.currentUser
    return user ? user.getIdToken(forceRefresh) : null
  }

  // Быстрая проверка авторизации
  isAuthenticated(): boolean {
    return !!firebaseAuth.currentUser
  }
}
