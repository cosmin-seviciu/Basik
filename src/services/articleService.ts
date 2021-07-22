import { ArticleModel } from '../models/articleModel';
import * as fs from 'fs';

class ArticleService {
  private articles: ArticleModel[] = [];

  constructor() {
    setInterval(() => {}, 10000);
  }

  public getArticles() {
    return new Promise((res, rej) => {
      fs.readdir('./articles', (err, files) => {
        files.forEach((file) => {
          const foundArticle = this.articles.find(
            (article) => article.title === file
          );
          if (foundArticle) {
          }
          tmpArticle.push(new ArticleModel(file, ''));
        });
        this.articles = tmpArticle;
        res(tmpArticle);
      });
    });
  }
}

export const articleService = new ArticleService();
