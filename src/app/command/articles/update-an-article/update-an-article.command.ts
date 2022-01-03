import { CommandInterface } from '@domain/shared/bus/command.interface';

export class UpdateAnArticleCommand implements CommandInterface {
  constructor(public readonly articleUuid: string, public readonly title: string, public readonly content: string) {}

  readonly version = 1;
}
