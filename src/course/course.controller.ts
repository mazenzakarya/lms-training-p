import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Req } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './Dtos/createCourse.dto';
import { RequirePermissions } from '../permissions/decorators/permissions.decorator';
import { Permissions } from '../group/enums/permissons.enum';
import { Public } from '../generic/public/public.decorator';
import { UpdateCourseDto } from './Dtos/updateCourse.dto';

@Controller('course')
@Public()

export class CourseController {
    constructor(private readonly courseService: CourseService) { }
    //add new course permission and change this permission
    @RequirePermissions(Permissions.UserCreate)
    @Post()
    public async addNewCourse(@Body() dto: CreateCourseDto, @Req() req: Request) {
        return await this.courseService.addNewCourse({ ...dto, instructorId: (req as any).user.userId })
    }
    //get all courses without pagination
    @Get()
    public async getAllCourses() {
        return this.courseService.getAllCourses()
    }

    //update course
    @Put(':id')
    public async updateCourse(@Body() dto: UpdateCourseDto, @Param('id') id: string) {
        return await this.courseService.updateCourse(dto, id)
    }

    //delete course
    @Delete(':id')
    public async deleteCourse(@Param('id') id: string) {
        await this.courseService.deleteCourse(id)
        return { message: 'Course successfully deleted' };
    }

}
