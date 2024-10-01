import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Calendar, theme } from 'antd';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { useSelector, useDispatch } from 'react-redux';
import { actUserGetAsync, actAddUserAsync } from 'src/store/users/action';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';




// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  // write code here
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  const { token } = theme.useToken();
  const wrapperStyle = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const dispatch = useDispatch();
  // const {  users = [],total=0 } = useSelector((state) => state.usersReducer);
  // useEffect(() => {
  //   dispatch(actUserGetAsync());
  // }, [dispatch]);

  // const { users = [], totalCount = 0, currentPage = 1 } = useSelector((state) => state.usersReducer);
  const { students, total } = useSelector((state) => state.usersReducer);
  console.log('Students data:', students);

  useEffect(() => {
    dispatch(actUserGetAsync({ page: page + 1, pageSize: rowsPerPage }));
    console.log('Current page:', page + 1);
  }, [dispatch, page, rowsPerPage]);


  const handleAddUser = () => {
    const newUser = {
      name,
      email,
      gold,
      gender,
      adminsstionyear,
    };
    dispatch(actAddUserAsync(newUser));
    // reset form
    setName('');
    setEmail('');
    setGold('');
    setAdminsstionyear('');
    setGender('');
    setOpen(false);
  }
  // end
  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = students.map((n) => n.name);
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
    console.log('newPage', newPage);
    dispatch(actUserGetAsync({ page: newPage + 1, pageSize: rowsPerPage })); // Cập nhật trang và gọi API
  };
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    console.log('newRowsPerPage', newRowsPerPage);
    setPage(0); // Reset về trang đầu tiên khi thay đổi số lượng
    dispatch(actUserGetAsync({ page: 1, pageSize: newRowsPerPage })); // Gọi API với `pageSize` mới
  };


  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: students,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  // write code here
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gold, setGold] = useState('');
  const [adminsstionyear, setAdminsstionyear] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const Year = [
    { label: '2017', year: 2017 },
    { label: '2018', year: 2018 },
    { label: '2019', year: 2019 },
    { label: '2020', year: 2020 },
    { label: '2021', year: 2021 },
  ];
  // const Item = styled(Paper)(({ theme1 }) => ({
  //   backgroundColor: '#fff',
  //   ...theme1.typography.body2,
  //   padding: theme1.spacing(1),
  //   textAlign: 'center',
  //   color: theme1.palette.text.secondary,
  //   ...theme1.applyStyles('dark', {
  //     backgroundColor: '#1A2027',
  //   }),
  // }));

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography sx={{ mt: 5, mb: 5 }} variant="h4">Students</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleClickOpen}>
          New Student
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" sx={{ marginLeft: 1 }}>
            {"Create student"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {/* <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="name"
                  label="Name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
                <TextField
                  id="email"
                  label="Email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />

                <TextField
                  id="gold"
                  label="Gold"
                  value={gold}
                  onChange={(event) => {
                    setGold(event.target.value);
                  }}
                />
                <TextField
                  id="phone"
                  label="Phone"
                  value={phone}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />


                <Autocomplete
                  disablePortal
                  options={Year}
                  sx={{ width: 300 }}
                  value={adminsstionyear}
                  onChange={(event, newValue) => {
                    console.log('newValue', newValue);
                    setAdminsstionyear(newValue.year);
                  }}
                  renderInput={(params) => <TextField {...params} label="Year" />}
                />
                <Typography variant="h6">Date Of Birth</Typography>
                <Box style={wrapperStyle}>
                  <Calendar fullscreen={false} onPanelChange={onPanelChange} />
                </Box>

                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={gender}
                    onChange={(event) => {
                      setGender(event.target.value);
                    }}
                  >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                  </RadioGroup>
                </FormControl>

              </Box> */}
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Gold"
                    value={gold}
                    onChange={(event) => {
                      setGold(event.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    disablePortal
                    options={Year}
                    value={Year.find((item) => item.year === adminsstionyear)}
                    onChange={(event, newValue) => {
                      setAdminsstionyear(newValue.year);
                    }}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Year" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">Date Of Birth</Typography>
                  <Calendar fullscreen={false} onPanelChange={onPanelChange} />
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={gender}
                      onChange={(event) => {
                        setGender(event.target.value);
                      }
                      }
                    >
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>

            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleAddUser} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                // rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'email', label: 'Email' },
                  { id: 'gender', label: 'Gender' },
                  { id: 'adminsstionyear', label: 'Adminsstionyear', align: 'center' },
                  { id: 'gold', label: 'Gold' },
                  { id: '' },
                ]}
              />
              {/* <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      name={row.name}
                      id={row.id}
                      gender={row.gender}
                      gold={row["gold-balance"]}
                      email={row.email}
                      avatarUrl={row.avatarUrl}
                      adminssionyear={row.adminssionyear}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, students.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody> */}
              <TableBody>
                {dataFiltered.map((row) => (
                  <UserTableRow
                    key={row.id}
                    name={row.name}
                    id={row.id}
                    gender={row.gender}
                    gold={row["gold-balance"]}
                    email={row.email}
                    avatarUrl={row.avatarUrl}
                    adminssionyear={row.adminssionyear}
                    selected={selected.indexOf(row.name) !== -1}
                    handleClick={(event) => handleClick(event, row.name)}
                  />
                ))}
                {/* <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, students.length)}
                /> */}
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
          rowsPerPageOptions={[5, 10, 25]}
        />


      </Card>
    </>
  );
}
