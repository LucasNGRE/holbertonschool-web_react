namespace Subjects {
    export class Subject {
        teacher: Teacher | null = null;

        setTeacher(teacher: Teacher): void {
            this.teacher = teacher;
        }
    }
}