import { Module } from '@nestjs/common';
import { UiModule } from '@ui/ui.module';
import { FixtureModule } from '@infra/fixture/fixture.module';

@Module({
  imports: [UiModule, FixtureModule],
})
export class MyTestModule {}
