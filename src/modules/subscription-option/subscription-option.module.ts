import { Module } from '@nestjs/common';
import { SubscriptionOptionService } from './subscription-option.service';
import { SubscriptionOptionController } from './subscription-option.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionOption } from './entities/subscription-option.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SubscriptionOption])],
  controllers: [SubscriptionOptionController],
  providers: [SubscriptionOptionService],
  exports: [SubscriptionOptionService]
})
export class SubscriptionOptionModule {}
