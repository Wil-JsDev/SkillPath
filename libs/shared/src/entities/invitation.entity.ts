import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrganizationEntity } from './organization.entity';

export enum InvitationRole {
  ADMIN = 'admin',
  MEMBER = 'member',
}

@Entity('invitations')
export class InvitationEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'org_id', type: 'uuid' })
  orgId!: string;

  @Column({ type: 'varchar' })
  email!: string;

  @Column({ type: 'varchar', unique: true })
  token!: string;

  @Column({ type: 'varchar', default: InvitationRole.MEMBER })
  role!: InvitationRole;

  @Column({ name: 'expires_at', type: 'timestamptz' })
  expiresAt!: Date;

  @Column({ default: false })
  accepted!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ManyToOne(() => OrganizationEntity, (o) => o.invitations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'org_id' })
  organization!: OrganizationEntity;
}
