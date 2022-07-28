import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import TestUtil from './../commons/test/TestUtil';
import { User } from './user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

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
      providers: [UserService, {
        provide: getRepositoryToken(User),
        useValue: mockRepository,
      }],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllUsers', () => {
    it('should be list all users', async () => {
      const user = TestUtil.giveMeAValidUSer();
      mockRepository.find.mockReturnValue([user, user]);

      const users = await service.findAllUsers();

      expect(users).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    })
  });

  describe('findUserByUsername', () => {
    it('should be a user', async () => {
      const user = TestUtil.giveMeAValidUSer();
      mockRepository.findOne.mockReturnValue(user);

      const userFound = await service.findUserByUsername("teste");

      expect(userFound).toMatchObject({ usuario: user.usuario });
    })

    it('not should be a user', async () => {
      mockRepository.findOne.mockReturnValue(null);

      const userFound = await service.findUserByUsername('testando');

      expect(userFound).toEqual({});
    })
  });

  describe('findUserById', () => {
    it('should be a user', async () => {
      const user = TestUtil.giveMeAValidUSer();
      mockRepository.findOne.mockReturnValue(user);

      const userFound = await service.findUserById(1);
      expect(userFound).toMatchObject({ usuario: user.usuario });
    })

    it('not should be a user', async () => {
      mockRepository.findOne.mockReturnValue(null);
      const userFound = await service.findUserById(100000);

      expect(userFound).toEqual({});
    })
  });

  describe('createUser', () => {
    it('should be create a user', async () => {
      const user = TestUtil.giveMeAValidUSer();
      mockRepository.save.mockReturnValue(user);
      mockRepository.create.mockReturnValue(user);

      const userCreated = await service.createUser(user);

      expect(userCreated).toEqual(user);
    })

    it('not created a user', async () => {
      const user = TestUtil.giveMeAValidUSer();

      mockRepository.save.mockReturnValue(null);
      mockRepository.create.mockReturnValue(user);

      await service.createUser(user).then(response => {
        expect(response).toEqual(null);
      });
    })
  });

  describe('updateUser', () => {
    it('should be update a user', async () => {
      const user = TestUtil.giveMeAValidUSer();
      const updatedUser = { ativo: true };

      mockRepository.findOne.mockReturnValue(user);
      mockRepository.update.mockReturnValue({
        ...user,
        ...updatedUser
      });
      mockRepository.create.mockReturnValue({
        ...user,
        ...updatedUser
      });

      const resultUser = await service.updateUser(1, updatedUser);

      expect(resultUser).toMatchObject(updatedUser);
    })
  });

  describe('removeUserById', () => {
    it('should be a delete user', async () => {
      const user = TestUtil.giveMeAValidUSer();
      mockRepository.delete.mockReturnValue(true);

      const userDeleted = await service.removeUserById(user.id);
      expect(userDeleted).toEqual(true);
    })

    it('not delete a user', async () => {
      const user = TestUtil.giveMeAValidUSer();
      mockRepository.delete.mockReturnValue(false);

      const userDeleted = await service.removeUserById(user.id);
      expect(userDeleted).toEqual(false);
    })
  });

});
