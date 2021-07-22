import { ArticleModel } from '../models/articleModel';
import * as fs from 'fs';

class ArticleService {
  private _articles: ArticleModel[] = [];

  public get articles(): ArticleModel[] {
    return this._articles;
  }

  private set articles(articles: ArticleModel[]) {
    this._articles = articles;
  }

  constructor() {
    this.refeshArticles();
    setInterval(() => {
      this.refeshArticles();
    }, 600000);
  }

  private refeshArticles(): void {
    const articles = fs.readdirSync('./articles');
    const tempArticles: ArticleModel[] = [];
    articles.forEach((element: string) => {
      const filePath = `./articles/${element}/index.md`;
      const foundArticle = this.articles.find(
        (article) => article.title === element
      );
      if (foundArticle) {
        const stats = fs.statSync(filePath);
        if (stats.mtimeMs != foundArticle.mtime) {
          const content = fs.readFileSync(filePath, 'utf8');
          foundArticle.content = content;
          foundArticle.mtime = stats.mtimeMs;
        }
        tempArticles.push(foundArticle);
      } else {
        const stats = fs.statSync(filePath);
        const content = fs.readFileSync(filePath, 'utf8');
        tempArticles.push(new ArticleModel(element, content, stats.mtimeMs));
      }
    });
    this.articles = tempArticles;
  }
}

export const articleService = new ArticleService();
