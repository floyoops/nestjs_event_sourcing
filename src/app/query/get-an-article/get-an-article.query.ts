import { QueryInterface } from '@domain/shared/bus/query.interface';

export class GetAnArticleQuery implements QueryInterface {
  constructor(public readonly articleUuid: string) {}
  readonly version = 1;
}
