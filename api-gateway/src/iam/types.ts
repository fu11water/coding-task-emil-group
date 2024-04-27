export type AddUserParams = {
  name: string;
  login: string;
  password: string;
  role: string;
};

export type UserResponse = {
  id: number;
  name: string;
  login: string;
  isActive: boolean;
};

export type AddUserResponse = UserResponse;

export type GetAllUsersResponse = UserResponse[];

export type DeleteUserParams = {
  id: number;
};

export type LoginParams = {
  login: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
};
