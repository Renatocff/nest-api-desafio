import { Test, TestingModule } from '@nestjs/testing';
import { SimplepostResolver } from './simplepost.resolver';

describe('SimplepostResolver', () => {
  let resolver: SimplepostResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SimplepostResolver],
    }).compile();

    resolver = module.get<SimplepostResolver>(SimplepostResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
