import { Inject, Injectable } from '@nestjs/common';
import { CommandBus, ICommandBus } from '@nestjs/cqrs';
import { CreateANewArticleCommand } from '@app/command/articles/create-a-new-article/create-a-new-article.command';
import * as faker from 'faker';

@Injectable()
export class FixtureService {
  constructor(@Inject(CommandBus) private readonly commandBus: ICommandBus) {}

  public loadAnArticle(uuid: string): Promise<void> {
    return this.commandBus.execute(new CreateANewArticleCommand(uuid, faker.name.title(), faker.lorem.paragraph(2)));
  }
}
