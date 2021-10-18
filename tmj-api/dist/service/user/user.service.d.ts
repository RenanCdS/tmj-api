import { User } from 'src/shared/models/user.entity';
import { Repository } from 'typeorm';
import { HashService } from '../hash/hash.service';
import { ConfirmAddressRequestDto } from 'src/shared/requests/confirm-address-request.dto';
import { Address } from 'src/shared/models/address.entity';
import { UserAddress } from 'src/shared/models/user.address.entity';
export declare class UserService {
    private readonly hashService;
    private userRepository;
    private userAddressRepository;
    private addressRepository;
    constructor(hashService: HashService, userRepository: Repository<User>, userAddressRepository: Repository<UserAddress>, addressRepository: Repository<Address>);
    findAll(): Promise<User[]>;
    getUserByEmail(email: string): Promise<User>;
    confirUserAddress(userId: number, confirmAddressDto: ConfirmAddressRequestDto): Promise<void>;
    confirmUserEmail(hash: string, userId: number): Promise<void>;
    preRegisterUserAsync(user: User): Promise<any>;
    generatePassword(password: string, salt: string): Promise<string>;
    updateUser(user: User): Promise<void>;
    remove(id: string): Promise<void>;
    private sendConfirmationEmail;
    private getSalt;
    private hash;
}
