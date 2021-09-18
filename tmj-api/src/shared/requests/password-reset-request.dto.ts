import { ApiProperty } from "@nestjs/swagger";

export class PasswordResetRequestDto {
    @ApiProperty()
    email: string;
}