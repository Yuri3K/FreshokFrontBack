import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-h4-title',
  imports: [NgStyle],
  templateUrl: './h4-title.component.html',
  styleUrl: './h4-title.component.scss'
})
export class H4TitleComponent {
  @Input() text!: string // Text that will displayed in the title
  @Input() mb: string = '0' // Margin-bottom for title
  @Input() fz: string = '1.125rem' // Font-size for title
  @Input() fw: string = '500' // Font-size for title
}