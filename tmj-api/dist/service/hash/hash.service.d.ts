import { HashType } from 'src/shared/enum';
import { Hash } from 'src/shared/models/hash.entity';
import { Repository } from 'typeorm';
export declare class HashService {
    private readonly hashRepository;
    constructor(hashRepository: Repository<Hash>);
    generateHash(): string;
    saveHash(hash: Hash): Promise<void>;
    findHash(hash: string): Promise<Hash>;
    invalidateHash(hash: Hash): Promise<void>;
    findLatestHashByUserId(userId: number, hash: string, hashType?: HashType): Promise<Hash>;
    findLatestHashByEmail(email: string, hash: string, hashType?: HashType): Promise<Hash>;
}
