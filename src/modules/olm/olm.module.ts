import { Module } from '@nestjs/common';
import { OlmService } from './olm.service';
import { OlmController } from './olm.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Olm } from './entities/olm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Olm])],
  controllers: [OlmController],
  providers: [OlmService],
  exports: [OlmService],
})
export class OlmModule {}
