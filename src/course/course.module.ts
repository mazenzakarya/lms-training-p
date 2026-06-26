import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { CoursesRepository } from './course.repo';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './course.model';


@Module({
  providers: [CourseService, CoursesRepository],
  controllers: [CourseController],
  imports: [MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }])],
  exports:[CoursesRepository]
})
export class CourseModule {}
