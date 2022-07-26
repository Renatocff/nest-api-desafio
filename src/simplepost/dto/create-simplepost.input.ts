import { InputType } from "@nestjs/graphql";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateSimplePostInput {

    @IsString()
    @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
    text: string;

    @IsDate()
    @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
    date: Date;

}