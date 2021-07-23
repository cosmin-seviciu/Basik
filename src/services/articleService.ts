import { ArticleModel } from '../models/articleModel';
import * as fs from 'fs';
import showdown from 'showdown';
import config from '../../basik.config.json';

class ArticleService {
  private _articles: ArticleModel[] = [];
  private converter: showdown.Converter;

  public get articles(): ArticleModel[] {
    return this._articles;
  }

  private set articles(articles: ArticleModel[]) {
    this._articles = articles;
  }

  constructor() {
    this.converter = new showdown.Converter();

    this.refeshArticles();
    setInterval(() => {
      this.refeshArticles();
    }, 3600000);
  }

  private refeshArticles(): void {
    const articles = fs.readdirSync(
      `./${config.repoName}/${config.articlesFolderName}`
    );
    const tempArticles: ArticleModel[] = [];
    articles.forEach((element: string) => {
      const filePath = `./${config.repoName}/${config.articlesFolderName}/${element}/index.md`;
      const foundArticle = this.articles.find(
        (article) => article.title === element
      );
      if (foundArticle) {
        const stats = fs.statSync(filePath);
        if (stats.mtimeMs != foundArticle.mtime) {
          const content = fs.readFileSync(filePath, 'utf8');
          foundArticle.content = this.converter.makeHtml(content);
          foundArticle.mtime = stats.mtimeMs;
        }
        tempArticles.push(foundArticle);
      } else {
        const stats = fs.statSync(filePath);
        const content = fs.readFileSync(filePath, 'utf8');
        tempArticles.push(
          new ArticleModel(
            element,
            this.converter.makeHtml(content),
            stats.mtimeMs
          )
        );
      }
    });
    this.articles = tempArticles;
  }
}

export const articleService = new ArticleService();
