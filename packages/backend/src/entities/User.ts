/* eslint-disable import/no-cycle */
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { ParentEntity } from './Base.entity';
import { Todo } from './Todo';

@Entity('User')
export class User extends ParentEntity {
  @Index()
  @Column({ unique: true })
  email: string;

  @Column({ default: false })
  confirmed: boolean;

  @Column()
  password: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
