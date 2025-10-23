import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-h1-title',
  standalone: true,
  templateUrl: './h1-title.component.html',
  styleUrl: './h1-title.component.scss',
  imports: [CommonModule]
})

export class H1TitleComponent{
  @Input() text!: string // Text that will displayed in the title
  @Input() mb: string = '24px' // Margin-bottom for title
  @Input() fz: string = '3rem' // Font-size for title
}