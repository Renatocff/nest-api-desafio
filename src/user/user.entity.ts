import { Field, HideField, ID, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { hashPasswordTransformer } from "../commons/helpers/crypto";

@ObjectType()
@Entity({ name: "user" })
export class User {

    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Column({ unique: true })
    usuario!: string;

    @Column({
        transformer: hashPasswordTransformer
    })
    @HideField()
    senha!: string;

    @Column({ default: true })
    ativo?: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

}