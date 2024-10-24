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

import { actUniversityAddAsync, actUniversityGetAsync, resetUniversitySuccess } from 'src/store/university/action';
import { getTransaction } from 'src/store/transaction/action';

import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import UserTableToolbar from '../user-table-toolbar';


// ----------------------------------------------------------------------

export default function TransactionView() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    address: '',
    description: '',
  });

  const [status, setStatus] = useState('false');
  console.log('formData', formData);


  // write code here

  const dispatch = useDispatch();

  const { universities = [], successUniversity, total } = useSelector((state) => state.reducerUniversity);
  const { transactions = [] } = useSelector((state) => state.transactionReducer);
  console.log('transactions', transactions);
  console.log('universities', universities);
  console.log('successUniversity', successUniversity)

  // Đảm bảo regions được fetch một lần và cập nhật options khi regions thay đổi
  useEffect(() => {
    dispatch(getTransaction({ page: page + 1, pageSize: rowsPerPage, transactionType: 2 }));

  }, [dispatch, page, rowsPerPage]);



  // const handleAddUniversity = () => {

  //   dispatch(actUniversityAddAsync(formData));
  //   if (successUniversity) {
  //     dispatch((resetUniversitySuccess()));
  //     setFormData({
  //       name: '',
  //       email: '',
  //       phone: '',
  //       password: '',
  //       address: '',
  //       description: '',
  //     });
  //     message.success('Thêm trường đại học thành công');
  //   }

  //   handleClose();
  // };


  const [options, setOptions] = useState([]); // Danh sách tỉnh thành
  console.log('option', options)
  const [value, setValue] = useState(null); // Giá trị đã chọn
  console.log('value', value);
  const [inputValue, setInputValue] = useState(''); // Giá trị input\
  console.log('inputValue', inputValue);

  // Function để cập nhật formData với giá trị đã chọn
  const handlechange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = universities.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(getTransaction({ page: newPage + 1, pageSize: rowsPerPage })); // Cập nhật trang và gọi API
  };
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset về trang đầu tiên khi thay đổi số lượng
    dispatch(getTransaction({ page: 1, pageSize: newRowsPerPage })); // Gọi API với `pageSize` mới
  };


  // const handleFilterByName = (event) => {
  //   setPage(0);
  //   setFilterName(event.target.value);
  // };

  // const dataFiltered = applyFilter({
  //   inputData: highschools,
  //   comparator: getComparator(order, orderBy),
  //   filterName,
  // });

  // const notFound = !dataFiltered.length && !!filterName;

  // write code here
  const [open, setOpen] = useState('');

  const handleClickOpen = (Typedialog) => {
    setOpen(Typedialog);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleFilterByName = async (event) => {
  //   const filterValue = event.target.value;
  //   setFilterName(filterValue);  // Cập nhật tạm thời giá trị tìm kiếm cho input

  //   if (filterValue.trim()) {
  //     dispatch(actHighSchoolGetAsync({ page: 1, pageSize: rowsPerPage, search: filterValue }));
  //   } else {
  //     // Gọi lại API khi không có từ khóa tìm kiếm
  //     dispatch(actHighSchoolGetAsync({ page: 1, pageSize: rowsPerPage }));
  //   }
  // };







  return (
    <>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
        <Typography variant="h4">Giao dịch</Typography>
        <Box>
          <Card variant="outlined" sx={{ minWidth: 300, borderRadius: 2, boxShadow: 2 }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                Ví của bạn
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Số điểm: <strong>1500</strong>
              </Typography>
              {/* <Typography variant="body1" sx={{ mb: 2 }}>
                Điểm đã phân phối: <strong>500</strong>
              </Typography> */}
              {/* <Button variant="contained" color="primary" sx={{ mr: 1 }}>
                Xem số điểm
              </Button> */}
              <Button variant="outlined" color="secondary">
                Phân phối điểm
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
        // onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ height: 500 }}>
            <Table stickyHeader sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                // rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Tên' },
                  { id: 'goldamount', label: 'Số lượng vàng', align: 'center' },
                  { id: 'time', label: 'Thời gian', align: 'center' },
                  { id: 'description', label: 'Mô tả', align: 'center' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {transactions?.map((row) => (
                  <UserTableRow
                    key={row?.id}
                    id={row?.id}
                    name={row?.name}
                    goldAmount={row?.goldAmount}
                    description={row?.description || ''}
                    transactionDateTime={row?.transactionDateTime ? new Date(row.transactionDateTime).toISOString().split('T')[0] : ''}
                    avatarUrl={row?.avatarUrl}
                    selected={selected.indexOf(row?.name) !== -1}
                    handleClick={(event) => handleClick(event, row?.name)}
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
