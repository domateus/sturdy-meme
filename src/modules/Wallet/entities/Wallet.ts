import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import CommercialInfo from "../../User/entities/CommercialInfo";

@Entity("wallets")
export default class Wallet {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  balance: number;

  @OneToOne(() => CommercialInfo, (commercialInfo) => commercialInfo.user)
  commercialInfo: CommercialInfo;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
