import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  headerRow: {
    backgroundColor: '#deb5b545'
  },
  row: {
    backgroundColor: '#f5f5f5ab'
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

  if (isHeader) {
    return (
      <tr className={css(rowStyle)}>
        <th>{textFirstCell}</th>
        {textSecondCell && <th>{textSecondCell}</th>}
      </tr>
    );
  }

  return (
    <tr className={css(rowStyle)}>
      <td>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => onChangeRow && onChangeRow(id, e.target.checked)}
        />{' '}
        {textFirstCell}
      </td>
      <td>{textSecondCell}</td>
    </tr>
  );
}
