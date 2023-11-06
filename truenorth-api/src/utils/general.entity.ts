import {
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  BaseEntity,
} from "typeorm";

export abstract class GeneralEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({
    type: "timestamptz",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createAt: Date;

  @UpdateDateColumn({
    type: "timestamptz",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
