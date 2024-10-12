import simpleGit, { SimpleGit, SimpleGitOptions } from 'simple-git';
import * as fs from 'fs';
import config from '../../basik.config.json';

class FetchRepoService {
  private git: SimpleGit;

  private options: Partial<SimpleGitOptions> = {
    baseDir: `${process.cwd()}/src/`,
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
    }, config.refreshTime);
  }

  public getArticlesRepo(): Promise<any> {
    return new Promise((res) => {
      if (config.dev) {
        console.log(
          '------------------------------------------------------------------------------------'
        );
        console.log(
          'Skipping article repo fetch, to fetch the repo set dev to false in basik.config.json'
        );
        console.log(
          '------------------------------------------------------------------------------------'
        );
        res(true);
        return;
      }
      const localFiles = fs.readdirSync('./src/');

      if (!localFiles.find((file) => file === this.remoteRepoName)) {
        console.log(`git clone ${this.remoteRepo}`);
        res(this.git.clone(this.remoteRepo));
      } else {
        console.log(`git pull ${this.remoteRepo}`);
        this.git.reset();
        this.git.cwd(`src/${this.remoteRepoName}`);
        res(this.git.pull('origin', 'main'));
      }
    });
  }
}

export const fetchRepoService = new FetchRepoService();
