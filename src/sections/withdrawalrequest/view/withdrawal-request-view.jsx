import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

// import { users } from 'src/_mock/user';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/system/Grid';
import { message } from 'antd';



import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { useSelector, useDispatch } from 'react-redux';

import { getTransaction, createDistributionAsync, resetTransaction } from 'src/store/transaction/action';
import { getWalletbyIdAsync } from 'src/store/wallet/action';

import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import UserTableToolbar from '../user-table-toolbar';


// ----------------------------------------------------------------------

export default function WithdrawalRequestView() {
  const [page, setPage] = useState(0);

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [error, setError] = useState({});
  const [goldBalance, setGoldBalance] = useState('');


  const dispatch = useDispatch();

  let accountId = localStorage.getItem('accountId');
  console.log('accountId', accountId);

  const { transactions = [], total = 0, success } = useSelector((state) => state.transactionReducer);
  const { wallet = [] } = useSelector((state) => state.walletReducer);
  console.log('transactions', transactions);

  const [formData, setFormData] = useState({
    accountId: accountId,
    gold: '',
    years: '',
  });

  console.log('formData', formData);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(getTransaction({ page: page + 1, pageSize: rowsPerPage, transactionType: 4 })); // Cập nhật trang và gọi API
  };
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset về trang đầu tiên khi thay đổi số lượng
    dispatch(getTransaction({ page: page + 1, pageSize: rowsPerPage, transactionType: 4 })); // Gọi API với `pageSize` mới
  };


  const [open, setOpen] = useState('');

  const handleClickOpen = (Typedialog) => {
    setOpen(Typedialog);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFilterByName = async (event) => {
    const filterValue = event.target.value;
    setFilterName(filterValue);  // Cập nhật tạm thời giá trị tìm kiếm cho input

    if (filterValue.trim()) {
      debugger
      dispatch(getTransaction({ page: 1, pageSize: rowsPerPage, search: filterValue, transactionType: 4 }));
    } else {
      // Gọi lại API khi không có từ khóa tìm kiếm
      dispatch(getTransaction({ page: 1, pageSize: rowsPerPage }));
    }
  };


  useEffect(() => {
    dispatch(getTransaction({ page: page + 1, pageSize: rowsPerPage, transactionType: 4 }));
    dispatch(getWalletbyIdAsync({ id: accountId }));
  }, [success]);

  useEffect(() => {
    dispatch(getWalletbyIdAsync({ id: accountId }));
  }, []);

  useEffect(() => {
    setGoldBalance(wallet?.goldBalance);
  }, [wallet]); // Mảng phụ thuộc là `wallet`



  return (
    <>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography sx={{ mt: 5, mb: 5 }} variant="h4">Yêu cầu rút tiền</Typography>
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
                  { id: 'name', label: 'Tên' },
                  { id: 'goldamount', label: 'Số điểm', align: 'center' },
                  { id: 'time', label: 'Thời gian', align: 'center' },
                  { id: 'description', label: 'Mô tả', align: 'center' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {transactions?.map((row, index) => (
                  <UserTableRow
                    key={row?.id}
                    rowKey={index + 1}
                    id={row?.id}
                    name={row?.name}
                    goldAmount={row?.goldAmount || 0}
                    description={row?.description || ''}
                    transactionType={row?.transactionType}
                    transactionDateTime={
                      row?.transactionDateTime
                        ? new Date(row.transactionDateTime)
                          .toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                        : ''
                    }
                    avatarUrl={row?.avatarUrl}
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
