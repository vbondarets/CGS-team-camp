/* eslint-disable import/no-cycle */
import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { ParentEntity } from './Base.entity';
import { User } from './User';

@Entity('Todo')
export class Todo extends ParentEntity {
  @Index()
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: true })
  active: boolean;

  @Column({ default: false })
  private: boolean;

  @ManyToOne(() => User, (user) => user.todos)
  user: User;
}
