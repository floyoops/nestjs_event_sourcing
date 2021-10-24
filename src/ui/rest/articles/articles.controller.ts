import { Body, Controller, Get, Inject, InternalServerErrorException, Post, Put } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CommandBus } from '@nestjs/cqrs';
import { CreateANewArticleCommand } from '@app/command/articles/create-a-new-article/create-a-new-article.command';
import { CreateArticleDto } from '@ui/rest/articles/dto/create-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(@Inject(CommandBus) private readonly commandBus: CommandBus) {}

  @Get()
  public listArticles(): Promise<string[]> {
    return Promise.resolve([]);
  }

  @Get(':uuid')
  public getArticle(): Promise<string> {
    return Promise.resolve('aaaa');
  }

  @Post()
  public async createArticle(@Body() createDto: CreateArticleDto): Promise<string> {
    let response = '';
    try {
      response = await this.commandBus.execute(
        new CreateANewArticleCommand(uuidv4(), createDto.title, createDto.content),
      );
    } catch (err) {
      throw new InternalServerErrorException('An error has occurred on create article');
    }
    return response;
  }

  @Put(':uuid')
  public updateArticle(): Promise<boolean> {
    return Promise.resolve(true);
  }
}
