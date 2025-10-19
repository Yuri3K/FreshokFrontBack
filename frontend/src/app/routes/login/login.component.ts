import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly authSetvice = inject(AuthService)
  private readonly router = inject(Router)

  async loginWithGoogle() {
    try {
      this.authSetvice.signInWithGoogle()
      this.router.navigate(['/home'])
    } catch (err) {
      console.error('Login error', err)
    }
  } 
}
