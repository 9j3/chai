import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { Participant } from './participant.entity';

@Entity({
  name: 'conversation',
})
export class Conversation extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'creator_id' })
  public creator: User;

  @OneToMany(() => Participant, (participant) => participant.conversation)
  participants: Participant[];

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
