import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Wallet from "../../Wallet/entities/Wallet";
import User from "./User";

@Entity("commercial_infos")
export default class CommercialInfo {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  type!: string;

  @OneToOne(() => User, (user) => user.commercialInfo)
  user!: User;

  @OneToOne(() => Wallet, (wallet) => wallet.commercialInfo)
  wallet?: Wallet;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
