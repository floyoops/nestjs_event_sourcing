import { AggregateId } from '@domain/shared/type';
import { DomainEvent } from '@domain/shared/bus/domain.event';

interface NewArticleCreatedData {
  uuid: string;
  title: string;
  content: string;
}

export class NewArticleCreated extends DomainEvent<NewArticleCreatedData> {
  constructor(aggregateId: AggregateId, data: NewArticleCreatedData) {
    super(aggregateId, 'NewArticleCreatedEvent', new Date(), 1, data);
  }
}
