import { BeforeInsert, Column, CreateDateColumn, Entity, IsNull, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "./property.entity";
import * as bcrypt from "bcrypt"

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

    @Column({ nullable: true })
    avatarUrl?: string

    @CreateDateColumn() // сразу сгенерирует время при создании
    createdAt: Date

    @Column({ default: "" })
    password: string

    @OneToMany(() => Property, (property) => property.user)
    properties: Property[]

    @ManyToMany(() => Property, (property) => property.likedBy)
    @JoinTable({ name: "user_liked_properties" }) // объединяет данные в таблицу которую мы называем user_liked_properties
    likedProperties: Property[]

    @BeforeInsert()  // эта функция будет хэшировать пароль с помощью bcrypt перед вставкой в базу данных
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10) // хэшируем пароль. 10 Salt Rounds - это оптимальное число по сложности и производительности шифрования
    }
}