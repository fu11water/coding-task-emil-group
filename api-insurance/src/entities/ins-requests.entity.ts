import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { InsContract } from './ins-contract.entity';
import { User } from './users.entity';

@Entity('ins-requests')
export class InsRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  client: string;

  @Column()
  amount: number;

  @Column()
  reason: string;

  @Column()
  details: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => InsContract, (insContract) => insContract.insRequests)
  insContract: InsContract;

  @ManyToOne(() => User, (user) => user.insRequests)
  user: User;
}
