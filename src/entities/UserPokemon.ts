import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("user_pokemon")
export default class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    pokemonId: number;
}
