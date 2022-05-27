import {Entity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity("ticket")
export default class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  owner: string;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}