import { Field, ID, ObjectType, Root } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity{
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({default: ""})
    firstName: string;

    @Field()
    @Column({default: ""})
    lastName: string;
    
    @Field()
    @Column("text", {unique: true})
    username: string;
    
    @Field()
    @Column("text", {unique: true})
    email: string;
    
    @Field()
    name(@Root() parent: User): string{
        return parent.firstName+" "+parent.lastName;
    }

    @Column()
    password: string;
}