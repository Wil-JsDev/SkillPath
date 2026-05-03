import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrganizationEntity } from './organization.entity';
import { SourceDocumentEntity } from './source-document.entity';
import { CourseModuleEntity } from './course-module.entity';
import { EnrollmentEntity } from './enrollment.entity';

export enum CourseStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  READY = 'ready',
  FAILED = 'failed',
}

@Entity('courses')
export class CourseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'org_id', type: 'uuid' })
  orgId!: string;

  @Column({ name: 'source_doc_id', type: 'uuid' })
  sourceDocId!: string;

  @Column({ type: 'varchar' })
  title!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ type: 'varchar', default: CourseStatus.PENDING })
  status!: CourseStatus;

  @Column({ name: 'total_modules', default: 0 })
  totalModules!: number;

  // tsvector GENERATED ALWAYS AS — managed by Postgres, never written by TypeORM
  @Column({ name: 'search_vector', type: 'tsvector', nullable: true, select: false, insert: false, update: false })
  searchVector!: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt!: Date | null;

  @ManyToOne(() => OrganizationEntity, (o) => o.courses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'org_id' })
  organization!: OrganizationEntity;

  @ManyToOne(() => SourceDocumentEntity, (d) => d.courses)
  @JoinColumn({ name: 'source_doc_id' })
  sourceDocument!: SourceDocumentEntity;

  @OneToMany(() => CourseModuleEntity, (m) => m.course)
  modules!: CourseModuleEntity[];

  @OneToMany(() => EnrollmentEntity, (e) => e.course)
  enrollments!: EnrollmentEntity[];
}
