import { InputType } from "@nestjs/graphql";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, } from "class-validator";

@InputType()
export class UpdateUserInput {

    @IsString()
    @MinLength(6, { message: 'Campo senha precisa ter no mínimo seis caracteres' })
    @MaxLength(150, { message: 'Campo senha precisa ter no máximo 150 caracteres' })
    @IsOptional()
    @IsNotEmpty({ message: 'Campo senha não pode ser vazio.' })
    senha?: string;

    @IsBoolean()
    @IsOptional()
    @IsNotEmpty({ message: 'Campo ativo não pode ser vazio.' })
    ativo?: boolean;
}