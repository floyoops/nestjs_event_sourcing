import { CommandInterface } from '@domain/shared/bus/command.interface';

export class LikeAnArticleCommand implements CommandInterface {
  constructor(public readonly articleUuid: string) {}

  public readonly version = 1;
}
