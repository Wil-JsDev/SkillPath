import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrganizationEntity } from './organization.entity';
import { SourceDocumentEntity } from './source-document.entity';

@Entity('document_chunks')
export class DocumentChunkEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'org_id', type: 'uuid' })
  orgId!: string;

  @Column({ name: 'doc_id', type: 'uuid' })
  docId!: string;

  @Column({ name: 'chunk_index' })
  chunkIndex!: number;

  @Column({ type: 'text' })
  content!: string;

  // vector(1536) — pgvector type, managed by migration. Raw queries via QueryBuilder.
  @Column({ type: 'text', nullable: true, select: false })
  embedding!: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ManyToOne(() => OrganizationEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'org_id' })
  organization!: OrganizationEntity;

  @ManyToOne(() => SourceDocumentEntity, (d) => d.chunks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'doc_id' })
  sourceDocument!: SourceDocumentEntity;
}
