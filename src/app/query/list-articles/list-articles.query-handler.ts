import { QueryHandlerInterface } from '@domain/shared/bus/query-handler.interface';
import { QueryInterface } from '@domain/shared/bus/query.interface';

export class ListArticlesQueryHandler implements QueryHandlerInterface {
  public handle(query: QueryInterface): void {
    return;
  }
}
