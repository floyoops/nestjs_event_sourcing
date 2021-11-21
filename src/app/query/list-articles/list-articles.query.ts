import { QueryInterface } from '@domain/shared/bus/query.interface';

export class ListArticlesQuery implements QueryInterface {
  public readonly version = 1;
}
