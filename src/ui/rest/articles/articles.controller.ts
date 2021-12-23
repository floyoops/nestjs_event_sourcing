import { Body, Controller, Get, Inject, InternalServerErrorException, Param, Post, Put } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CommandBus, IQueryBus, QueryBus } from '@nestjs/cqrs';
import { CreateANewArticleCommand } from '@app/command/articles/create-a-new-article/create-a-new-article.command';
import { CreateArticleDto } from '@ui/rest/articles/dto/create-article.dto';
import { ListArticlesQuery } from '@app/query/list-articles/list-articles.query';
import { GetAnArticleQuery } from '@app/query/get-an-article/get-an-article.query';

@Controller('articles')
export class ArticlesController {
  constructor(
    @Inject(QueryBus) private readonly queryBus: IQueryBus,
    @Inject(CommandBus) private readonly commandBus: CommandBus,
  ) {}

  @Get()
  public listArticles(): Promise<string[]> {
    return this.queryBus.execute(new ListArticlesQuery());
  }

  @Get(':uuid')
  public getArticle(@Param() params): Promise<string> {
    return this.queryBus.execute(new GetAnArticleQuery(params.uuid));
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
