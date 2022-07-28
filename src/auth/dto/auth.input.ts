
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AuthInput {
    @Field()
    usuario: string;
    @Field()
    senha: string;
}