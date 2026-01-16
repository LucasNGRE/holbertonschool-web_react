import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  headerRow: {
    backgroundColor: '#deb5b545'
  },
  row: {
    backgroundColor: '#f5f5f5ab'
  },
  checkbox: {
    marginRight: '10px',
  }
});

export default function CourseListRow({
  isHeader = false,
  textFirstCell = '',
  textSecondCell = null,
  isChecked = false,
  onChangeRow = null,
  id = null
}) {
  const rowStyle = isHeader ? styles.headerRow : styles.row;

  return isHeader ? (
    <tr className={css(rowStyle)}>
      <th colSpan={textSecondCell ? 1 : 2}>{textFirstCell}</th>
      {textSecondCell ? <th>{textSecondCell}</th> : null}
    </tr>
  ) : (
    <tr className={css(rowStyle)}>
      <td>
        {/* Checkbox dans la même cellule que le nom du cours */}
        <input
          type="checkbox"
          className={css(styles.checkbox)}
          checked={isChecked}
          onChange={(e) => onChangeRow && onChangeRow(id, e.target.checked)}
        />
        {textFirstCell}
      </td>
      <td>{textSecondCell}</td>
    </tr>
  );
}
