import { Module } from '@nestjs/common';
import { FixtureService } from './fixture.service';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  providers: [FixtureService],
})
export class FixtureModule {}
