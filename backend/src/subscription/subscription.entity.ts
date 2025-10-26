import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'subscriptions' })
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  stripe_subscription_id: string;

  @Column({ type: 'varchar', length: 50 })
  status: string;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date', nullable: true })
  end_date: Date;

  @Column({ type: 'uuid' })
  user_id: string;
}
