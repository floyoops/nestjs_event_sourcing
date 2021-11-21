import { CommandInterface } from '@domain/shared/bus/command.interface';

export interface CommandHandlerInterface {
  handle(command: CommandInterface): Promise<any>;
}
