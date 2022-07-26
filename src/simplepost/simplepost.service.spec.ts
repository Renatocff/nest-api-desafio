import { Test, TestingModule } from '@nestjs/testing';
import { SimplepostService } from './simplepost.service';

describe('SimplepostService', () => {
  let service: SimplepostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SimplepostService],
    }).compile();

    service = module.get<SimplepostService>(SimplepostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
