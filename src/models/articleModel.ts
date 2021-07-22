export class ArticleModel {
  constructor(
    public title: string = '',
    public content: string = '',
    public mtime: number = 0
  ) {}
}
