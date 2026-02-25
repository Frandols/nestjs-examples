import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('access_logs')
export class AccessLogEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  memberId: string;

  @Column()
  membershipId: string;

  @Column({ default: true })
  granted: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
