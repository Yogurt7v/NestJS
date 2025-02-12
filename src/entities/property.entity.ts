import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PropertyFeature } from "./propertyFeatures.entity";

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

    @OneToOne(() => PropertyFeature,
        (propertyFeature) => propertyFeature.property,
        {
            cascade: ['update']
        })
    propertyFeature: PropertyFeature
}