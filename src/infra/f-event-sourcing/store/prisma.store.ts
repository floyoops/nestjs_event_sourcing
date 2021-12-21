import {FEvent, FStoreInterface} from '@infra/f-event-sourcing/type/f.type';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@infra/prisma/prisma.service';
import { AggregateId } from '@domain/shared/type';
import {
  NewArticleCreated,
} from "@app/event/articles/new-article-created/new-article-created.event";

@Injectable()
export class PrismaStore implements FStoreInterface {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async findByAggregateId<TData = unknown>(id: AggregateId): Promise<FEvent[]> {
    const eventsModel = await this.prisma.event.findMany({
      where: {
        streamId: id,
      },
    });

    // Adapt model prisma to domainEvent.
    return eventsModel.map((eventModel) => {
      const objData = JSON.parse(eventModel.data);
      return new NewArticleCreated(
        eventModel.streamId,
        {
          content: objData?.content || '',
          title: objData.title || '',
          uuid: objData?.uuid || '',
        },
      );
    });
  }

  async save(event: FEvent): Promise<void> {
    await this.prisma.event.create({data: {
        streamId: event.aggregateId.toString(),
        data: event.data.toString(),
        eventType: event.eventType,
        version: event.version,
      }});

    return;
  }
}
