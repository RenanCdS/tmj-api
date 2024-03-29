import { UserService } from '../service/user/user.service';
import { CreateUserRequestDto } from '../shared/requests/create-user-request.dto';
import { Response } from 'express';
import { User } from '../shared/models/user.entity';
import { ConfirmAddressRequestDto } from '../shared/requests/confirm-address-request.dto';
import { EditUserInfoRequestDto } from '../shared/requests/edit-user-info-request.dto';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UserService);
    getAll(): Promise<User[]>;
    preRegisterUser(createUserRequestDto: CreateUserRequestDto, response: Response): Promise<Response<any, Record<string, any>>>;
    confirmUserEmail(params: any, response: Response): Promise<Response<any, Record<string, any>>>;
    confirmUserAddress(request: any, confirmAddressRequestDto: ConfirmAddressRequestDto, params: any, response: Response): Promise<Response<any, Record<string, any>>>;
    editUserInfo(editUserInfoRequestDto: EditUserInfoRequestDto, params: any, response: Response): Promise<void>;
    private mapUserDtoToEntity;
}
