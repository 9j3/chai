import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Participant } from '../../chat/entities/participant.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('uuid')
  @Generated('uuid')
  public guid: string;

  @Column('varchar', { length: 24, unique: true })
  public username: string;

  @Column('varchar', { length: 64 })
  public email: string;

  @Column('varchar', { length: 96 })
  public password: string;

  @Column('boolean')
  public isOnline: boolean;

  @OneToMany(() => Participant, (participant) => participant.user)
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
