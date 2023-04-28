import { UsersService } from './user.service.js';
import userList from '../../../repositories/userList/index.js';

export const usersService = new UsersService(userList);

