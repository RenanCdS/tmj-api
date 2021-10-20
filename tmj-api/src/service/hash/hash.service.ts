import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { HashType } from '../../shared/enum';
import { Hash } from '../../shared/models/hash.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HashService {

    constructor(
        @InjectRepository(Hash)
        private readonly hashRepository: Repository<Hash>) {
    }


    generateHash(): string {
        var current_date = (new Date()).valueOf().toString();
        var random = Math.random().toString();
        return crypto.createHash('sha1').update(current_date + random).digest('hex');
    }

    async saveHash(hash: Hash): Promise<void> {

        try {
            await this.hashRepository.insert(hash);
        }
        catch {
            return Promise.reject();
        }
    }

    async findHash(hash: string) {
        const userHash = await this.hashRepository.findOne({
            where: [
                { hash: hash },
                { isActive: true },
            ],
            order: {
                expiration: 'DESC'
            },
            relations: ['user']
        });

        return userHash;
    }

    async invalidateHash(hash: Hash) {
        hash.expiration = new Date();
        await this.hashRepository.save(hash);
    }

    async findLatestHashByUserId(userId: number, hash: string, hashType: HashType = HashType.PASSWORD_RESET) {
        const userHash = await this.hashRepository.findOne({
            where: [
                { hash: hash },
                { isActive: true },
                { userId: userId },
                { hashType: hashType }
            ],
            order: {
                expiration: 'DESC'
            }
        });

        return userHash;
    }

    async findLatestHashByEmail(email: string, hash: string, hashType: HashType = HashType.PASSWORD_RESET) {
        const userHash = await this.hashRepository.findOne({
            where: [
                { hash: hash },
                { isActive: true },
                { email },
                { hashType }
            ],
            order: {
                expiration: 'DESC'
            }
        });

        return userHash;
    }
}
