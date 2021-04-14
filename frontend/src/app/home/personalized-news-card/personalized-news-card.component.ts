import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-personalized-news-card',
  templateUrl: './personalized-news-card.component.html',
  styleUrls: ['./personalized-news-card.component.scss']
})
export class PersonalizedNewsCardComponent implements OnInit {

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
