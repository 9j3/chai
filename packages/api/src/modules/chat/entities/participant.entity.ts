import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity({
  name: 'participant',
})
export class Participant extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('uuid')
  @Generated('uuid')
  public guid: string;

  @ManyToOne(() => User, (user) => user.participants)
  @JoinColumn()
  public user: User;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;
}
