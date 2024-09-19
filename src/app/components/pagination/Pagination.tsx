'use server';
import styles from './Pagination.module.css';
import Link from 'next/link';

function Pagination({
  totalPages,
  itemsPerPage,
  currentOffset,
  location,
//   searchParams,
}: {
  totalPages: number;
  itemsPerPage: number;
  currentOffset: number;
  location: string;
//   searchParams: URLSearchParams;
}) {
  return (
    <div className={styles.pagination}>
      {Array.from({ length: totalPages }, (_, index) => {
        const offset = index * itemsPerPage;
        const isActive = offset === currentOffset;

        let query = '';

      //   searchParams.delete('offset');

      //   if (searchParams.toString().length) {
      //       query += searchParams.toString();
      //       query += '&'
      //   }

        query += `offset=${offset}`

        return (
          <Link
            key={index}
            href={`${location}/?${query}`}
            passHref
            className={
              isActive
                ? `${styles.pageButton} ${styles.activePageButton}`
                : styles.pageButton
            }
          >
            {index + 1}
          </Link>
        );
      })}
    </div>
  );
}

export default Pagination;
