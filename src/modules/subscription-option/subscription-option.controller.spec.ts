import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionOptionController } from './subscription-option.controller';
import { SubscriptionOptionService } from './subscription-option.service';

describe('SubscriptionOptionController', () => {
  let controller: SubscriptionOptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscriptionOptionController],
      providers: [SubscriptionOptionService],
    }).compile();

    controller = module.get<SubscriptionOptionController>(SubscriptionOptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
