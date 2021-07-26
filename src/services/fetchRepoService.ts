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
      console.log(config.dev)
      if (config.dev) {
        console.log("------------------------------------------------------------------------------------")
        console.log("Skipping article repo fetch, to fetch the repo set dev to false in basik.config.json")
        console.log("------------------------------------------------------------------------------------")
        res(true)
        return;

      }
      const localFiles = fs.readdirSync('./');

      if (!localFiles.find((file) => file === this.remoteRepoName)) {
        console.log(`git clone ${this.remoteRepo}`);
        res(this.git.clone(this.remoteRepo));
      } else {
        console.log(`git pull ${this.remoteRepo}`);
        res(this.git.pull());
      }
    });
  }
}

export const fetchRepoService = new FetchRepoService();
