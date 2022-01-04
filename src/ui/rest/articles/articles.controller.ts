import { Body, Controller, Get, Inject, InternalServerErrorException, Param, Post, Put } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CommandBus, IQueryBus, QueryBus } from '@nestjs/cqrs';
import { CreateANewArticleCommand } from '@app/command/articles/create-a-new-article/create-a-new-article.command';
import { CreateArticleDto } from '@ui/rest/articles/dto/create-article.dto';
import { ListArticlesQuery } from '@app/query/list-articles/list-articles.query';
import { GetAnArticleQuery } from '@app/query/get-an-article/get-an-article.query';
import { UpdateAnArticleCommand } from '@app/command/articles/update-an-article/update-an-article.command';
import { UpdateArticleDto } from '@ui/rest/articles/dto/update-article.dto';
import { LikeAnArticleCommand } from '@app/command/articles/like-an-article/like-an-article.command';

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
  public async updateArticle(@Param() params, @Body() updateDto: UpdateArticleDto): Promise<boolean> {
    try {
      await this.commandBus.execute(new UpdateAnArticleCommand(params.uuid, updateDto.title, updateDto.content));
    } catch (err) {
      throw new InternalServerErrorException('An error has occurred on update article');
    }
    return true;
  }

  @Put(':uuid/like')
  public async likeArticle(@Param() params): Promise<boolean> {
    try {
      await this.commandBus.execute(new LikeAnArticleCommand(params.uuid));
    } catch (err) {
      throw new InternalServerErrorException('An error has occurred on like article');
    }
    return true;
  }
}
