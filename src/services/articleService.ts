import * as fs from 'fs';
import showdown from 'showdown';
import { ArticleModel } from '../models/articleModel';
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
    this.refreshArticles();
    setInterval(() => {
      this.refreshArticles();
    }, config.refreshTime);
  }

  private refreshArticles(): void {
    const articles = fs.readdirSync(
      `./src/${config.repoName}/${config.articlesFolderName}`
    );
    const tempArticles: ArticleModel[] = [];
    articles.forEach((articleTitle: string) => {
      const filePath = `./src/${config.repoName}/${config.articlesFolderName}/${articleTitle}/`;
      const contentFilePath = `${filePath}index.md`;
      const metaFilePath = `${filePath}meta.json`;
      const foundArticle = this.articles.find(
        (article) => article.title === articleTitle
      );
      if (foundArticle) {
        const stats = fs.statSync(contentFilePath);
        if (stats.mtimeMs != foundArticle.modifiedTimeUnix) {
          const content = fs.readFileSync(contentFilePath, 'utf8');
          foundArticle.content = this.converter.makeHtml(content);
          foundArticle.modifiedTimeUnix = stats.mtimeMs;
        }
        tempArticles.push(foundArticle);
      } else {
        const stats = fs.statSync(contentFilePath);
        const content = fs.readFileSync(contentFilePath, 'utf8');
        const meta = JSON.parse(fs.readFileSync(metaFilePath, 'utf8'));
        const imageFilePath = this.getThumbPath(articleTitle, filePath);
        tempArticles.push(
          new ArticleModel(
            articleTitle,
            this.converter.makeHtml(content),
            stats.mtimeMs,
            imageFilePath,
            meta.createDateUnix,
            meta.author,
            meta.tags
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

  private getThumbPath(articleTitle: string, filePath: string): string {
    const pngFilePath = `${filePath}thumb.png`;
    const jpgFilePath = `${filePath}thumb.jpg`;

    try {
      fs.statSync(pngFilePath);
      return `${articleTitle}/thumb.png`;
    } catch (ex: unknown) {}

    try {
      fs.statSync(jpgFilePath);
      return `${articleTitle}/thumb.jpg`;
    } catch (ex: unknown) {}

    return '';
  }
}
