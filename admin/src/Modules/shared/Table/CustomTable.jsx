import React, { useState } from "react";
import styles from "./CustomTable.module.css";
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { ReactComponent as SortIcon } from "../../../asset/svg/sortIcon.svg";

import avatarImage from "../../../asset/images/avatar.png";

const AvatarColumn = ({ columnName }) => {
  return (
    <div className={styles.avatar}>
      <img src={avatarImage} />
      <span>{columnName}</span>
    </div>
  );
};

const VerifyColumn = ({ row, columnName }) => {
  if (row[columnName] == 1) return <button className={styles.verifyButton}>Verified</button>;

  return <button className={styles.refuteButton}>Pending</button>;
};

const ColumnData = ({ avatar, columnName, row, verifyButton }) => {
  if (avatar && avatar === columnName) return <AvatarColumn columnName={row[columnName]} />;

  if (verifyButton === columnName) return <VerifyColumn row={row} columnName={columnName} />;

  return row[columnName];
};

function CustomTable({ rows, headers, columns, avatar, verifyButton }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer className={styles.table}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {headers.map((name) => (
                <TableCell key={name}>
                  <span className={styles.headColumn}>
                    {name} <SortIcon width={13} height={13} />
                  </span>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index}>
                {columns.map((columnName) => (
                  <TableCell key={columnName}>
                    <ColumnData row={row} columnName={columnName} avatar={avatar} verifyButton={verifyButton} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default CustomTable;
