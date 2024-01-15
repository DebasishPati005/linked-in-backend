import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity('feed_post')
export class FeedEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  body: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToOne(() => UserEntity, (user) => user.feedPosts)
  author: UserEntity;
}
