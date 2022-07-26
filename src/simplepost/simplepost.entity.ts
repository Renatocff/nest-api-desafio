import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity({ name: "simplepost" })
export class SimplePost {

    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Generated("uuid")
    @Column({ unique: true, type: 'uuid' })
    guid: string;

    @Column()
    text!: string;

    @Column({ type: 'timestamp' })
    date!: Date;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

}