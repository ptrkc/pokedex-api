import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity("pokemons")
export default class Pokemon {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    number: number;

    @Column()
    image: string;

    @Column()
    weight: number;

    @Column()
    height: number;

    @Column()
    baseExp: number;

    @Column()
    description: string;

    @Column({ default: false })
    inMyPokemons: boolean;
}
