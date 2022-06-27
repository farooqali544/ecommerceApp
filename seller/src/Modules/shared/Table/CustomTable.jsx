import React, { useState } from "react";
import styles from "./CustomTable.module.css";
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { ReactComponent as SortIcon } from "../../../asset/svg/sortIcon.svg";

import avatarImage from "../../../asset/images/avatar.png";
import axios from "axios";

const AvatarColumn = ({ columnName, photo }) => {
  return (
    <div className={styles.avatar}>
      <img src={photo ? photo : avatarImage} />
      <span>{columnName}</span>
    </div>
  );
};

const VerifyColumn = ({ row, columnName }) => {
  if (row[columnName] == 1) return <button className={styles.verifyButton}>Verified</button>;

  return <button className={styles.refuteButton}>Pending</button>;
};

// For ORDERS , 0=Pending, 1=Completed, 2 = Canceled,
const OrderStatus = ({ row, columnName }) => {
  if (row[columnName] == 0) return <button className={styles.refuteButton}>Pending</button>;

  if (row[columnName] == 1) return <button className={styles.verifyButton}>Completed</button>;

  return <button className={styles.canceledButton}>Canceled</button>;
};

const ColumnData = ({ avatarColumnName, columnName, row, verifyButton, photo, colorColumn, orderColumn }) => {
  if (avatarColumnName && avatarColumnName === columnName) return <AvatarColumn photo={row[photo]} columnName={row[columnName]} />;

  if (verifyButton === columnName) return <VerifyColumn row={row} columnName={columnName} />;

  if (orderColumn === columnName) return <OrderStatus row={row} columnName={columnName} />;

  if (colorColumn === columnName) return <span className={styles.colorColumn} style={{ backgroundColor: row[columnName] }}></span>;

  return row[columnName];
};

const ManageRowCell = ({ row, manage }) => {
  const [status, setStatus] = useState(row.status);

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
  };

  return (
    <TableCell>
      <select value={status} onChange={onChangeStatus}>
        <option value={1}>Completed</option>
        <option value={0}>Pending</option>
        <option value={2}>Canceled</option>
      </select>
      {status != row.status && (
        <>
          <span
            style={{ margin: "0px 10px", cursor: "pointer" }}
            onClick={() => manage.changeStatus && manage.changeStatus(row.order_item_id, status)}
          >
            ✅
          </span>
          <span style={{ cursor: "pointer" }} onClick={() => setStatus(row.status)}>
            ❌
          </span>
        </>
      )}
    </TableCell>
  );
};

function CustomTable({ rows, headers, columns, manage, avatarColumnName, photo, verifyButton, clickableRow, onClickRow, colorColumn, orderColumn }) {
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
      <TableContainer className={styles.table} sx={{ maxHeight: 440 }}>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((name) => (
                <TableCell key={name}>
                  <span className={styles.headColumn}>{name}</span>
                </TableCell>
              ))}

              {manage && <TableCell>Change Status</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody className={clickableRow ? `${styles.clickableBody} ${styles.tableBody}` : styles.tableBody}>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index} onClick={() => clickableRow && onClickRow(row[clickableRow.itemId])}>
                {columns.map((columnName) => (
                  <TableCell key={columnName}>
                    <ColumnData
                      row={row}
                      columnName={columnName}
                      avatarColumnName={avatarColumnName}
                      verifyButton={verifyButton}
                      photo={photo}
                      colorColumn={colorColumn}
                      orderColumn={orderColumn}
                    />
                  </TableCell>
                ))}

                {manage && <ManageRowCell row={row} manage={manage} />}
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
