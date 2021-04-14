import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-headline-card',
  templateUrl: './headline-card.component.html',
  styleUrls: ['./headline-card.component.scss']
})
export class HeadlineCardComponent implements OnInit {

  @Input() id: String;
  @Input() title: String;
  @Input() description: String;
  @Input() source: String;
  @Input() date: Date;
  @Input() thumbnail: String;

  constructor() { }

  ngOnInit(): void {
  }

}
