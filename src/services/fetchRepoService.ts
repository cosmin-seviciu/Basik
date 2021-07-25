import simpleGit, { SimpleGit, SimpleGitOptions } from 'simple-git';
import * as fs from 'fs';
import config from '../../basik.config.json';

class FetchRepoService {
  private git: SimpleGit;
  private options: Partial<SimpleGitOptions> = {
    baseDir: process.cwd(),
    binary: 'git',
    maxConcurrentProcesses: 6,
  };
  private remoteRepo: string = config.repoUrl;
  private remoteRepoName: string = config.repoName;

  constructor() {
    this.git = simpleGit(this.options);
    this.git.addRemote('origin', this.remoteRepo);
    setInterval(() => {
      this.getArticlesRepo();
    }, 3600000);
  }

  public getArticlesRepo(): Promise<any> {
    return new Promise((res, rej) => {
      const localFiles = fs.readdirSync('./');

      if (!localFiles.find((file) => file === this.remoteRepoName)) {
        console.log(`git clone ${this.remoteRepoName} from ${this.remoteRepo}`);
        res(this.git.clone(this.remoteRepo));
      } else {
        console.log(`git pull ${this.remoteRepoName} from ${this.remoteRepo}`);
        res(this.git.pull());
      }
    });
  }
}

export const fetchRepoService = new FetchRepoService();
