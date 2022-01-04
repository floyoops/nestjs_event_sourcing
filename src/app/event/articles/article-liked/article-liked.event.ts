import { DomainEvent } from '@domain/shared/bus/domain.event';
import { AggregateId } from '@domain/shared/type';

export class ArticleLiked extends DomainEvent<null> {
  constructor(aggregateId: AggregateId, data: null) {
    super(aggregateId, 'ArticleLiked', new Date(), 1, data);
  }
}
