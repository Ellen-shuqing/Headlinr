import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeadlineCardComponent } from './home/headline-card/headline-card.component';
import { PersonalizedNewsCardComponent } from './home/personalized-news-card/personalized-news-card.component';
import { ArticlePreviewComponent } from './article-preview/article-preview.component';
import { ReactiveFormsModule } from '@angular/forms'

import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { LikesComponent } from './likes/likes.component';

const ROUTE: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'likes', component: LikesComponent, canActivate: [AuthGuard] },
  { path: 'article/:articleId', component: ArticlePreviewComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeadlineCardComponent,
    PersonalizedNewsCardComponent,
    ArticlePreviewComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    LikesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTE),
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
