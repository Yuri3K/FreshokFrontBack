import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BtnFlatComponent } from '../../shared/ui-elems/buttons/btn-flat/btn-flat.component';
import { H2TitleComponent } from '../../shared/ui-elems/typography/h2-title/h2-title.component';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    BtnFlatComponent,
    H2TitleComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private router = inject(Router)
  private fb = inject(FormBuilder)
  private apiService = inject(ApiService)

  submitting = signal(false)
  isPwdHide = signal(true);
  registerForm = this.fb.group({
    displayName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.minLength]],
    password: ['', Validators.required, Validators.minLength(6)]
  })

  togglePwdVisibility(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()
    this.isPwdHide.set(!this.isPwdHide())
  }

  onSubmit() {
    console.log("🔸 this.registerForm:", this.registerForm)
   
    if (this.registerForm.invalid) return

    const formData = this.registerForm.value

    this.apiService.postWithoutToken('/register', formData)
      .subscribe((res: any) => {
        if (res.result == 'ok') {
          this.router.navigate(['/login'])
        }
      })
  }
}
