import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeOrm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async findAllUsers(): Promise<User[]> {
        const users = await this.userRepository.find();
        return users;
    }

    async findUserByUsername(usuario: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { usuario } });

        if (!user) {
            return new User();
        }

        return user;
    }

    async findUserById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) {
            return new User();
        }

        return user;
    }

    async createUser(data: CreateUserInput): Promise<User> {

        const user = await this.userRepository.create(data);
        const userSaved = await this.userRepository.save(user);

        if (!userSaved) {
            new User();
        }

        return userSaved;
    }

    async updateUser(id: number, data: UpdateUserInput): Promise<User> {
        const user = await this.findUserById(id);

        await this.userRepository.update(user.id, { ...data });

        const userUpdated = this.userRepository.create({ ...user, ...data });

        return userUpdated;
    }

    async removeUserById(id: number): Promise<Boolean> {
        const user = await this.findUserById(id);

        const deleted = await this.userRepository.delete(id);

        if (deleted) {
            return true
        }

        return false;
    }
}