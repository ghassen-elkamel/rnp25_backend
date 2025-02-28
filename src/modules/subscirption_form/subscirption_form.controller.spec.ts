import { Test, TestingModule } from '@nestjs/testing';
import { SubscirptionFormController } from './subscirption_form.controller';
import { SubscirptionFormService } from './subscirption_form.service';

describe('SubscirptionFormController', () => {
  let controller: SubscirptionFormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscirptionFormController],
      providers: [SubscirptionFormService],
    }).compile();

    controller = module.get<SubscirptionFormController>(SubscirptionFormController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
