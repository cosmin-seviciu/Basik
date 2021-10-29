import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as matter from 'gray-matter';

@Injectable()
export class ArticlesService {
  public getArticleList(): string[] {
    return fs.readdirSync('./blog-articles/articles');
  }

  getArticleByTitle(title: string) {
    const articlePath = `./blog-articles/articles/${title}/index.md`;
    const article = fs.readFileSync(articlePath, 'utf8');
    return matter(article);
  }

  getAllArticles(articleList: string[]) {
    return articleList.map((title) => {
      const articlePath = `./blog-articles/articles/${title}/index.md`;
      const article: matter.GrayMatterFile<string | Buffer> = matter(
        fs.readFileSync(articlePath, 'utf8'),
      );
      delete article.orig;
      delete article.excerpt;
      return article;
    });
  }
}
