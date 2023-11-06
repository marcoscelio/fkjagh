import { GeneralEntity } from "src/utils/general.entity";
import { Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne } from "typeorm";


export enum OperationType {
    ADDITION = "addition", SUBTRACTION = "subtraction", MULTIPLICATION = "multiplication",
    DIVISION = "division", SQUARE_ROOT = "square_root", RANDOM_STRING = "random_string"
}

@Entity()
export class Operation extends GeneralEntity {
    @Column({ enum: OperationType })
    type: string;

    @Column('numeric', {
        precision: 7,
        scale: 2,
    })
    cost: number;
}
