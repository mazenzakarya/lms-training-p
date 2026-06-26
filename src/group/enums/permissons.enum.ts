export enum Permissions {
    //users
    UserCreate = 'user@create',
    UserRead = 'user@read',
    UserUpdate = 'user@update',
    UserDelete = 'user@delete',

    // groups
    GroupCreate = 'group@create',
    GroupRead = 'group@read',
    GroupUpdate = 'group@update',
    GroupDelete = 'group@delete',

    // courses
    CourseCreate = 'course@create',
    CourseRead = 'course@read',
    CourseUpdate = 'course@update',
    CourseDelete = 'course@delete',

    // lessons
    LessonCreate = 'lesson@create',
    LessonRead = 'lesson@read',
    LessonUpdate = 'lesson@update',
    LessonDelete = 'lesson@delete',

    // enrollments
    EnrollmentCreate = 'enrollment@create',
    EnrollmentRead = 'enrollment@read',
    EnrollmentUpdate = 'enrollment@update',
    EnrollmentDelete = 'enrollment@delete',
}