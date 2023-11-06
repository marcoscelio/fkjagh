import { GeneralEntity } from "src/utils/general.entity";
import { Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne } from "typeorm";


export enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive"
}

@Entity()
export class User extends GeneralEntity {
    @Column()
    username: string;

    @Column()
    password: string;

    @Column({ enum: UserStatus, default: UserStatus.ACTIVE })
    status: string;

    @Column('numeric', {
        precision: 12,
        scale: 2,
        default: 1000
    })
    balance: number;

}
