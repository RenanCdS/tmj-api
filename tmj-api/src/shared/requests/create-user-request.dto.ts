import { ApiProperty } from '@nestjs/swagger';
import { Genre, Role } from '../enum';

export class CreateUserRequestDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  cpf: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  role: Role = Role.CLIENT;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  genre: Genre;
  @ApiProperty()
  birthDate: Date;
}
