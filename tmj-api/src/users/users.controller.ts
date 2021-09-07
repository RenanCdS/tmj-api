import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { UserService } from 'src/service/user/user.service';
import { CreateUserRequestDto } from 'src/shared/requests/create-user-request.dto';
import { Response } from 'express';
import { Role } from 'src/shared/enum';
import { User } from 'src/shared/models/user.entity';

@Controller('v1/users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async GetAll() {
    return await this.userService.findAll();
  }

  @Post()
  async PreRegisterUser(
    @Body() createUserRequestDto: CreateUserRequestDto,
    @Res() response: Response
  ) {
    if (
      createUserRequestDto === null ||
      createUserRequestDto === undefined ||
      Object.keys(createUserRequestDto).length === 0
    ) {
      return response.status(HttpStatus.BAD_REQUEST).json();
    }

    if (
      createUserRequestDto.role !== Role.CLIENT &&
      createUserRequestDto.role !== Role.PROFESSIONAL
    ) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Attempt of register invalid' });
    }

    const userToCreate = this.mapUserDtoToEntity(createUserRequestDto);

    this.userService.add(userToCreate);

    return response.status(HttpStatus.CREATED).json();
  }

  private mapUserDtoToEntity(createUserRequestDto: CreateUserRequestDto): User {
    const user = new User();

    user.name = createUserRequestDto.name;
    user.email = createUserRequestDto.email;
    user.password = createUserRequestDto.password;
    user.role = createUserRequestDto.role;
    user.cpf = createUserRequestDto.cpf;
    user.phone = createUserRequestDto.phone;

    return user;
  }
}
