import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { QuizEntity } from './quiz.entity';
import { EnrollmentEntity } from './enrollment.entity';

@Entity('quiz_attempts')
export class QuizAttemptEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string;

  @Column({ name: 'quiz_id', type: 'uuid' })
  quizId!: string;

  @Column({ name: 'enrollment_id', type: 'uuid' })
  enrollmentId!: string;

  @Column({ name: 'selected_index' })
  selectedIndex!: number;

  @Column({ name: 'is_correct' })
  isCorrect!: boolean;

  @Column({ name: 'answered_at', type: 'timestamptz', default: () => 'now()' })
  answeredAt!: Date;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @ManyToOne(() => QuizEntity, (q) => q.attempts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'quiz_id' })
  quiz!: QuizEntity;

  @ManyToOne(() => EnrollmentEntity, (e) => e.quizAttempts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'enrollment_id' })
  enrollment!: EnrollmentEntity;
}
