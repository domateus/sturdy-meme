import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Wallet from "../../Wallet/entities/Wallet";

@Entity("transactions")
export default class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  value: number;

  @Column()
  type: string;

  @ManyToOne(() => Wallet)
  from: Wallet;

  @ManyToOne(() => Wallet)
  to: Wallet;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
