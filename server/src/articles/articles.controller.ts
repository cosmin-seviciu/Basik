import { Controller, Get } from '@nestjs/common';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private articleService: ArticlesService) {}

  @Get()
  getArticlesList() {
    const articleList = this.articleService.getArticleList();
    const allArticles = this.articleService.getAllArticles(articleList);
    return allArticles;
  }
}
