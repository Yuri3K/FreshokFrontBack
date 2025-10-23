import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    MatFormFieldModule, 
    MatInputModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private router = inject(Router)
  private fb = inject(FormBuilder)
  private apiService = inject(ApiService)

  submitting = signal(false)
  registerForm = this.fb.group({
    displayName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.minLength]],
    password: ['', Validators.required, Validators.minLength(6)]
  })

  onSubmit() {
    if (this.registerForm.invalid) return

    const formData = this.registerForm.value

    this.apiService.postWithoutToken('/register', formData)
      .subscribe((res: any) => {
        if(res.result == 'ok') {
          this.router.navigate(['/login'])
        }
      })
  }
}
