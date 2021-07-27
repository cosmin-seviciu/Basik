import { ArticleModel } from '../models/articleModel';
import * as fs from 'fs';
import showdown from 'showdown';
import config from '../../basik.config.json';

export class ArticleService {
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
    }, config.refreshTime);
  }

  private refeshArticles(): void {
    const articles = fs.readdirSync(
      `./${config.repoName}/${config.articlesFolderName}`
    );
    const tempArticles: ArticleModel[] = [];
    articles.forEach((element: string) => {
      const filePath = `./${config.repoName}/${config.articlesFolderName}/${element}/`;
      const contentFilePath = `${filePath}index.md`;
      const foundArticle = this.articles.find(
        (article) => article.title === element
      );
      if (foundArticle) {
        const stats = fs.statSync(contentFilePath);
        if (stats.mtimeMs != foundArticle.mtime) {
          const content = fs.readFileSync(contentFilePath, 'utf8');
          foundArticle.content = this.converter.makeHtml(content);
          foundArticle.mtime = stats.mtimeMs;
        }
        tempArticles.push(foundArticle);
      } else {
        const stats = fs.statSync(contentFilePath);
        const content = fs.readFileSync(contentFilePath, 'utf8');
        const imageFilePath = this.getThumbPath(filePath);
        tempArticles.push(
          new ArticleModel(
            element,
            this.converter.makeHtml(content),
            stats.mtimeMs,
            imageFilePath
          )
        );
      }
    });
    this.articles = tempArticles;
  }

  public getArticleByTitle(title: string): ArticleModel {
    const article = this.articles.find(
      (article: ArticleModel) => article.title === title
    );

    return article || new ArticleModel('', '<h1>404 Article not found</h1>');
  }

  private getThumbPath(filePath: string): string {
    const pngFilePath = `${filePath}thumb.png`;
    const jpgFilePath = `${filePath}thumb.jpg`;

    try {
      fs.statSync(pngFilePath);
      return pngFilePath;
    } catch (ex: unknown) {}

    try {
      fs.statSync(jpgFilePath);
      return jpgFilePath;
    } catch (ex: unknown) {}

    return '';
  }
}
