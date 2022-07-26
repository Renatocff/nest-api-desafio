import { InputType } from "@nestjs/graphql";
import { IsDate, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, } from "class-validator";

@InputType()
export class UpdateSimplePostInput {

    @IsString()
    @MinLength(3, { message: 'Campo text precisa ter no mínimo seis caracteres' })
    @MaxLength(250, { message: 'Campo textpode ter no máximo 250 caracteres' })
    @IsOptional()
    @IsNotEmpty({ message: 'Campo text não pode ser vazio.' })
    text?: string;

    @IsDate()
    @IsOptional()
    @IsNotEmpty({ message: 'Campo date não pode ser vazio.' })
    date?: Date;
}