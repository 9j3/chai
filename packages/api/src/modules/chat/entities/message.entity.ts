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

  @Column({ default: false })
  public see: boolean;

  @ManyToOne(() => Conversation)
  @JoinColumn({ name: 'chat_id' })
  public room: Conversation;

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
