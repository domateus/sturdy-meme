import { Expose } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Ticket from "../../Ticket/entities/Ticket";
import User from "../../User/entities/User";

@Entity("events")
export default class Event {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  date!: Date;

  @Column()
  location!: string;

  @Column()
  logo?: string;

  @ManyToOne(() => User)
  promoter!: User;

  @OneToMany(() => Ticket, (ticket) => ticket.event)
  tickets!: Ticket[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @Expose({ name: "logo_url" })
  getLogoUrl(): string | null {
    return this.logo ? `${process.env.APP_API_URL}/files/${this.logo}` : null;
  }
}
