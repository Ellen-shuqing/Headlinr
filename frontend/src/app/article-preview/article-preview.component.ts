import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.scss'],
})
export class ArticlePreviewComponent implements OnInit {
  id: String;
  date: Date;
  title: String;
  preview: String;
  source: String;

  constructor(private activatedRoute: ActivatedRoute, private _apiService: ApiService) {}

  ngOnInit(): void {
    var temp = this._apiService.getNewsById(this.activatedRoute.snapshot.params.articleId).subscribe((article) => {
      console.log(article);
      this.id = article.news_id;
      this.title = article.title;
      this.preview = article.snippet;
      this.source = article.url;
    });
//     this.id = this.activatedRoute.snapshot.params.articleId;
//     // Here should be some code where we use ID to fetch article data from the database
//     // placeholder used instead
//     this.title = 'Cool title';
//     this.date = new Date();
//     this.preview = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse potenti nullam ac tortor. Placerat duis ultricies lacus sed turpis tincidunt id aliquet risus. Aliquam id diam maecenas ultricies mi eget mauris. Venenatis urna cursus eget nunc scelerisque viverra mauris in aliquam. Aliquet risus feugiat in ante metus dictum at. Lacus sed viverra tellus in hac habitasse platea dictumst. Consequat nisl vel pretium lectus. Aliquam id diam maecenas ultricies mi eget mauris pharetra et. In pellentesque massa placerat duis. Sit amet nulla facilisi morbi. Est sit amet facilisis magna. Viverra maecenas accumsan lacus vel facilisis volutpat est. Arcu vitae elementum curabitur vitae nunc sed. Aliquet nibh praesent tristique magna. Vehicula ipsum a arcu cursus vitae congue mauris.

// Egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam. Enim blandit volutpat maecenas volutpat blandit aliquam etiam erat velit. Venenatis a condimentum vitae sapien pellentesque habitant morbi. Id velit ut tortor pretium viverra suspendisse potenti nullam ac. Massa massa ultricies mi quis hendrerit dolor magna. Sit amet est placerat in. In arcu cursus euismod quis viverra nibh. Pulvinar neque laoreet suspendisse interdum consectetur libero id. Dictum sit amet justo donec enim diam vulputate ut pharetra. Turpis massa tincidunt dui ut ornare lectus sit amet est. At erat pellentesque adipiscing commodo elit at imperdiet dui accumsan. Sit amet nisl suscipit adipiscing. Dolor sit amet consectetur adipiscing.`;
  }
}
