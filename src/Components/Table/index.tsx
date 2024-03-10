import { TableProps } from "./types";
import styles from "./styles.module.scss";

const Table = <T,>({ data, columns, title, children }: TableProps<T>) => {
  return (
    <table className={styles.table}>
      {title && <caption className={styles.title}>{title}</caption>}
      <thead>
        <tr className={styles["tr-thead"]}>
          <td colSpan={4} className={styles.td}>
            {children}
          </td>
        </tr>
        <tr>
          {columns.map((column) => (
            <th key={column.title}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => (
          <tr key={i} className={styles.tr}>
            {columns.map((col) => (
              <td key={col.title}>
                {typeof col.value === "function" ? col.value(item) : item[col.value]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
