import CourseListRow from './CourseListRow/CourseListRow';
import { StyleSheet, css } from 'aphrodite';
import WithLogging from '../../components/HOC/WithLogging';
import { useDispatch, useSelector } from 'react-redux';
import { selectCourse, unSelectCourse } from '../../features/courses/coursesSlice';

const styles = StyleSheet.create({
  courses: {
    margin: '130px auto',
    width: '90%',
    height: '33vh'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    border: '2px solid rgb(161, 161, 161)',
    ':nth-child(1n) th': {
      border: '2px solid rgb(161, 161, 161)'
    },
    ':nth-child(1n) tr': {
      border: '2px solid rgb(161, 161, 161)'
    },
    ':nth-child(1n) td': {
      border: '2px solid rgb(161, 161, 161)'
    }
  }
});

function CourseList() {
  const { courses } = useSelector((state) => state.courses);
  const dispatch = useDispatch();

  const onChangeRow = (id, checked) => {
    if (checked) dispatch(selectCourse(id));
    else dispatch(unSelectCourse(id));
  };

  return (
    <div className={css(styles.courses)}>
      <table id="CourseList" className={css(styles.table)}>
        <thead>
          <CourseListRow textFirstCell="Available courses" isHeader={true} />
          <CourseListRow textFirstCell="Course name" textSecondCell="Credit" isHeader={true} />
        </thead>
        <tbody>
          {courses.length > 0 ? (
            courses.map((course) => (
              <CourseListRow
                key={course.id}
                id={course.id}
                textFirstCell={course.name}
                textSecondCell={course.credit}
                isChecked={course.isSelected}
                onChangeRow={onChangeRow}
              />
            ))
          ) : (
            <CourseListRow textFirstCell="No course available yet" isHeader={true} />
          )}
        </tbody>
      </table>
    </div>
  );
}

export default WithLogging(CourseList);
