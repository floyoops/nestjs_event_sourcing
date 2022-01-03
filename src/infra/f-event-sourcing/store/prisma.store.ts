import { FEvent, FStoreInterface } from '@infra/f-event-sourcing/type/f.type';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@infra/prisma/prisma.service';
import { AggregateId } from '@domain/shared/type';
import { PrismaEventTransformer } from '@infra/f-event-sourcing/store/prisma-event.transformer';

@Injectable()
export class PrismaStore implements FStoreInterface {
  constructor(
    @Inject(PrismaService) private readonly prisma: PrismaService,
    @Inject(PrismaEventTransformer) private readonly prismaEventTransformer: PrismaEventTransformer,
  ) {}

  async findByAggregateId<TData = unknown>(id: AggregateId): Promise<FEvent[]> {
    const eventsModel = await this.prisma.event.findMany({
      where: {
        streamId: id,
      },
      orderBy: [{ createdAt: 'asc' }],
    });

    return eventsModel.map(event => this.prismaEventTransformer.transform<TData>(event));
  }

  async findAll<TData = unknown>(): Promise<FEvent[]> {
    const eventsModel = await this.prisma.event.findMany({
      orderBy: [{ createdAt: 'asc' }],
    });
    return eventsModel.map(event => this.prismaEventTransformer.transform<TData>(event));
  }

  async save(event: FEvent): Promise<void> {
    await this.prisma.event.create({
      data: this.prismaEventTransformer.reverseTransform(event),
    });

    return;
  }
}
