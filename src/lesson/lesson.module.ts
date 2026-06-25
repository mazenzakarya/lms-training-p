import { Module } from '@nestjs/common';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Lesson, LessonSchema } from './lesson.model';
import { LessonRepository } from './lesson.repo';

@Module({
  controllers: [LessonController],
  providers: [LessonService, LessonRepository],
  imports: [MongooseModule.forFeature([{ name: Lesson.name, schema: LessonSchema }])]
})
export class LessonModule { }
