export class ArticleModel {
  private _readableTitle: string;
  private _title: string;

  public set title(value: string) {
    this._title = value;
    this._readableTitle = value.replace('-', ' ');
  } 

  public get title(): string {
    return this._title;
  }

  public get readableTitle(): string {
    return this._readableTitle;
  }

  constructor(
    title: string = '',
    public content: string = '',
    public mtime: number = 0,
    public thumb: string = '') {
      this.title = title;
  }
}
