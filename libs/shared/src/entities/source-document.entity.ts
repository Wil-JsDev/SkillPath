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
import { UserEntity } from './user.entity';
import { DocumentChunkEntity } from './document-chunk.entity';
import { CourseEntity } from './course.entity';

export enum DocumentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  READY = 'ready',
  FAILED = 'failed',
}

export enum DocumentMimeType {
  PDF = 'application/pdf',
  DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  HTML = 'text/html',
}

@Entity('source_documents')
export class SourceDocumentEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'org_id', type: 'uuid' })
  orgId!: string;

  @Column({ name: 'uploaded_by', type: 'uuid' })
  uploadedBy!: string;

  @Column({ type: 'varchar' })
  title!: string;

  @Column({ name: 's3_key', type: 'varchar' })
  s3Key!: string;

  @Column({ name: 'mime_type', type: 'varchar' })
  mimeType!: DocumentMimeType;

  @Column({ type: 'varchar', default: DocumentStatus.PENDING })
  status!: DocumentStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt!: Date | null;

  @ManyToOne(() => OrganizationEntity, (o) => o.sourceDocuments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'org_id' })
  organization!: OrganizationEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'uploaded_by' })
  uploader!: UserEntity;

  @OneToMany(() => DocumentChunkEntity, (c) => c.sourceDocument)
  chunks!: DocumentChunkEntity[];

  @OneToMany(() => CourseEntity, (c) => c.sourceDocument)
  courses!: CourseEntity[];
}
