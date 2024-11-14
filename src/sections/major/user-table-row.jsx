import { useEffect, useState } from 'react';
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
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid2';
import Iconify from 'src/components/iconify';
import Button from '@mui/material/Button';
import { Chip } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import DeleteDialog from 'src/pages/delete';
import { actUpdateMajorAsync, resetMajor, actDeleteMajorAsync } from 'src/store/major/action';
import { message } from 'antd';

// Hàm lấy nhãn trạng thái
const getStatusLabel = (status) => {
  switch (status) {
    case true:
      return 'Active';
    case false:
      return 'Blocked';
    default:
      return 'Unknown';
  }
};

// Hàm lấy màu cho Chip dựa trên trạng thái
const getStatusColor = (status) => {
  switch (status) {
    case true:
      return 'success'; // Xanh lá
    case false:
      return 'error';   // Đỏ
    default:
      return 'default';
  }
};

export default function UserTableRow({
  selected,
  avatarUrl,
  handleClick,
  id,
  name,
  majorCategoryName,
  status,
  description,
  code,
  majorCategoryId
}) {
  console.log('id', id)
  console.log('status', status)


  const [open, setOpen] = useState(null);
  const [dialog, setDialog] = useState('');
  const [error, setError] = useState({});

  const dispatch = useDispatch();

  const { majors, total = 0, success } = useSelector((state) => state.majorReducer);
  console.log('majors', majors)
  const { majorCategories } = useSelector((state) => state.majorCategoryReducer);
  console.log('majorCategories', majorCategories);
  // console.log('levels', levels);

  const [majorCategoriesValue, setMajorCategoriesValue] = useState(
    majorCategories.find((item) => item.id === majorCategoryId) || null
  );
  const [majorCategoriesInputValue, setMajorCategoriesInputValue] = useState(''); // Giá trị input

  const handleMajorCategoriesChange = (event, newValue) => {
    setMajorCategoriesValue(newValue);
    setFormData((prevData) => ({
      ...prevData,
      majorCategoryId: newValue?.id || '', // Cập nhật regionId khi giá trị thay đổi
    }));
  };

  const handleDelete = () => {
    dispatch(actDeleteMajorAsync(id));
    handleCloseDialog();
  }

  const validateForm = () => {
    let newErrors = {};
    if (!formData.code) {
      newErrors.code = 'Mã ngành không được để trống';
    }
    if (!formData.name) {
      newErrors.name = 'Tên ngành không được để trống';
    }
    if (!formData.majorCategoryId) {
      newErrors.majorCategoryId = 'Thể loại ngành không được để trống';
    }
    if (!formData.description) {
      newErrors.description = 'Mô tả không được để trống';
    }
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  }



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
    setDialog('');
  };
  const [formData, setFormData] = useState({
    code: code,
    name: name,
    majorCategoryId: majorCategoryId,
    description
  });

  const handlechange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,

    });
  }
  const handleUpdateMajor = () => {
    if (validateForm()) {
      dispatch(actUpdateMajorAsync({ formData, id }));
      if (success) {
        dispatch(resetMajor());
      }
      handleClose();
    }
  }



  const handleClose = () => {
    setDialog(null);
  };


  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={code} src={avatarUrl} />
            <Typography variant="subtitle2" component='div' noWrap>
              {code}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{name}</TableCell>


        <TableCell sx={{ textAlign: 'center' }}>{majorCategoryName}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>
          {description?.length > 50 ? `${description.slice(0, 100)}...` : description}
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
        open={dialog === 'edit'}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ marginLeft: 1, textAlign: 'center' }}>
          {"Cập nhật thông tin cấp độ tư vấn viên"}
        </DialogTitle>
        <DialogContent >
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ md: 6 }}>
                <TextField
                  fullWidth
                  defaultValue={code}
                  name='code'
                  label="Mã ngành"
                  onChange={handlechange}
                  error={!!error.code}
                  helperText={error.code}
                />
              </Grid>
              <Grid size={{ md: 6 }}>
                <TextField
                  fullWidth
                  defaultValue={name}
                  name='name'
                  label="Tên"
                  onChange={handlechange}
                  error={!!error.name}
                  helperText={error.name}
                />
              </Grid>

              <Grid size={{ md: 6 }}>
                <Autocomplete
                  fullWidth
                  value={majorCategoriesValue}
                  onChange={handleMajorCategoriesChange}
                  inputValue={majorCategoriesInputValue}
                  onInputChange={(event, newInputValue) => {
                    setMajorCategoriesInputValue(newInputValue);
                  }}
                  id="majorCategories"
                  options={majorCategories}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => <TextField {...params} label="Thể loại ngành" />}
                />
                {error.majorCategoryId && <Typography variant='caption' color="error" >{error.majorCategoryId}</Typography>}
              </Grid>
              <Grid size={{ md: 12 }}>
                <Typography variant="h6">Mô tả</Typography>
                <textarea defaultValue={description} name='description' onChange={handlechange} placeholder="Hãy viết Mô tả....." style={{ width: '100%', height: '100px', borderRadius: '5px', border: '1px solid black' }}
                />
                {error.description && <Typography variant='caption' color="error" >{error.description}</Typography>}
              </Grid>


            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy bỏ</Button>
          <Button onClick={handleUpdateMajor} autoFocus>
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>



      <DeleteDialog
        open={dialog}
        onClose={handleCloseDialog}
        handleDelete={handleDelete}
      />

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
        <MenuItem onClick={() => handleClickOpenDialog('edit')}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Cập nhật
        </MenuItem>
        <MenuItem onClick={() => handleClickOpenDialog('Delete')} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Xóa
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  handleClick: PropTypes.func,
  selected: PropTypes.bool,
  id: PropTypes.number,
  name: PropTypes.string,
  majorCategoryName: PropTypes.string,
  status: PropTypes.bool,
  description: PropTypes.string,
  code: PropTypes.string,
  majorCategoryId: PropTypes.string,
};
