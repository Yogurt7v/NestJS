import { BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

    @Column()
    password: string

    @OneToMany(() => Property, (property) => property.user)
    properties: Property[]

    @ManyToMany(() => Property, (property) => property.likedBy)
    @JoinTable({ name: "user_liked_properties" }) // объединяет данные в таблицу которую мы называем user_liked_properties
    likedProperties: Property[]

    @BeforeInsert()  // эта функция будет хэшировать пароль с помощью bcrypt перед вставкой в базу данных
    hashPassword() {

    }
}