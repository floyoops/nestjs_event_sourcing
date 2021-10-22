import {CreateANewArticleCommand} from "./create-a-new-article.command";
import {CommandHandlerInterface} from "../../../../domain/shared/bus/command-handler.interface";

export class CreateANewArticleCommandHandler implements CommandHandlerInterface {

  handle(command: CreateANewArticleCommand): Promise<string> {
    return Promise.resolve(command.newArticleUuid);
  }
}
