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

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/system/Grid';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { useSelector, useDispatch } from 'react-redux';

import { getTransaction, createDistributionofAdminUniAsync, resetTransaction } from 'src/store/transaction/action';
import { getWalletbyIdAsync } from 'src/store/wallet/action';
import { actUniversityGetAsync } from 'src/store/university/action';

import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import UserTableToolbar from '../user-table-toolbar';


// ----------------------------------------------------------------------

export default function TransactionAdminView() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [error, setError] = useState({});
  // const [walletuniversitiesId, setWalletuniversitiesId] = useState('');
  const [goldBalance, setGoldBalance] = useState('');
  const [gold, setGold] = useState(null);

  let accountId = localStorage.getItem('accountId');
  console.log('accountId', accountId);

  const [formData, setFormData] = useState({
    account_id_tranferring: accountId,
    account_id_receiving: '',
  });

  const [status, setStatus] = useState('false');
  console.log('formData', formData);


  // write code here

  const dispatch = useDispatch();


  const { transactions = [], total = 0, success } = useSelector((state) => state.transactionReducer);
  const { universities = [] } = useSelector((state) => state.reducerUniversity);
  console.log('universities', universities);
  const { wallet = [] } = useSelector((state) => state.walletReducer);
  console.log('transactions', transactions);

  useEffect(() => {
    dispatch(getTransaction({ page: page + 1, pageSize: rowsPerPage, transactionType: '', accountId: accountId }));
    dispatch(actUniversityGetAsync({}));
    // dispatch(getWalletbyIdAsync({ id: accountId }));


  }, [success]);

  useEffect(() => {
    setGoldBalance(wallet?.goldBalance);
  }, [wallet]); // Mảng phụ thuộc là `wallet`

  const validateForm = () => {
    let newError = {};

    if (!gold) {
      debugger
      newError.gold = 'Vui lòng nhập số điểm';
    } else if (!/^-?\d+(\.\d+)?$/.test(gold)) {
      newError.gold = 'Điểm phải là một số hợp lệ';
    } else if (Number(gold) <= 0) {
      newError.gold = 'Điểm phải lớn hơn 0';
    }
    if (!formData.account_id_receiving) {
      newError.account_id_receiving = 'Vui lòng chọn trường đại học';
    }


    setError(newError);
    return Object.keys(newError).length === 0; // Trả về true nếu không có lỗi
  };

  const handledistribute = async () => {
    if (!validateForm()) return;
    await dispatch(createDistributionofAdminUniAsync({ formData, gold }));
    if (success) {
      dispatch(resetTransaction());
      setFormData({
        account_id_tranferring: accountId,
        account_id_receiving: '',
      });
      setGold(null);
    }
    handleClose();
  }

  const [value, setValue] = useState(null); // Giá trị đã chọn
  console.log('value', value);
  const [inputValue, setInputValue] = useState(''); // Giá trị input\
  console.log('inputValue', inputValue);

  const [schoolInputValue, setschoolInputValue] = useState(''); // Input của trường năm
  const [schoolValue, setschoolValue] = useState(null); // Giá trị đã chọn cho năm

  const handleschoolChange = (event, newValue) => {
    setschoolValue(newValue?.account?.id);
    setFormData({
      ...formData,
      account_id_receiving: newValue?.account?.id
    });
  };
  console.log('gold', gold);

  // Function để cập nhật formData với giá trị đã chọn
  const handlechange = (e) => {
    debugger
    const value1 = e.target.value;
    setGold(value1 ? parseInt(value1, 10) : null);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(getTransaction({ page: page + 1, pageSize: rowsPerPage, transactionType: '', accountId: accountId, search: filterName })); // Cập nhật trang và gọi API
  };
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset về trang đầu tiên khi thay đổi số lượng
    dispatch(getTransaction({ page: page + 1, pageSize: rowsPerPage, transactionType: '', accountId: accountId, filterName })); // Gọi API với `pageSize` mới
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
      dispatch(getTransaction({ page: 1, pageSize: rowsPerPage, search: filterValue, accountId: accountId })); // Gọi lại API với từ khóa tìm kiếm
    } else {
      // Gọi lại API khi không có từ khóa tìm kiếm
      dispatch(getTransaction({ page: 1, pageSize: rowsPerPage, accountId: accountId }));
    }
  };


  return (
    <>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
        <Typography variant="h4">Giao dịch</Typography>
        <Box>
          <Card variant="outlined" sx={{ minWidth: 300, borderRadius: 2, boxShadow: 2 }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Ví của bạn
              </Typography>

              <Button variant="outlined" color="secondary" onClick={() => handleClickOpen('Create')}>
                Phân phối điểm
              </Button>
              <Dialog
                open={open === 'Create'}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title" sx={{ marginLeft: 1, textAlign: 'center' }}>
                  Phân phối điểm
                </DialogTitle>
                <DialogContent >
                  <DialogContentText id="alert-dialog-description">
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      <Grid size={{ md: 12 }}>
                        <TextField
                          fullWidth
                          name='gold'
                          label="Điểm"
                          value={gold || ''} // Gán giá trị từ state `gold`
                          onChange={handlechange}
                          error={!!error.gold}
                          helperText={error.gold}
                        />
                      </Grid>
                      <Grid size={{ md: 12 }}>
                        <Autocomplete
                          onChange={handleschoolChange}
                          inputValue={schoolInputValue}
                          onInputChange={(event, newInputValue) => {
                            setschoolInputValue(newInputValue);
                          }}
                          id="controllable-states-demo-111"
                          options={universities || []}
                          getOptionLabel={(option) => option?.account?.name || ''}
                          renderInput={(params) => <TextField {...params} label="Chọn trường đại học" />}
                        />
                      </Grid>
                    </Grid>

                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Hủy bỏ</Button>
                  <Button onClick={handledistribute} autoFocus>
                    Tạo mới
                  </Button>
                </DialogActions>
              </Dialog>
            </CardContent>
          </Card>
        </Box>
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
                    id={row?.id}
                    rowKey={index + 1}
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
