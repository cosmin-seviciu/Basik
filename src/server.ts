import express from 'express';
import { TwingEnvironment, TwingLoaderFilesystem } from 'twing';
import { articleService } from './services/articleService';

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
    this.app.get('/', (req, res) => {
      articleService.getArticles().then((articles) => {
        this.twing.render('index.html', { articles }).then((output) => {
          res.end(output);
        });
      });
    });

    this.app.listen(this.port, () => {
      console.log('http://localhost:5000/');
    });
  }
}

const server: Server = new Server();
server.createServer();
