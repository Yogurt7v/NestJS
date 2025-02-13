import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

    @ManyToMany(() => Property, (property) => property.likedBy)
    @JoinTable({ name: "user_liked_properties" }) // объединяет данные в таблицу которую мы называем user_liked_properties
    likedProperties: Property[]
}