import { ApiProperty } from "@nestjs/swagger";

export class EditUserInfoRequestDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    birthDate: Date;
}