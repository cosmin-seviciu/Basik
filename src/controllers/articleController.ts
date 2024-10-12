import { Application, Request, Response } from 'express';
import { TwingEnvironment } from 'twing';

import { Server } from '../server';
import { ArticleModel } from '../models/articleModel';
import { ArticleService } from '../services/articleService';

export default class ArticleController {
  private readonly app: Application;

  private readonly twing: TwingEnvironment;

  private readonly service: ArticleService;

  public constructor(server: Server) {
    this.app = server.getApplication();
    this.twing = server.getTwingEnvironment();
    this.service = server.getArticleService();
  }

  public register(): void {
    this.app.get('/', this.getArticleList.bind(this));
    this.app.get('/privacy', this.getPolicyPrivacy.bind(this));
    this.app.get('/article/:article', this.getArticle.bind(this));
  }

  private async getArticleList(req: Request, res: Response): Promise<void> {
    res.end(
      await this.twing.render('index.html', { articles: this.service.articles })
    );
  }

  private async getArticle(req: Request, res: Response): Promise<void> {
    const article: ArticleModel = this.service.getArticleByTitle(
      req.params.article
    );
    res.end(await this.twing.render('article.html', { article }));
  }

  private async getPolicyPrivacy(req: Request, res: Response): Promise<void> {
    res.end(await this.twing.render('privacy.html'));
  }
}
