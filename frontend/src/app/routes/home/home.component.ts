import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LangsService } from '../../core/services/langs.service';
import { filter, take } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [
    TranslateModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly langsService = inject(LangsService)
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.getLangs()
  }

  private getLangs() {
    this.langsService.langs$
      .pipe(
        filter(langs => langs.length > 0),
        take(1)
      )
      .subscribe(langs => {
        console.log("🔸 langs:", langs)
      
      })
  }

}
