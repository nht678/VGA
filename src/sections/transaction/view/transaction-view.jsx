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
import WalletIcon from '@mui/icons-material/Wallet';
import Scrollbar from 'src/components/scrollbar';
import { useSelector, useDispatch } from 'react-redux';
import { getTransaction, createDistributionAsync, resetTransaction } from 'src/store/transaction/action';
import { getWalletbyIdAsync } from 'src/store/wallet/action';

import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import UserTableToolbar from '../user-table-toolbar';


// ----------------------------------------------------------------------

export default function TransactionView() {
  const [page, setPage] = useState(0);

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [error, setError] = useState({});

  const [goldBalance, setGoldBalance] = useState('');
  const dispatch = useDispatch();

  let accountId = localStorage.getItem('accountId');

  const { transactions = [], total = 0, success } = useSelector((state) => state.transactionReducer);
  const { wallet = [] } = useSelector((state) => state.walletReducer);

  const [formData, setFormData] = useState({
    accountId: accountId,
    gold: '',
    years: '',
  });

  const validateForm = () => {
    let newError = {};

    if (!formData.gold) {
      newError.gold = 'Vui lòng nhập số điểm';
    } else if (!/^-?\d+(\.\d+)?$/.test(formData.gold)) {
      newError.gold = 'Điểm phải là một số hợp lệ';
    } else if (Number(formData.gold) <= 0) {
      newError.gold = 'Điểm phải lớn hơn 0';
    } else if (Number(formData.gold) > goldBalance) {
      newError.gold = 'Điểm phân phối không được lớn hơn số điểm hiện có';
    } else if (formData.gold.length > 7) {
      newError.gold = 'Điểm chỉ được tối đa 7 chữ số';
    }
    if (!formData.years) {
      newError.years = 'Vui lòng chọn năm';
    }
    setError(newError);
    return Object.keys(newError).length === 0; // Trả về false nếu có lỗi
  };
  const handledistribute = async () => {
    // Đợi createDistributionAsync hoàn tất
    // validate form
    if (!validateForm()) return;
    await dispatch(createDistributionAsync(formData));
    if (success) {
      dispatch(resetTransaction());
      setFormData({
        accountId: accountId,
        gold: '',
        years: '',
      });
      dispatch(resetTransaction());
      handleClose();
    }
  }
  const currentYear = new Date().getFullYear();
  const options = [
    { name: `${currentYear - 1}`, value: currentYear - 1 },
    { name: `${currentYear}`, value: currentYear },
    { name: `${currentYear + 1}`, value: currentYear + 1 },
  ];

  const [yearInputValue, setYearInputValue] = useState(''); // Input của trường năm
  const [yearValue, setYearValue] = useState(null); // Giá trị đã chọn cho năm

  const handleYearChange = (event, newValue) => {
    setYearValue(newValue?.value);
    setFormData({
      ...formData,
      years: newValue?.value
    });
  };


  // Function để cập nhật formData với giá trị đã chọn
  const handlechange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === 'gold' ? parseInt(value, 10) || 0 : value, // Chỉ parse 'gold'
    });
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(getTransaction({ page: page + 1, pageSize: rowsPerPage, transactionType: '', accountId: accountId })); // Cập nhật trang và gọi API
  };
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset về trang đầu tiên khi thay đổi số lượng
    dispatch(getTransaction({ page: page + 1, pageSize: rowsPerPage, transactionType: '', accountId: accountId })); // Gọi API với `pageSize` mới
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
      dispatch(getTransaction({ page: 1, pageSize: rowsPerPage, search: filterValue }));
    } else {
      // Gọi lại API khi không có từ khóa tìm kiếm
      dispatch(getTransaction({ page: 1, pageSize: rowsPerPage }));
    }
  };


  useEffect(() => {
    dispatch(getTransaction({ page: page + 1, pageSize: rowsPerPage, transactionType: '', accountId: accountId }));
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

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
        <Typography variant="h4">Giao dịch</Typography>
        <Box>
          <Card variant="outlined" sx={{ minWidth: 300, borderRadius: 2, boxShadow: 2 }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <WalletIcon sx={{ height: '40px', width: "40px", color: '#16a34a' }} />
              <Typography variant="body1" sx={{ mb: 1 }}>
                Số điểm: <strong>{goldBalance}</strong>
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
                          onChange={handlechange}
                          error={!!error.gold}
                          helperText={error.gold}
                        />
                      </Grid>

                      <Grid size={{ md: 12 }}>
                        <Autocomplete
                          fullWidth
                          onChange={handleYearChange}
                          inputValue={yearInputValue}
                          onInputChange={(event, newInputValue) => {
                            setYearInputValue(newInputValue);
                          }}
                          id="controllable-states-demo-year"
                          options={options || []}
                          getOptionLabel={(option) => option?.name || ''}
                          renderInput={(params) => <TextField {...params} label="Chọn năm" />}
                        />
                        {error.years && <Typography variant='caption' color="error"> {error.years}</Typography>}

                      </Grid>


                    </Grid>

                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Hủy bỏ</Button>
                  <Button onClick={handledistribute} autoFocus>
                    Phân phối
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
                    accountName={row?.accountName}
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
          labelRowsPerPage="Số hàng mỗi trang:"
        />


      </Card>
    </>
  );
}
