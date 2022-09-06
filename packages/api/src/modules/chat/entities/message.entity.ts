import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { Conversation } from './conversation.entity';

@Entity({
  name: 'message',
})
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @Generated('uuid')
  public guid: string;

  @Column()
  public content: string;

  @Column('timestamp')
  public dateRead: Date;

  @ManyToOne(() => Conversation)
  @JoinColumn({ name: 'conversation_id' })
  public room: Conversation;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'sender_id' })
  public sender: User;

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
