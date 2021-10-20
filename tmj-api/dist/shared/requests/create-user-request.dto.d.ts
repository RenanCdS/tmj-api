import { Genre, Role } from '../enum';
export declare class CreateUserRequestDto {
    name: string;
    cpf: string;
    phone: string;
    role: Role;
    email: string;
    password: string;
    genre: Genre;
    birthDate: Date;
}
