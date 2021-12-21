import {Module} from "@nestjs/common";
import {PrismaService} from "@infra/prisma/prisma.service";

@Module({
  providers: [
    PrismaService,
  ],
})
export class PrismaModule {}