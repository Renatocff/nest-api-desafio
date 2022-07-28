import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import TestUtil from '../commons/test/TestUtil';
import { SimplePost } from './simplepost.entity';
import { SimplepostService } from './simplepost.service';

describe('SimplepostService', () => {
  let service: SimplepostService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SimplepostService, {
        provide: getRepositoryToken(SimplePost),
        useValue: mockRepository,
      }],
    }).compile();

    service = module.get<SimplepostService>(SimplepostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllSimplePosts', () => {
    it('should be list all simpleposts', async () => {
      const simplepost = TestUtil.giveMeAValidSimplePost();
      mockRepository.find.mockReturnValue([simplepost, simplepost]);

      const simpleposts = await service.findAllSimplePosts();

      expect(simpleposts).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    })
  });

  describe('findSimplePostById', () => {
    it('should be found a user', async () => {
      const simplepost = TestUtil.giveMeAValidUSer();
      mockRepository.findOne.mockReturnValue(simplepost);

      const simplepostFound = await service.findSimplePostById(simplepost.id);
      expect(simplepostFound).toEqual(simplepost);
    })

    it('not should be a user', async () => {
      mockRepository.findOne.mockReturnValue(null);

      const simplepost = await service.findSimplePostById(100000);

      expect(simplepost).toEqual({});
    })
  });

  describe('createSimplePost', () => {
    it('should be create a simplepost', async () => {
      const simplepost = TestUtil.giveMeAValidSimplePost();
      mockRepository.save.mockReturnValue(simplepost);
      mockRepository.create.mockReturnValue(simplepost);

      const simplepostCreated = await service.createSimplePost(simplepost);

      expect(simplepostCreated).toMatchObject(simplepost);
    })

    it('not created a simplepost', async () => {
      const simplepost = TestUtil.giveMeAValidSimplePost();

      mockRepository.save.mockReturnValue(null);
      mockRepository.create.mockReturnValue(simplepost);

      await service.createSimplePost(simplepost).catch(e => {
        expect(e).toBeInstanceOf(InternalServerErrorException);
      });
    })
  });

  describe('updateSimplePost', () => {
    it('should be update a simplepost', async () => {
      const simplepost = TestUtil.giveMeAValidSimplePost();
      const updatedSimplepost = { text: "Update", date: new Date() };

      mockRepository.findOne.mockReturnValue(simplepost);
      mockRepository.update.mockReturnValue({
        ...simplepost,
        ...updatedSimplepost
      });
      mockRepository.create.mockReturnValue({
        ...simplepost,
        ...updatedSimplepost
      });

      const resultSimplepost = await service.updateSimplePost(1, updatedSimplepost);

      expect(resultSimplepost).toMatchObject(updatedSimplepost);
    })
  });

  describe('removeSimplePostById', () => {
    it('should be a delete simplePost', async () => {
      const simplepost = TestUtil.giveMeAValidSimplePost();
      mockRepository.delete.mockReturnValue(true);

      const simplepostDeleted = await service.removeSimplePostById(simplepost.id);
      expect(simplepostDeleted).toEqual(true);
    })

    it('not delete a simplePost', async () => {
      const simplepost = TestUtil.giveMeAValidSimplePost();
      mockRepository.delete.mockReturnValue(false);

      const simplepostDeleted = await service.removeSimplePostById(simplepost.id);
      expect(simplepostDeleted).toEqual(false);
    })
  });

});
