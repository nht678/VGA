import * as React from 'react';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
// import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import * as XLSX from 'xlsx';


import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { users } from 'src/_mock/user';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function UploadFile() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
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
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;
  // write your code here

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // code upload file
  // const [selectedFile, setSelectedFile] = useState(null);

  // const props = {
  //   name: 'file',
  //   beforeUpload(file) {
  //     // Lưu file đã chọn vào state
  //     setSelectedFile(file);
  //     return false;  // Ngăn chặn upload mặc định của antd
  //   },
  // };

  // const handleUpload = () => {
  //   if (!selectedFile) {
  //     message.error('Please select a file first!');
  //     return;
  //   }

  //   const reader = new FileReader();

  //   reader.onload = (e) => {
  //     const data = new Uint8Array(e.target.result);
  //     const workbook = XLSX.read(data, { type: 'array' });

  //     // Lấy sheet đầu tiên
  //     const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  //     // Chuyển đổi sheet thành JSON với header là hàng đầu tiên
  //     const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  //     // Tách header và rows
  //     const [headers, ...rows] = jsonData;

  //     // Lọc bỏ các hàng trống
  //     const filteredRows = rows.filter(row =>
  //       row.some(cell => cell !== undefined && cell !== null && cell !== '')
  //     );

  //     // Chuyển đổi các hàng còn lại thành các object dựa trên headers
  //     const formattedData = filteredRows.map(row => {
  //       const obj = {};
  //       headers.forEach((header, index) => {
  //         obj[header] = row[index];
  //       });
  //       return obj;
  //     });

  //     console.log('Filtered JSON Data:', formattedData);

  //     // Gửi dữ liệu JSON tới backend
  //     fetch('https://65dc58f6e7edadead7ebb035.mockapi.io/Nhanvien', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'authorization': 'authorization-text',
  //       },
  //       body: JSON.stringify(formattedData),
  //     })
  //       .then((response) => response.json())
  //       .then((data1) => {
  //         message.success(`${selectedFile.name} file uploaded and converted successfully`);
  //       })
  //       .catch((error) => {
  //         message.error(`${selectedFile.name} file upload failed.`);
  //       });
  //   };

  //   reader.readAsArrayBuffer(selectedFile);
  // };

  const [selectedFile, setSelectedFile] = useState(null);

const props = {
  name: 'file',
  beforeUpload(file) {
    // Lưu file đã chọn vào state
    setSelectedFile(file);
    return false;  // Ngăn chặn upload mặc định của antd
  },
};

const handleUpload = () => {
  if (!selectedFile) {
    message.error('Please select a file first!');
    return;
  }

  const reader = new FileReader();

  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });

    // Lấy sheet đầu tiên
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    
    // Chuyển đổi sheet thành JSON với header là hàng đầu tiên
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // Tách header và rows
    const [headers, ...rows] = jsonData;

    // Lọc bỏ các hàng trống
    const filteredRows = rows.filter(row => 
      row.some(cell => cell !== undefined && cell !== null && cell !== '')
    );

    // Chuyển đổi các hàng còn lại thành các object dựa trên headers
    const formattedData = filteredRows.map(row => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index];
      });
      return obj;
    });



    // Lấy ngày gửi hiện tại
    const currentDate = new Date().toISOString();  // ISO format (yyyy-mm-ddThh:mm:ss)

    // Chuẩn bị dữ liệu gửi đi kèm tên file và ngày gửi
    const payload = {
      fileName: selectedFile.name,
      uploadDate: currentDate,
      data: formattedData
    };
    console.log('Filtered JSON Data:', payload);

    // Gửi dữ liệu JSON tới backend
    fetch('https://65dc58f6e7edadead7ebb035.mockapi.io/Nhanvien', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'authorization-text',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data1) => {
        message.success(`${selectedFile.name} file uploaded and converted successfully`);
      })
      .catch((error) => {
        message.error(`${selectedFile.name} file upload failed.`);
      });
  };

  reader.readAsArrayBuffer(selectedFile);
};

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Upload Student</Typography>
        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleClickOpen}>
          New Upload
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Upload file"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
              {/* <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="female" control={<Radio />} label="2017" />
                <FormControlLabel value="male" control={<Radio />} label="2018" />
                <FormControlLabel value="other" control={<Radio />} label="2019" />
              </RadioGroup> */}
              {/* <FormControlLabel
                  value="disabled"
                  disabled
                  control={<Radio />}
                  label="other"
                /> */}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleUpload} autoFocus>
              Upload
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
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'date', label: 'Date' },
                  // { id: 'company', label: 'Company' },
                  // { id: 'role', label: 'Role' },
                  // { id: 'isVerified', label: 'Verified', align: 'center' },
                  // { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      name={row.name}
                      role={row.role}
                      status={row.status}
                      company={row.company}
                      avatarUrl={row.avatarUrl}
                      isVerified={row.isVerified}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
