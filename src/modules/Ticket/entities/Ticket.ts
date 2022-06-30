import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Event from "../../Event/entities/Event";

@Entity("ticket")
export default class Ticket {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  owner!: string;

  @Column()
  status!: string;

  @Column()
  type!: string;

  @Column()
  number!: string;

  @Column()
  price!: number;

  @ManyToOne(() => Event, (event) => event.tickets)
  event!: Event;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
