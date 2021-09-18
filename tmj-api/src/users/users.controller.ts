import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { UserService } from 'src/service/user/user.service';
import { CreateUserRequestDto } from 'src/shared/requests/create-user-request.dto';
import { Response } from 'express';
import { ErrorCodes, ErrorMessages, Genre, Role } from 'src/shared/enum';
import { User } from 'src/shared/models/user.entity';
import { ErrorResponseDto } from 'src/shared/responses/error-response.dto';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ConfirmAddressRequestDto } from 'src/shared/requests/confirm-address-request.dto';

@ApiTags('users')
@Controller('v1/users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    return await this.userService.findAll();
  }

  @Post()
  async preRegisterUser(
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
      createUserRequestDto.genre !== Genre.MALE &&
      createUserRequestDto.genre !== Genre.FEMALE
    ) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json(new ErrorResponseDto(ErrorCodes.INVALID_GENRE, ErrorMessages.INVALID_GENRE));
    }

    if (
      createUserRequestDto.role !== Role.CLIENT &&
      createUserRequestDto.role !== Role.PROFESSIONAL
    ) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json(new ErrorResponseDto(ErrorCodes.INVALID_ROLE, ErrorMessages.INVALID_ROLE));
    }

    const userToCreate = this.mapUserDtoToEntity(createUserRequestDto);

    try {
      await this.userService.preRegisterUserAsync(userToCreate);
    }
    catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json(err);
    }

    return response.status(HttpStatus.CREATED).json();
  }

  /**@description Confirma o e-mail informado no cadastro */
  @Patch(':userId/:hash')
  async confirmUserEmail(@Param() params, @Res() response: Response)
  {
    try {
      await this.userService.confirmUserEmail(params.hash, params.userId);

      return response.status(HttpStatus.OK).json();
    }
    catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json(err);
    } 
  }

  /** TODO: Pegar Id do usuário pelo token */
  @Patch('address')
  @ApiOkResponse()
  @ApiParam({
    name: 'identifier',
    required: true
  })
  async confirmUserAddress(@Body() confirmAddressRequestDto: ConfirmAddressRequestDto, @Param() params, @Res() response: Response)
  {
  }

  private mapUserDtoToEntity(createUserRequestDto: CreateUserRequestDto): User {
    const user = new User();

    user.name = createUserRequestDto.name;
    user.email = createUserRequestDto.email;
    user.password = createUserRequestDto.password;
    user.role = createUserRequestDto.role;
    user.cpf = createUserRequestDto.cpf;
    user.phone = createUserRequestDto.phone;
    user.genre = createUserRequestDto.genre;

    return user;
  }
}
