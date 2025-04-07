import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "./property.entity";

@Entity()
export class PropertyFeature {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    bedrooms: string;

    @Column()
    bathrooms: string

    @Column({ default: 0 })
    parkinSpots: number;

    @Column()
    area: number;

    @Column()
    hasBalcony: boolean;

    @Column()
    hasGardenYard: boolean;

    @Column()
    hasSwimmingPool: boolean;

    @OneToOne(() => Property, (property) => property.propertyFeature)
    @JoinColumn()
    property: Property;
}