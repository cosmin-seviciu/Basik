import express from 'express';
import { TwingEnvironment, TwingLoaderFilesystem } from 'twing';
import { ArticleService } from './services/articleService';
import { fetchRepoService } from './services/fetchRepoService';
import ArticleController from './controllers/articleController';
import config from '../basik.config.json';

export class Server {
  private readonly port: number;

  private readonly app: express.Application;

  private readonly loader: TwingLoaderFilesystem;

  private readonly twing: TwingEnvironment;

  private controller: ArticleController;

  private articleService: ArticleService;

  public getApplication(): express.Application {
    return this.app;
  }

  public getTwingEnvironment(): TwingEnvironment {
    return this.twing;
  }

  public getArticleService(): ArticleService {
    return this.articleService;
  }

  public constructor() {
    this.port = 5000;
    this.app = express();
    this.loader = new TwingLoaderFilesystem('./src/views');
    this.twing = new TwingEnvironment(this.loader);
  }

  public async createServer(): Promise<void> {
    await fetchRepoService.getArticlesRepo();
    this.articleService = new ArticleService();
    this.controller = new ArticleController(this);
    this.app.use(
      express.static(
        `${__dirname}/${config.repoName}/${config.articlesFolderName}/`
      )
    );
    this.app.use(express.static(`${__dirname}/public`));
    this.controller.register();
    this.app.listen(this.port, () => {
      console.log('server running on http://localhost:5000/');
    });
  }
}

const server: Server = new Server();
server.createServer();
