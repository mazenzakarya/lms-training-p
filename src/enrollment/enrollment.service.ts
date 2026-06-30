import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CoursesRepository } from '../course/course.repo';
import { EnrollmentRepository } from './enrollment.repo';

@Injectable()
export class EnrollmentService {
    constructor(
        private readonly enrollmentRepository: EnrollmentRepository,
        @Inject()
        private readonly coursesRepository: CoursesRepository,
    ) { }

    public async enroll(data: { userId: string; courseId: string }) {
        const { userId, courseId } = data;

        const course = await this.coursesRepository.getCourseById(courseId);

        if (!course) {
            throw new NotFoundException("Course not found");
        }

        const alreadyEnrolled = await this.enrollmentRepository.findOne({ userId, courseId });

        if (alreadyEnrolled) {
            throw new BadRequestException("Already enrolled");
        }

        const addEnrollment = this.enrollmentRepository.create({ userId, courseId })
        return addEnrollment;
    }

    public async getMyCourses(id: string) {
        const userCourses = await this.enrollmentRepository.findMany({ userId: id }).populate("courseId")
        return userCourses;
    }

    // public async getMyCourseLessons(id: string) {
    //     const userCoursesLessons = await this.enrollmentRepository.findMany({ userId: id }).populate('courseId').populate('lessonId')
    //     console.log(userCoursesLessons)
    //     return userCoursesLessons;
    // }

    public async deleteCourseFromUser(id: string) {
        return this.enrollmentRepository.deleteOne(id)
    }

    public async editEnrollment(enrollmentId: string, courseId: string) {
        const enrollment = await this.enrollmentRepository.findOne(enrollmentId)
        if (!enrollment) { throw new BadRequestException("enrollment not found") }
        const exsistCourse = await this.enrollmentRepository.findOne(courseId)
        if (!exsistCourse) { throw new BadRequestException("course not found") }
        enrollment.courseId = courseId
        return await enrollment.save()

    }
    public async getMyCourseLessons(id: string) {
        const enrollments = await this.enrollmentRepository
            .findMany({ userId: id }).populate({ path: 'courseId', populate: { path: 'lessons' } });
        return enrollments
    }

}
