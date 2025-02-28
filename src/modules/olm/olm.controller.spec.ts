import { Test, TestingModule } from '@nestjs/testing';
import { OlmController } from './olm.controller';
import { OlmService } from './olm.service';

describe('OlmController', () => {
  let controller: OlmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OlmController],
      providers: [OlmService],
    }).compile();

    controller = module.get<OlmController>(OlmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
