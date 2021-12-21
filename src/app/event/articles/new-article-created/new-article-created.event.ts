import { AggregateId, Uuid } from '@domain/shared/type';
import { DomainEvent } from '@domain/shared/bus/domain.event';

export interface NewArticleCreatedData {
  uuid: Uuid;
  title: string;
  content: string;
}

export class NewArticleCreated extends DomainEvent<NewArticleCreatedData> {
  constructor(aggregateId: AggregateId, data: NewArticleCreatedData) {
    super(aggregateId, 'NewArticleCreatedEvent', new Date(), 1, data);
  }
}
