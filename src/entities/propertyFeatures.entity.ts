import { Entity, Column } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";

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

    @Column()
    propertyId: number

}