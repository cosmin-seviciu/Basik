import express from 'express';
import { TwingEnvironment, TwingLoaderFilesystem } from 'twing';
import { articleService } from './services/articleService';
import { fetchRepoService } from './services/fetchRepoService';

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
    fetchRepoService.getArticlesRepo();
  }

  public createServer(): void {
    this.app.get('/', (req, res) => {
      this.twing
        .render('index.html', { articles: articleService.articles })
        .then((output) => {
          res.end(output);
        });
    });

    this.app.listen(this.port, () => {
      console.log('http://localhost:5000/');
    });
  }
}

const server: Server = new Server();
server.createServer();
