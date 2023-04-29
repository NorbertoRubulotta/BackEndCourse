import { User } from "../../../models/userModel.js";
import { logger } from "../../../persistence/loggers/logger.js";
import { encryptPassword } from "../../../utils/passEncrypter.js";
import { cartService } from "../cart.service/index.js";


export class UsersService {
    #userRepository;
    constructor(userList) {
        this.#userRepository = userList;
    }

    async createUser({ email, password, name, lastname, image }) {
        const newUserInfo = {
            email,
            password,
            name,
            lastname,
            image
        }

        try {
            const userExist = await this.#userRepository.getByEmail(email);
            if (userExist) throw new Error("User already exists");
            const password = encryptPassword(newUserInfo.password);
            const idCart = await cartService.createCart()
            const user = new User(newUserInfo);
            user.password = password;
            user.idCart = idCart;
            await this.#userRepository.save(user.data());
            return user.data();
        } catch (error) {
            logger.error(error.message);
            throw error.message
        }
    }

    async getById(id) {
        try {
            const user = await this.#userRepository.getById(id);
            return user.data();
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
}