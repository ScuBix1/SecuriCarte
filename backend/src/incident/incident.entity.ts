import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Incident {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  location: string;

  @Column()
  description: string;

  @Column()
  date: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'uuid' })
  user_id: string;
}
