import { DomainEvent } from '@domain/shared/bus/domain.event';
import { AggregateId, Uuid } from '@domain/shared/type';

export interface ArticleUpdatedData {
  uuid: Uuid;
  title: string;
  content: string;
}

export class ArticleUpdated extends DomainEvent<ArticleUpdatedData> {
  constructor(aggregateId: AggregateId, data: ArticleUpdatedData) {
    super(aggregateId, 'ArticleUpdated', new Date(), 1, data);
  }
}
