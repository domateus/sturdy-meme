import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Transaction from "./Transaction";

@Entity("transaction_item")
export default class Item {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  item: string;

  @Column()
  entity: string;

  @ManyToOne(() => Transaction)
  transaction: Transaction;
}
