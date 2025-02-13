import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "./property.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column({ default: "" })
    avatarUrl?: string

    @CreateDateColumn() // сразу сгенерирует время при создании
    createdAt: Date

    @OneToMany(() => Property, (property) => property.user)
    properties: Property[]
}