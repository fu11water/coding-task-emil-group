import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ERoles } from '../roles/roles.types';
import { EErrors, getServiceErrorCode } from '../errors';

const repositoryMockFactory: any = jest.fn(() => ({
  find: jest.fn(() => {}),
  delete: jest.fn(() => {}),
  findOneBy: jest.fn().mockResolvedValue(null),
  create: jest.fn(() => {}),
  save: jest.fn(() => {}),
}));

const usersRepo = repositoryMockFactory();
const rolesRepo = repositoryMockFactory();

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(() => {
    usersService = new UsersService(usersRepo, rolesRepo);
  });

  describe('root', () => {
    it('should test addUser method', async () => {
      const userData = {
        name: 'asd',
        login: 'asd',
        password: 'asd',
        role: ERoles.ADMIN,
      };

      const resolvedUserData = {
        name: 'asd',
        login: 'asd',
        id: 1,
        isActive: true,
      };

      const usersRepoSpyFindOne = jest
        .spyOn(usersRepo, 'findOneBy')
        .mockResolvedValueOnce(null);
      const rolesRepoSpyFindOne = jest
        .spyOn(rolesRepo, 'findOneBy')
        .mockResolvedValueOnce({});
      const usersRepoSpyCreate = jest
        .spyOn(usersRepo, 'create')
        .mockResolvedValueOnce(resolvedUserData);
      const usersRepoSpySave = jest.spyOn(usersRepo, 'save');

      const createdUser = await usersService.addUser(userData);
      expect(usersRepoSpyFindOne).toHaveBeenCalled();
      expect(rolesRepoSpyFindOne).toHaveBeenCalled();
      expect(usersRepoSpyCreate).toHaveBeenCalled();
      expect(usersRepoSpySave).toHaveBeenCalled();
      expect(createdUser).toStrictEqual(resolvedUserData);
    });

    it('should test addUser method to return error on user check', async () => {
      const userData = {
        name: 'asd',
        login: 'asd',
        password: 'asd',
        role: ERoles.ADMIN,
      };

      const usersRepoSpyFindOne = jest
        .spyOn(usersRepo, 'findOneBy')
        .mockResolvedValueOnce({});

      try {
        await usersService.addUser(userData);
      } catch (error) {
        expect(usersRepoSpyFindOne).toHaveBeenCalled();
        expect(error.message).toStrictEqual(
          getServiceErrorCode(EErrors.LOGIN_ALREADY_USED),
        );
      }
    });

    it('should test addUser method to return error on role check', async () => {
      const userData = {
        name: 'asd',
        login: 'asd',
        password: 'asd',
        role: ERoles.ADMIN,
      };

      const usersRepoSpyFindOne = jest
        .spyOn(usersRepo, 'findOneBy')
        .mockResolvedValueOnce(null);
      const rolesRepoSpyFindOne = jest
        .spyOn(rolesRepo, 'findOneBy')
        .mockResolvedValueOnce(null);

      try {
        await usersService.addUser(userData);
      } catch (error) {
        expect(usersRepoSpyFindOne).toHaveBeenCalled();
        expect(rolesRepoSpyFindOne).toHaveBeenCalled();
        expect(error.message).toStrictEqual(
          getServiceErrorCode(EErrors.ROLE_NOT_EXIST),
        );
      }
    });

    it('should test getUsers method', async () => {
      const resolvedUserData = {
        name: 'asd',
        login: 'asd',
        id: 1,
        isActive: true,
      };

      const spy = jest
        .spyOn(usersRepo, 'find')
        .mockResolvedValueOnce([resolvedUserData]);

      const users = await usersService.getUsers();
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith({
        select: ['id', 'name', 'login', 'isActive'],
      });
      expect(users).toStrictEqual([resolvedUserData]);
    });

    it('should test deleteUser method', async () => {
      const spy = jest.spyOn(usersRepo, 'delete');

      await usersService.deleteUser(1);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(1);
    });
  });
});
