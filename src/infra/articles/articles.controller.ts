import {Controller, Get, Inject, InternalServerErrorException, Post, Put} from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import {CommandBus} from "@nestjs/cqrs";
import {CreateANewArticleCommand} from "../../app/command/articles/create-a-new-article/create-a-new-article.command";

@Controller('articles')
export class ArticlesController {

  constructor(
    @Inject(CommandBus) private readonly commandBus: CommandBus,
  ) {}

  @Get()
  public listArticles(): Promise<string[]> {
    return Promise.resolve([]);
  }

  @Get(':uuid')
  public getArticle(): Promise<string> {
    return Promise.resolve('aaaa');
  }

  @Post()
  public async createArticle(): Promise<string> {
    let response = '';
    const command = new CreateANewArticleCommand(uuidv4(), 'My title test', 'My test content');
    try {
      response = await this.commandBus.execute(command);
    } catch (err) {
      throw new InternalServerErrorException('An error has occurend when the create article');
    }
    return Promise.resolve(response);
  }

  @Put(':uuid')
  public updateArticle(): Promise<boolean> {
    return Promise.resolve(true);
  }
}
