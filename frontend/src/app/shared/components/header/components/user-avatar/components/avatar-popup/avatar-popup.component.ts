import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { BtnIconComponent } from '../../../../../../ui-elems/buttons/btn-icon/btn-icon.component';
import { TranslateModule } from '@ngx-translate/core';
import { User } from 'firebase/auth';
import { MatCardModule } from '@angular/material/card';
import { BtnFlatComponent } from '../../../../../../ui-elems/buttons/btn-flat/btn-flat.component';

@Component({
  selector: 'app-avatar-popup',
  imports: [
    BtnIconComponent,
    BtnFlatComponent,
    MatCardModule,
    TranslateModule,
  ],
  templateUrl: './avatar-popup.component.html',
  styleUrl: './avatar-popup.component.scss'
})
export class AvatarPopupComponent {
  @Input() authUser!: User

  @Output() closePopup = new EventEmitter<void>()
  @Output() logout = new EventEmitter<void>()

  readonly privacyLink = 'https://policies.google.com/privacy?hl=en'
  readonly termsLink = 'https://policies.google.com/terms?hl=en'

  @HostListener('document:click', ['$event'])
  onClickInside(event: PointerEvent) {
    const target = event.target as HTMLElement
    if(!target.closest('app-avatar-popup')) {
      this.closePopup.emit()
    }
  }
}
