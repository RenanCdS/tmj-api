import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/shared/models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    findOne(id: string): Promise<User> {
        return this.userRepository.findOne(id);
    }

    async add(user: User): Promise<any> {
        await this.userRepository.insert(user);
    }

    async remove(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}
