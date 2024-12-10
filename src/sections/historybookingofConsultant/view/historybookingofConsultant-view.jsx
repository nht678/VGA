import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

// import useparam 
import { useParams } from 'react-router-dom';


import Scrollbar from 'src/components/scrollbar';

import { useSelector, useDispatch } from 'react-redux';

import { getReport, actReset } from 'src/store/report/action';

import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import UserTableToolbar from '../user-table-toolbar';

// ----------------------------------------------------------------------

export default function HistoryBookingOfConsultantView() {
  const [page, setPage] = useState(0);

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [error, setErrors] = useState({});

  const dispatch = useDispatch();

  const { reports = [], success, total = 0 } = useSelector((state) => state.reportReducer);
  console.log('reports', reports);
  // use useparam
  const { id } = useParams();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(getReport({ page: newPage + 1, pageSize: rowsPerPage, search: filterName, consultantID: id })); // Cập nhật trang và gọi API
  };
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset về trang đầu tiên khi thay đổi số lượng
    dispatch(getReport({ page: 1, pageSize: newRowsPerPage, search: filterName, consultantID: id })); // Gọi API với `pageSize` mới
  };

  const handleFilterByName = async (event) => {
    const filterValue = event.target.value;
    setFilterName(filterValue);  // Cập nhật tạm thời giá trị tìm kiếm cho input

    if (filterValue.trim()) {
      dispatch(getReport({ page: 1, pageSize: rowsPerPage, search: filterValue, consultantID: id }));
    } else {
      // Gọi lại API khi không có từ khóa tìm kiếm
      dispatch(getReport({ page: 1, pageSize: rowsPerPage, search: filterName, consultantID: id }));
    }
  };

  useEffect(() => {
    dispatch(getReport({ page: page + 1, pageSize: rowsPerPage, search: filterName, consultantID: id }));

  }, [id]);

  return (
    <>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography sx={{ mt: 5, mb: 5 }} variant="h4">Lịch sử đặt lịch của tư vấn viên</Typography>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={0}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ height: 500 }}>
            <Table stickyHeader sx={{ minWidth: 800 }}>
              <UserTableHead
                headLabel={[
                  { id: 'nameconsul', label: 'Tên người tư vấn' },
                  { id: 'namestu', label: 'Tên học sinh', align: 'center' },
                  { id: 'time', label: 'Thời gian', align: 'center' },
                  { id: 'date', label: 'Ngày', align: 'center' },
                  { id: 'note', label: 'Mô tả', align: 'center' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {reports?.map((row, index) => (
                  <UserTableRow
                    key={index}
                    id={row?.id}
                    rowKey={index + 1}
                    consultantName={row?.consultantName}
                    studentName={row?.studentName}
                    startTime={row?.startTime}
                    endTime={row?.endTime}
                    consultationDay={row?.consultationDay}
                    note={row?.note}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 25]}
        />


      </Card>
    </>
  );
}
