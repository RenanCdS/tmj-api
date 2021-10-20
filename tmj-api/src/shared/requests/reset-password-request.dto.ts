import { ApiProperty } from "@nestjs/swagger";

export class ResetPasswordRequestDto {
    @ApiProperty()
    password: string;
    @ApiProperty({
        description: 'Hash que é enviada por e-mail para o usuário',
    })
    hash: string;
}