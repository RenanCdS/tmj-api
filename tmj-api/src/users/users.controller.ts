import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Put, Res, Request, UseGuards } from '@nestjs/common';
import { UserService } from 'src/service/user/user.service';
import { CreateUserRequestDto } from 'src/shared/requests/create-user-request.dto';
import { Response } from 'express';
import { ErrorCodes, ErrorMessages, Genre, Role } from 'src/shared/enum';
import { User } from 'src/shared/models/user.entity';
import { ErrorResponseDto } from 'src/shared/responses/error-response.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ConfirmAddressRequestDto } from 'src/shared/requests/confirm-address-request.dto';
import { EditUserInfoRequestDto } from 'src/shared/requests/edit-user-info-request.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('users')
@Controller('v1/users')
export class UsersController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async getAll() {
    return await this.userService.findAll();
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Realiza o pré-registro do usuário, ou seja, usuário será criado com status de pendência de e-mail'
  })
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
  @ApiParam({
    name: 'userId'
  })
  @ApiParam({
    name: 'hash'
  })
  @ApiOkResponse({
    description: 'Realiza a confirmação de e-mail'
  })
  async confirmUserEmail(@Param() params, @Res() response: Response) {
    try {
      await this.userService.confirmUserEmail(params.hash, params.userId);

      return response.status(HttpStatus.OK).json();
    }
    catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json(err);
    }
  }

  @Patch('address')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Realiza o cadastro de endereço do usuário'
  })
  async confirmUserAddress(@Request() request, @Body() confirmAddressRequestDto: ConfirmAddressRequestDto, @Param() params, @Res() response: Response) {
    try {
      const userInfo = request.user;
      await this.userService.confirUserAddress(userInfo.userId, confirmAddressRequestDto);

      return response.status(HttpStatus.OK).json();
    } catch (err) {
      if (err instanceof ErrorResponseDto)
        return response.status(err.statusCode).json(err);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json();
    }
  }

  @Put()
  @ApiOkResponse({
    description: 'Edita as informações do usuário'
  })
  async editUserInfo(@Body() editUserInfoRequestDto: EditUserInfoRequestDto, @Param() params, @Res() response: Response) {
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
    user.birthDate = createUserRequestDto.birthDate;

    return user;
  }
}
