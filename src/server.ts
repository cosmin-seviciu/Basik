import express from 'express';
import { TwingEnvironment, TwingLoaderFilesystem } from 'twing';
import { articleService } from './services/articleService';
import { fetchRepoService } from './services/fetchRepoService';
import { ArticleModel } from './models/articleModel';

export class Server {
  private port: number;
  private app: express.Application;
  private loader: any;
  private twing: TwingEnvironment;

  public constructor() {
    this.app = express();
    this.port = 5000;
    this.loader = new TwingLoaderFilesystem('./src/view');
    this.twing = new TwingEnvironment(this.loader);
  }

  public createServer(): void {
    fetchRepoService.getArticlesRepo().then((res) => {
      articleService.init();
      this.app.use(express.static(__dirname + '/public'));

      this.app.get('/', (req, res) => {
        this.twing
          .render('index.html', { articles: articleService.articles })
          .then((output) => {
            res.end(output);
          });
      });

      this.app.get('/article/:article', (req, res) => {
        const article: ArticleModel = articleService.getArticleByTitle(
          req.params.article
        );
        this.twing
          .render('article.html', {
            article: articleService.getArticleByTitle(req.params.article),
          })
          .then((output) => {
            res.end(output);
          });
      });

      this.app.listen(this.port, () => {
        console.log('server running on http://localhost:5000/');
      });
    });
  }
}

const server: Server = new Server();
server.createServer();
