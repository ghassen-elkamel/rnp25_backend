import { Test, TestingModule } from '@nestjs/testing';
import { OlmService } from './olm.service';

describe('OlmService', () => {
  let service: OlmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OlmService],
    }).compile();

    service = module.get<OlmService>(OlmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
