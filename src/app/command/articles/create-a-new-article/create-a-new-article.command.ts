import { CommandInterface } from '@domain/shared/bus/command.interface';

export class CreateANewArticleCommand implements CommandInterface {
  constructor(public readonly newArticleUuid: string, public readonly title: string, public readonly content: string) {}

  public readonly version = 1;
}
