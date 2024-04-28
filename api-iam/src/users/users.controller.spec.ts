import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ERoles } from '../roles/roles.types';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(() => {
    usersService = new UsersService({} as any, {} as any);
    usersController = new UsersController(usersService);
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

      const spy = jest
        .spyOn(usersService, 'addUser')
        .mockImplementation()
        .mockResolvedValue(resolvedUserData);

      const createdUser = await usersController.addUser(
        userData,
        {} as any,
        {} as any,
      );
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(userData);
      expect(createdUser).toBe(resolvedUserData);
    });

    it('should test getAllUsers method', async () => {
      const resolvedUsersData: any = [
        { name: 'asd', login: 'asd', id: 1, isActive: true },
        { name: 'cvbn', login: 'vbbnv', id: 2, isActive: true },
        { name: 'jhhjk', login: 'ertert', id: 3, isActive: true },
      ];

      const spy = jest
        .spyOn(usersService, 'getUsers')
        .mockImplementation()
        .mockResolvedValue(resolvedUsersData);

      const users = await usersController.getAllUsers();
      expect(spy).toHaveBeenCalled();
      expect(users).toStrictEqual({ users: resolvedUsersData });
    });

    it('should test deleteUser method', async () => {
      const deleteParams = { id: 1 };

      const spy = jest.spyOn(usersService, 'deleteUser').mockImplementation();

      const createdUser = await usersController.deleteUser(
        deleteParams,
        {} as any,
        {} as any,
      );
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(deleteParams.id);
    });
  });
});
