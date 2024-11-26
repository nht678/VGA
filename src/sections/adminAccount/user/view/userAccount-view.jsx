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
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/system/Grid';
import { Calendar, theme, Button as AntButton, message, Upload } from 'antd';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { useSelector, useDispatch } from 'react-redux';
import { actUserGetAsync, actAddUserAsync, resetUserSuccess } from 'src/store/users/action';

import { UploadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { uploadFileAsync } from 'src/store/uploadfile/action';
import LoadingPage from 'src/pages/loading';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';




// create option các năm học có value là năm học
const options = [
  { name: '2017', value: 2017 },
  { name: '2018', value: 2018 },
  { name: '2019', value: 2019 },
  { name: '2020', value: 2020 },
  { name: '2021', value: 2021 },
  { name: '2022', value: 2022 },
  { name: '2023', value: 2023 },
  { name: '2024', value: 2024 },
];

// ----------------------------------------------------------------------

export default function UserAccountView() {

  const dispatch = useDispatch();
  const { students = [], total, usersSuccess } = useSelector((state) => state.usersReducer);
  // const listChoolYear = students.map((item) => item.schoolYears);
  // console.log('listChoolYear', listChoolYear);
  const getCurrentYear = () => new Date().getFullYear();

  const [filterYear, setFilterYear] = useState(getCurrentYear);
  console.log('students', students);

  const { uploadSuccess } = useSelector((state) => state.uploadReducer);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));


  const nameHighSchool = localStorage.getItem('name');
  console.log('nameHighSchool', nameHighSchool);


  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [year, setYear] = useState('');
  console.log('year', year);
  const [value, setValue] = useState('');
  const [errors, setErrors] = useState({});
  console.log('errors', errors);


  const [formData, setformData] = useState({
    highSchoolId: userInfo ? userInfo.userId : '', // Đảm bảo userInfo đã được xác định
  });

  const onPanelChange = (value1, mode) => {
    setformData({ ...formData, dateOfBirth: value1.format('YYYY-MM-DD') });

  };

  // handlechange
  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  // Hàm validate form
  const validateForm = () => {
    let newErrors = {};

    // Kiểm tra các trường yêu cầu
    if (!formData.name) newErrors.name = 'Tên là bắt buộc';
    if (!formData.email) newErrors.email = 'Email là bắt buộc';
    if (!formData.password) newErrors.password = 'Mật khẩu là bắt buộc';
    if (!formData.phone) newErrors.phone = 'Số điện thoại là bắt buộc';

    // Kiểm tra định dạng email (đơn giản)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    // Kiểm tra định dạng số điện thoại (đơn giản)
    const phoneRegex = /^[0-9]{10,11}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }
    if (formData.gender === undefined) {
      newErrors.gender = 'Vui lòng chọn giới tính';
    }

    setErrors(newErrors);

    // Trả về true nếu không có lỗi
    return Object.keys(newErrors).length === 0;
  };


  const handleAddUser = () => {
    if (!validateForm()) {
      // Nếu form không hợp lệ, dừng lại và không gửi request
      return;
    }

    try {
      dispatch(actAddUserAsync(formData));
      if (usersSuccess) {
        dispatch(resetUserSuccess());
        setformData({
          name: '',
          email: '',
          password: '',
          phone: '',
          dateOfBirth: '',
          schoolYears: '',
          highSchoolId: userInfo ? userInfo.userId : '',
        });
      }
    } catch (e) {
      message.error('Add user failed');
    }


    setOpen(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(actUserGetAsync({ page: newPage + 1, pageSize: rowsPerPage })); // Cập nhật trang và gọi API
  };
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset về trang đầu tiên khi thay đổi số lượng
    dispatch(actUserGetAsync({ page: 1, pageSize: newRowsPerPage })); // Gọi API với `pageSize` mới
  };


  const [open, setOpen] = useState('');

  const handleClickOpen = (Typedialog) => {
    setOpen(Typedialog);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        data: formattedData,
        fileName: selectedFile.name,
        uploadDate: currentDate,
      };
      const payloadString = JSON.stringify(payload);
      const formUpload = new FormData();
      formUpload.append('stringJson', payloadString);
      formUpload.append('highschoolId', userInfo.userId);
      formUpload.append('schoolYear', year);
      // Log FormData entries to console
      // formUpload.forEach((value1, key) => {
      //   console.log(`${key}:`, value1);
      // });

      dispatch(uploadFileAsync(formUpload));
      dispatch(resetUserSuccess());
      setOpen(false);
    };

    reader.readAsArrayBuffer(selectedFile);

  };


  const handleFilterByName = async (event) => {
    const filterValue = event.target.value;
    setFilterName(filterValue);  // Cập nhật tạm thời giá trị tìm kiếm cho input

    if (filterValue.trim()) {
      dispatch(actUserGetAsync({ page: page + 1, pageSize: rowsPerPage, highSchoolId: userInfo.userId, search: filterValue, schoolYears: filterYear }));
    } else {
      // Gọi lại API khi không có từ khóa tìm kiếm
      dispatch(actUserGetAsync({ page: page + 1, pageSize: rowsPerPage, highSchoolId: userInfo.userId, search: filterValue, schoolYears: filterYear }));
    }
  };

  const handleFilter = (selectedYear) => {
    setFilterYear(selectedYear);
    // Gọi API với giá trị filter
    dispatch(actUserGetAsync({ page: page + 1, pageSize: rowsPerPage, highSchoolId: userInfo.userId, search: filterName, schoolYears: selectedYear }));
    handleClose(); // Đóng menu sau khi chọn
  };



  useEffect(() => {
    dispatch(actUserGetAsync({ page: page + 1, pageSize: rowsPerPage, highSchoolId: userInfo.userId, search: filterName, schoolYears: filterYear }));
  }, [usersSuccess, uploadSuccess]);




  console.log('form', formData);
  return (
    <>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} sx={{ justifyContent: 'center' }}>
        <Typography sx={{ mt: 5, mb: 5, }} variant="h4">Danh sách học sinh năm:{filterYear}</Typography>

      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={0}
          filterName={filterName}
          onFilterName={handleFilterByName}
          handleFilter={handleFilter}
          filterYear={filterYear}
        />

        <Scrollbar>
          <TableContainer sx={{ height: 500 }}>
            <Table stickyHeader sx={{ minWidth: 800 }}>
              <UserTableHead
                headLabel={[
                  { id: 'name', label: 'Tên' },
                  { id: 'email', label: 'Email', align: 'center' },
                  { id: 'phone', label: 'Số điện thoại', align: 'center' },
                  { id: 'gender', label: 'Giới tính' },
                  { id: 'gold', label: 'Điểm' },
                  { id: 'dateOfBirth', label: 'Ngày sinh' },
                  { id: 'status', label: 'Trạng thái', align: 'center' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {students?.map((row, index) => (
                  <UserTableRow
                    key={row?.id}
                    name={row?.account?.name || ''} // Kiểm tra row.name
                    rowKey={index + 1}
                    id={row?.id || ''} // Kiểm tra row.id
                    gender={row?.gender} // Kiểm tra row.gender
                    gold={row?.account?.wallet?.goldBalance || 0} // Kiểm tra row["gold-balance"]
                    email={row.account?.email || ''} // Kiểm tra row.account?.email
                    phone={row.account?.phone || ''} // Kiểm tra row.account?.phone
                    avatarUrl={row.avatarUrl || ''} // Kiểm tra row.avatarUrl
                    accountId={row?.account?.id || ''}
                    status={row?.account?.status || ''} // Kiểm tra row.status
                    dateOfBirth={row.dateOfBirth ? new Date(row.dateOfBirth).toISOString().split('T')[0] : ''} // Kiểm tra row.dateOfBirth
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
          rowsPerPageOptions={[5, 10, 25]}
        />


      </Card>
    </>
  )
  // );
}  