import { Operation } from "src/operations/entities/operation.entity";
import { User } from "src/users/entities/user.entity";
import { GeneralEntity } from "src/utils/general.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

export enum OperationResponse {
    SUCCECSS = "success", FAILURE = "failure"
}

@Entity()
export class Record extends GeneralEntity {

    @ManyToOne(() => Operation)
    @JoinColumn()
    operation: Operation;

    @ManyToOne(() => User)
    @JoinColumn()
    user: User;

    @Column()
    operationResponse: string;

    @Column('numeric', {
        precision: 7,
        scale: 2,
        nullable: true
    })
    amount: number;

    @Column('numeric', {
        precision: 7,
        scale: 2,
        nullable: true
    })
    userBalance: number;

    @Column({
        type: "timestamptz",
        nullable: true,
        default: () => "CURRENT_TIMESTAMP",
    })
    date: Date;

    @Column({ default: true })
    isActive: boolean;

}
