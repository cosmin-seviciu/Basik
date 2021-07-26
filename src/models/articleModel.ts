export class ArticleModel {
  public readableTitle: string = '';
  constructor(
    public title: string = '',
    public content: string = '',
    public mtime: number = 0
  ) {
    this.readableTitle = this.createReadableTitle();
  }

  public createReadableTitle() {
    return this.title.replace('-', ' ');
  }
}
