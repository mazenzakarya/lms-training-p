import { Module } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentController } from './enrollment.controller';
import { EnrollmentRepository } from './enrollment.repo';
import { MongooseModule } from '@nestjs/mongoose';
import { Enrollment, EnrollmentSchmea } from './enrollment.model';
import { CourseModule } from '../course/course.module';

@Module({
  providers: [EnrollmentService, EnrollmentRepository],
  imports: [MongooseModule.forFeature([{ name: Enrollment.name, schema: EnrollmentSchmea }]), CourseModule],
  controllers: [EnrollmentController]
})
export class EnrollmentModule { }
