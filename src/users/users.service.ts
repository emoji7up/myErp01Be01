import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user-entity/user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

    async getUsers(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async getUser(_id: number): Promise<User[]> {
        return await this.usersRepository.find({
            select: ["fullName", "birthday", "isActive"],
            where: [{ "id": _id }]
        });
    }

    async createUser(user: User): Promise<User> {  
        return this.usersRepository.create(user);
    }

    async updateUser(user: User): Promise<User> {
       return await this.usersRepository.save(user)
    }

    async deleteUser(user: User): Promise<void> {
        await this.usersRepository.delete(user);
    }
}