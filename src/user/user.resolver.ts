import { InternalServerErrorException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/auth.guard';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
    constructor(
        private userService: UserService
    ) { }

    @Query(() => [User])
    @UseGuards(GqlAuthGuard)
    async users(): Promise<User[]> {
        const users = await this.userService.findAllUsers();
        return users;
    }

    @Query(() => User)
    @UseGuards(GqlAuthGuard)
    async findUserByUsername(
        @Args('usuario') usuario: string
    ): Promise<User> {
        const user = await this.userService.findUserByUsername(usuario);
        return user;
    }

    @Query(() => User)
    @UseGuards(GqlAuthGuard)
    async findUsuarioById(
        @Args('id') id: number
    ): Promise<User> {
        const usuario = await this.userService.findUserById(id);
        return usuario;
    }

    @Mutation(() => User)
    @UseGuards(GqlAuthGuard)
    async createUser(
        @Args('data') data: CreateUserInput
    ): Promise<User> {

        const usuarioExiste = await this.userService.findUserByUsername(data.usuario);

        if (usuarioExiste) {
            throw new InternalServerErrorException(`Usuário ${data.usuario} já existe na base de dados.`);
        }

        const user = await this.userService.createUser(data);
        return user;
    }

    @Mutation(() => User)
    @UseGuards(GqlAuthGuard)
    async UpdateUser(
        @Args('id') id: number,
        @Args('data') data: UpdateUserInput
    ): Promise<User> {
        const usuarioUpdated = await this.userService.updateUser(id, data);
        return usuarioUpdated;
    }

    @Mutation(() => Boolean)
    @UseGuards(GqlAuthGuard)
    async deleteUserById(
        @Args('id') id: number
    ): Promise<Boolean> {
        const del = await this.userService.removeUserById(id);
        return del;
    }
}