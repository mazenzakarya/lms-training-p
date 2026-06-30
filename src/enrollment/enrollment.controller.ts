import { Controller, Get, Post, Body, Req, Param, Delete, Patch } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';

@Controller('enrollment')
export class EnrollmentController {
    constructor(private readonly enrollmentService: EnrollmentService) { }

    @Post('/courses/:id/enroll')
    public async addEnrollment(@Param('id') courseId: string, @Req() req) {
        return await this.enrollmentService.enroll({ userId: req.user.userId, courseId: courseId });
    }

    @Get('/courses/my')
    public async myCourses(@Req() req) {
        return this.enrollmentService.getMyCourses(req.user.userId)
    }

    @Delete(':id')
    public async deleteEnrollment(id: string) {
        return await this.enrollmentService.deleteCourseFromUser(id)
    }

    @Patch()
    public async editEnrolledCourse(eid: string, cid: string) {
        return await this.enrollmentService.editEnrollment(eid, cid)
    }

    @Get('/courses/lessons')
    public async getMyCoursesLessons(@Req() req) {
        return await this.enrollmentService.getMyCourseLessons(req.user.userId);

    }
}
