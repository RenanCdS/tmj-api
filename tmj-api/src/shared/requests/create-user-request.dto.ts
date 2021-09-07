import { Role } from '../enum';

export class CreateUserRequestDto {
  name: string;
  cpf: string;
  phone: string;
  role: Role = Role.CLIENT;
  email: string;
  password: string;
}
