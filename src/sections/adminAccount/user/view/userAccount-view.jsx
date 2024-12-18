import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Scrollbar from 'src/components/scrollbar';

import { useSelector, useDispatch } from 'react-redux';
import { actUserGetAsync, actAddUserAsync, resetUserSuccess } from 'src/store/users/action';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';




// create option các năm học có value là năm học
const currentYear = new Date().getFullYear();
const options = [
  { name: `${currentYear - 1}`, value: currentYear - 1 },
  { name: `${currentYear}`, value: currentYear },
  { name: `${currentYear + 1}`, value: currentYear + 1 },
];
// ----------------------------------------------------------------------

export default function UserAccountView() {

  const dispatch = useDispatch();
  const { students = [], total, usersSuccess } = useSelector((state) => state.usersReducer);
  const getCurrentYear = () => new Date().getFullYear();

  const [filterYear, setFilterYear] = useState(getCurrentYear);

  const { uploadSuccess } = useSelector((state) => state.uploadReducer);
  const [page, setPage] = useState(0);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [year, setYear] = useState('');
  const [errors, setErrors] = useState({});



  const [formData, setformData] = useState({
  });

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(actUserGetAsync({ page: newPage + 1, pageSize: rowsPerPage, search: filterName, schoolYears: filterYear })); // Cập nhật trang và gọi API
  };
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset về trang đầu tiên khi thay đổi số lượng
    dispatch(actUserGetAsync({ page: 1, pageSize: newRowsPerPage, search: filterName, schoolYears: filterYear })); // Gọi API với `pageSize` mới
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


  const handleFilterByName = async (event) => {
    const filterValue = event.target.value;
    setFilterName(filterValue);  // Cập nhật tạm thời giá trị tìm kiếm cho input
    if (filterValue.trim()) {
      dispatch(actUserGetAsync({ page: page + 1, pageSize: rowsPerPage, search: filterValue, schoolYears: filterYear }));
    } else {
      // Gọi lại API khi không có từ khóa tìm kiếm
      dispatch(actUserGetAsync({ page: page + 1, pageSize: rowsPerPage, schoolYears: filterYear }));
    }
  };

  const handleFilter = (selectedYear) => {
    setFilterYear(selectedYear);
    // Gọi API với giá trị filter
    dispatch(actUserGetAsync({ page: page + 1, pageSize: rowsPerPage, search: filterName, schoolYears: selectedYear }));
    handleClose(); // Đóng menu sau khi chọn
  };

  useEffect(() => {
    dispatch(actUserGetAsync({ page: page + 1, pageSize: rowsPerPage, search: filterName, schoolYears: filterYear }));
  }, [usersSuccess, uploadSuccess]);

  return (
    <>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} sx={{ justifyContent: 'center' }}>
        <Typography sx={{ mt: 5, mb: 5, }} variant="h4">Danh sách học sinh năm: {filterYear}</Typography>
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
                    image_Url={row?.account?.image_Url}
                    highSchoolName={row?.highSchoolName}
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
          labelRowsPerPage="Số hàng mỗi trang:"
        />


      </Card>
    </>
  )
  // );
}  