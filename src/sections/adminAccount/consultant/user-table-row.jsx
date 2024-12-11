import { useState } from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/system/Grid';
import Iconify from 'src/components/iconify';
import Chip from '@mui/material/Chip';
import { Link } from 'react-router-dom';
import { Calendar, theme, Image } from 'antd';
import InfoIcon from '@mui/icons-material/Info';
import { useDispatch, useSelector } from 'react-redux';
import { resetConsultantSuccess, updateConsultant, deleteConsultant } from 'src/store/consultant/action';
import { actUserBan } from 'src/store/users/action';
import DeleteDialog from 'src/pages/delete';
// import DeleteDialog from '../../pages/delete';

const getColorByLevel = (level) => {
  switch (level) {
    case 1:
      return 'green';
    case 2:
      return 'blue';
    case 3:
      return 'orange';
    case 4:
      return 'red';
    default:
      return 'black'; // Màu mặc định nếu không có level hợp lệ
  }
};

const getStatusLabel = (status) => {
  switch (status) {
    case 1:
      return 'Active';
    case 2:
      return 'Inactive';
    case 3:
      return 'Blocked';
    default:
      return 'Unknown';
  }
};

// Hàm lấy màu cho Chip dựa trên trạng thái
const getStatusColor = (status) => {
  switch (status) {
    case 1:
      return 'success'; // Xanh lá
    case 2:
      return 'default'; // Xám
    case 3:
      return 'error';   // Đỏ
    default:
      return 'default';
  }
};

export default function UserTableRow({
  name,
  avatarUrl,
  email,
  phone,
  id,  // Đổi tên id props thành userId
  dateOfBirth,
  description,
  consultantLevelId,
  gender,
  rowKey,
  status,
  walletBalance,
  accountId,
  nameUniversity,
  consultantLevelPrice,
  image_Url,
  emailuniversity,
  consultantLevelDes,
  certifications,
  universityDes,
}) {
  let userId = localStorage.getItem('userId');

  const [open, setOpen] = useState(null);
  const [dialog, setDialog] = useState('');
  const [errors, setErrors] = useState({});
  const [formData, setformData] = useState({
    name: name,
    email: email,
    password: '',
    phone: phone,
    status: true,
    doB: dateOfBirth,
    description: description,
    consultantLevelId: '',
    universityId: userId,
  });
  const { consultantLevels } = useSelector((state) => state.levelReducer);
  const { consultants, total = 0, successConsultant } = useSelector((state) => state.consultantReducer);
  const [inputValue, setInputValue] = useState(''); // Giá trị input
  const [value, setValue] = useState(null); // Giá trị đã chọn
  const handleLevelChange = (event, newValue) => {
    setValue(newValue);
    setformData({ ...formData, consultantLevelId: newValue?.id || '' });
  };


  const handleBan = async () => {
    const changeStatus = status === 1 ? 2 : 1;
    await dispatch(actUserBan({ changeStatus, accountId }));
    if (successConsultant) {
      dispatch(resetConsultantSuccess());
    }
    handleCloseDialog();
    handleCloseMenu();
  };


  // handle change
  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  // if not onchange then onchange will take value default
  // use useEffect not onchange then onchange will take value default

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Tên là bắt buộc';
    }
    if (!formData.email) {
      newErrors.email = 'Email là bắt buộc';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    }
    if (!formData.phone) {
      newErrors.phone = 'Số điện thoại là bắt buộc';
    }
    // Kiểm tra định dạng số điện thoại (đơn giản)
    const phoneRegex = /^[0-9]{10,11}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }
    if (!formData.doB) {
      newErrors.doB = 'Ngày sinh là bắt buộc';
    }
    if (!formData.description) {
      newErrors.description = 'Mô tả là bắt buộc';
    }
    if (!formData.consultantLevelId) {
      newErrors.consultantLevelId = 'Level là bắt buộc';
    }
    if (formData.gender === undefined) {
      newErrors.gender = 'Vui lòng chọn giới tính';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const dispatch = useDispatch();
  const handleUpdate = () => {
    if (!validateForm()) return;

    dispatch(updateConsultant(id, formData));
    handleCloseDialog();
  };
  const handleDelete = () => {
    dispatch(deleteConsultant(id));
    handleCloseDialog();
  }
  const onPanelChange = (value1, mode) => {
    setformData({ ...formData, DateOfBirth: value1.format('YYYY-MM-DD') });
  };
  const { token } = theme.useToken();
  const wrapperStyle = {
    width: '100%',
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };


  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleClickOpenDialog = (type) => {
    setDialog(type);
    setOpen(null);
  };

  const handleCloseDialog = () => {
    setDialog(null);
  };


  const handleClose = () => {
    setDialog(null);
  };

  console.log('walletBalance', walletBalance);


  return (
    <>
      <TableRow hover >
        <TableCell>
          {rowKey}
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{email}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{phone}</TableCell>

        <TableCell sx={{ textAlign: 'center' }}>
          {description}
        </TableCell>
        <TableCell>{gender ? 'Nam' : 'Nữ'}</TableCell>
        <TableCell
          sx={{
            textAlign: 'center',
            color: getColorByLevel(consultantLevelId),
            fontWeight: 'bold'
          }}
        >
          {`Level ${consultantLevelId}`}
        </TableCell>
        <TableCell>
          {dateOfBirth}
        </TableCell>
        <TableCell align="center">
          <Chip
            label={getStatusLabel(status)}
            color={getStatusColor(status)}
            variant="outlined"
          />
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      <Dialog
        open={dialog === 'Detail'}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="md"
        style={{ zIndex: 1 }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            marginLeft: 1,
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            color: '#1976d2', // Primary color for the title
            paddingBottom: 2,
          }}
        >
          Chi tiết người tư vấn
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: 3 }}
          >
            <Grid container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px', mt: 2, px: 3 }}>
              <Grid size={{ md: 4 }}>
                <Image
                  width={200}
                  src={image_Url || "https://th.bing.com/th/id/OIP.c3sJJ74lDvfpM_BWe_yxSwHaGI?rs=1&pid=ImgDetMain"}
                  style={{ zIndex: 2 }}
                />
              </Grid>
              <Grid size={{ md: 8 }} container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px', mt: 2, px: 3 }} >
                <Grid size={{ md: 12 }} container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px' }} >
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                      Họ và tên:
                    </Typography>
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                      {name}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid size={{ md: 12 }} container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px' }} >
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                      Email
                    </Typography>
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                      {email}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid size={{ md: 12 }} container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px' }} >
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                      Số điện thoại
                    </Typography>
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                      {phone}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px', mt: 2, px: 3 }}>
              <Grid size={{ md: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                  Giới tính:
                </Typography>
              </Grid>
              <Grid size={{ md: 3 }}>
                <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                  {gender ? 'Nam' : 'Nữ'}
                </Typography>
              </Grid>
              <Grid size={{ md: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                  Ngày sinh:
                </Typography>
              </Grid>
              <Grid size={{ md: 3 }}>
                <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                  {dateOfBirth}
                </Typography>
              </Grid>

            </Grid>
            <Grid container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px', mt: 2, px: 3 }}>
              <Grid size={{ md: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                  Mô tả:
                </Typography>
              </Grid>
              <Grid size={{ md: 3 }}>
                <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                  {description}
                </Typography>
              </Grid>
              <Grid size={{ md: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                  Cấp độ:
                </Typography>
              </Grid>
              <Grid size={{ md: 3 }}>
                <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                  {`Level ${consultantLevelId}`}
                </Typography>
              </Grid>
              <Grid size={{ md: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                  Tình trạng:
                </Typography>
              </Grid>
              <Grid size={{ md: 3 }}>
                <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                  {getStatusLabel(status)}
                </Typography>
              </Grid>
              <Grid size={{ md: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                  Số dư ví:
                </Typography>
              </Grid>
              <Grid size={{ md: 3 }}>
                <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                  {walletBalance}
                </Typography>
              </Grid>
              <Grid size={{ md: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                  Trường đại học:
                </Typography>
              </Grid>
              <Grid size={{ md: 3 }}>
                <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                  {nameUniversity}
                </Typography>
              </Grid>
              <Grid size={{ md: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                  Giá:
                </Typography>
              </Grid>
              <Grid size={{ md: 3 }}>
                <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                  {consultantLevelPrice}
                </Typography>
              </Grid>
              <Grid size={{ md: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                  Email trường đại học:
                </Typography>
              </Grid>
              <Grid size={{ md: 3 }}>
                <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                  {emailuniversity}
                </Typography>
              </Grid>

            </Grid>
            <Grid container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px', mt: 2, px: 3 }}>
              <Grid size={{ md: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                  Miêu tả cấp độ:
                </Typography>
              </Grid>
              <Grid size={{ md: 9 }}>
                <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                  {consultantLevelDes}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px', mt: 2, px: 3 }}>
              <Grid size={{ md: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                  Các lịch tư vấn viên:
                </Typography>
              </Grid>
              <Grid size={{ md: 9 }}>
                <Typography variant="body1" sx={{ ml: 2 }} >
                  <Link to={`/historybooking/${id}`} style={{ color: '#16a34a', textDecoration: '#16a34a' }}>
                    Chi tiết
                  </Link>
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px', mt: 2, px: 3 }}>
              <Grid size={{ md: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                  Chứng chỉ:
                </Typography>
              </Grid>
              {certifications?.map((item, index) => (
                <Grid size={{ md: 3 }}>
                  <Image
                    width={100}
                    height={100}
                    src={item?.imageUrl}
                    style={{ zIndex: 2 }}
                  />
                  <Typography variant="body2" sx={{ color: '#616161' }}>
                    {item?.description}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog >

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        {/* <MenuItem onClick={handleBan} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          {status === 1 ? 'Chặn' : 'Mở chặn'}
        </MenuItem> */}
        <MenuItem onClick={() => handleClickOpenDialog('Detail')}>
          <InfoIcon sx={{ mr: 2 }} />
          Chi tiết
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  name: PropTypes.string,
  id: PropTypes.string,
  dateOfBirth: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  description: PropTypes.string,
  gender: PropTypes.bool,
  consultantLevelId: PropTypes.number,
  rowKey: PropTypes.number,
  status: PropTypes.bool,
  walletBalance: PropTypes.number,
  accountId: PropTypes.string,
  nameUniversity: PropTypes.string,
  consultantLevelPrice: PropTypes.number,
  image_Url: PropTypes.string,
  emailuniversity: PropTypes.string,
  consultantLevelDes: PropTypes.string,
  certifications: PropTypes.array,
  universityDes: PropTypes.string,
};
