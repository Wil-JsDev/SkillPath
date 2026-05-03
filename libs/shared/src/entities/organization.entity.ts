import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SubscriptionEntity } from './subscription.entity';
import { UserEntity } from './user.entity';
import { InvitationEntity } from './invitation.entity';
import { SourceDocumentEntity } from './source-document.entity';
import { CourseEntity } from './course.entity';

export enum OrganizationPlan {
  STARTER = 'starter',
  GROWTH = 'growth',
  ENTERPRISE = 'enterprise',
}

@Entity('organizations')
export class OrganizationEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'varchar', unique: true })
  slug!: string;

  @Column({ type: 'varchar', default: OrganizationPlan.STARTER })
  plan!: OrganizationPlan;

  @Column({ name: 'stripe_customer_id', type: 'varchar', nullable: true })
  stripeCustomerId!: string | null;

  @Column({ name: 'seat_limit', default: 25 })
  seatLimit!: number;

  @Column({ name: 'is_active', default: true })
  isActive!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt!: Date | null;

  @OneToMany(() => SubscriptionEntity, (s) => s.organization)
  subscriptions!: SubscriptionEntity[];

  @OneToMany(() => UserEntity, (u) => u.organization)
  users!: UserEntity[];

  @OneToMany(() => InvitationEntity, (i) => i.organization)
  invitations!: InvitationEntity[];

  @OneToMany(() => SourceDocumentEntity, (d) => d.organization)
  sourceDocuments!: SourceDocumentEntity[];

  @OneToMany(() => CourseEntity, (c) => c.organization)
  courses!: CourseEntity[];
}
