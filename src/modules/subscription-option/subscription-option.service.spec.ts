import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionOptionService } from './subscription-option.service';

describe('SubscriptionOptionService', () => {
  let service: SubscriptionOptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscriptionOptionService],
    }).compile();

    service = module.get<SubscriptionOptionService>(SubscriptionOptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
