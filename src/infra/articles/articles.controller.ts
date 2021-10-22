import {Controller, Get, Post, Put} from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';

@Controller('articles')
export class ArticlesController {

  @Get()
  public listArticles(): Promise<string[]> {
    return Promise.resolve([]);
  }

  @Get(':uuid')
  public getArticle(): Promise<string> {
    return Promise.resolve('aaaa');
  }

  @Post()
  public createArticle(): Promise<string> {
    return Promise.resolve(uuidv4());
  }

  @Put(':uuid')
  public updateArticle(): Promise<boolean> {
    return Promise.resolve(true);
  }
}
