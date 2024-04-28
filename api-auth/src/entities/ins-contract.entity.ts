import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { InsRequest } from './ins-requests.entity';

@Entity('ins-contracts')
export class InsContract {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  client: string;

  @Column()
  form: string;

  @Column()
  details: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => InsRequest, (insRequest) => insRequest.insContract)
  insRequests: InsRequest[];
}
