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
import { CourseModuleEntity } from './course-module.entity';
import { QuizAttemptEntity } from './quiz-attempt.entity';

@Entity('quizzes')
export class QuizEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'module_id', type: 'uuid' })
  moduleId!: string;

  @Column({ type: 'text' })
  question!: string;

  // ['option A', 'option B', 'option C', 'option D']
  @Column({ type: 'jsonb' })
  options!: string[];

  @Column({ name: 'correct_index' })
  correctIndex!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt!: Date | null;

  @ManyToOne(() => CourseModuleEntity, (m) => m.quizzes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'module_id' })
  module!: CourseModuleEntity;

  @OneToMany(() => QuizAttemptEntity, (a) => a.quiz)
  attempts!: QuizAttemptEntity[];
}
