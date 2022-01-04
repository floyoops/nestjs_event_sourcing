import { CreateANewArticleCommandHandlerService } from './create-a-new-article.command-handler.service';
import { UpdateAnArticleCommandHandlerService } from '@infra/articles/command/update-an-article.command-handler.service';
import { LikeAnArticleCommandHandlerService } from '@infra/articles/command/like-an-article.command-handler.service';

export const ArticlesCommandHandlers = [
  CreateANewArticleCommandHandlerService,
  UpdateAnArticleCommandHandlerService,
  LikeAnArticleCommandHandlerService,
];
