import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // Placeholder info, need to get this info from the database
  headlines: ArticleCard[] = [];

  constructor(
    private _apiService: ApiService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    var temp = this._apiService.getAllNews().subscribe((data) => {
      data.forEach((article) => {
        console.log(article);
        const item: ArticleCard = {
          id: article.news_id,
          title: article.title,
          description: article.snippet,
          source: article.url,
          thumbnail: '',
          date: null,
        };
        this.headlines.push(item);
      });
    });

    console.log(this.headlines.length);
  }
}

export interface ArticleCard {
  id: String;
  title: String;
  description: String;
  source: String;
  thumbnail: String;
  date: Date;
}
