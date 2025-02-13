import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PropertyFeature } from "./propertyFeatures.entity";
import { User } from "./user.entity";

@Entity()
export class Property {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column({ default: 0 })
    price: number

    @OneToOne(() => PropertyFeature, // связь один к одному с propertyFeature
        (propertyFeature) => propertyFeature.property,
        {
            cascade: ['update']
        })
    propertyFeature: PropertyFeature

    @ManyToOne(() => User, (user) => user.properties)
    @JoinColumn({ name: "ownerId" }) // переименование столбца в ownerId
    user: User

    @ManyToMany(() => User, (user) => user.likedProperties)
    likedBy: User[]
}