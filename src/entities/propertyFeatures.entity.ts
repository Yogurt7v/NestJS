import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";
import { Property } from "./property.entity";

@Entity()
export class PropertyFeature {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    bedroom: number

    @Column()
    bathrooms: number

    @Column()
    parkingSpots: number

    @Column()
    area: number

    @Column()
    hasSwimmingPool: boolean

    @Column()
    hasGardenYard: boolean

    @Column()
    hasBalcony: boolean

    @OneToOne(() => Property, (property) => property.propertyFeature)
    @JoinColumn()
    property: Property

}