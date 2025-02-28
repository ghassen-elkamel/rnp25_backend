import { Test, TestingModule } from '@nestjs/testing';
import { SubscirptionFormService } from './subscirption_form.service';

describe('SubscirptionFormService', () => {
  let service: SubscirptionFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscirptionFormService],
    }).compile();

    service = module.get<SubscirptionFormService>(SubscirptionFormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
