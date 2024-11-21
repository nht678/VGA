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
import { actLevelDeleteAsync, resetLevelSuccess, actLevelUpdateAsync } from 'src/store/level/action';
import { message } from 'antd';
import InfoIcon from '@mui/icons-material/Info';

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
  name,
  avatarUrl,
  id,
  entryLevelEducation,
  occupationalGroup,
  occupationalSkills,
  status,
  description,
  education,
  howToWork,
  jobOutlook,
  payScale,
  workEnvironment,
  rowKey
}) {

  console.log('rowKey', rowKey);



  const [open, setOpen] = useState(null);
  const [dialog, setDialog] = useState('');
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const { successLevel } = useSelector((state) => state.levelReducer);

  const handleDelete = () => {
    // console.log("id",id);
    dispatch(actLevelDeleteAsync(id));
    if (successLevel) {
      dispatch(resetLevelSuccess());
    }
    handleCloseDialog();
  }

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Tên không được để trống';
    }
    if (!formData.priceOnSlot) {
      newErrors.priceOnSlot = 'Giá trên mỗi slot không được để trống';
    }
    if (!formData.description) {
      newErrors.description = 'Mô tả không được để trống';
    }
    setErrors(newErrors);
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
    // name: name,
    // description: description,
    // priceOnSlot: priceOnSlot,
  });

  const handlechange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,

    });
  }

  const handleUpdateLevel = () => {
    if (!validateForm()) return;
    dispatch(actLevelUpdateAsync({ formData, id }));
    if (successLevel) {
      dispatch(resetLevelSuccess());
    }
    handleCloseDialog();
  }


  const handleClose = () => {
    setDialog(null);
  };


  return (
    <>
      <TableRow hover >
        <TableCell >
          {rowKey}
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl} />
            <Typography variant="subtitle2" component='div' noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell sx={{ textAlign: 'center' }}>
          {entryLevelEducation?.length > 150 ? `${entryLevelEducation.slice(0, 150)}...` : entryLevelEducation}
        </TableCell>
        <TableCell sx={{ textAlign: 'center' }}>
          {occupationalGroup?.length > 150 ? `${occupationalGroup.slice(0, 150)}...` : occupationalGroup}
        </TableCell>
        {/* <TableCell sx={{ textAlign: 'center' }}>
  {occupationalSkills?.length > 150 ? `${occupationalSkills.slice(0, 150)}...` : occupationalSkills}
</TableCell> */}
        <TableCell sx={{ textAlign: 'center' }}>
          {education?.length > 150 ? `${education.slice(0, 150)}...` : education}
        </TableCell>
        <TableCell sx={{ textAlign: 'center' }}>
          {howToWork?.length > 150 ? `${howToWork.slice(0, 150)}...` : howToWork}
        </TableCell>
        <TableCell sx={{ textAlign: 'center' }}>
          {jobOutlook?.length > 150 ? `${jobOutlook.slice(0, 150)}...` : jobOutlook}
        </TableCell>
        <TableCell sx={{ textAlign: 'center' }}>
          {payScale?.length > 150 ? `${payScale.slice(0, 150)}...` : payScale}
        </TableCell>
        <TableCell sx={{ textAlign: 'center' }}>
          {workEnvironment?.length > 150 ? `${workEnvironment.slice(0, 150)}...` : workEnvironment}
        </TableCell>
        <TableCell sx={{ textAlign: 'center' }}>
          {description?.length > 150 ? `${description.slice(0, 150)}...` : description}
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
          Cập nhật nghề nghiệp
        </DialogTitle>
        <DialogContent >
          <DialogContentText id="alert-dialog-description">
            {/* <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ md: 6 }}>
                <TextField
                  fullWidth
                  defaultValue={name}
                  name='name'
                  label="Tên"
                  onChange={handlechange}
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Grid>
              <Grid size={{ md: 6 }}>
                <TextField
                  fullWidth
                  defaultValue={priceOnSlot}
                  name='priceOnSlot'
                  label="Giá trên mỗi slot"
                  onChange={handlechange}
                  error={!!errors.priceOnSlot}
                  helperText={errors.priceOnSlot}
                />
              </Grid>


              <Grid size={{ md: 12 }}>
                <Typography variant="h6" component='div'>Mô tả</Typography>
                <textarea defaultValue={description} name='description' onChange={handlechange} placeholder="Hãy viết Mô tả....." style={{ width: '100%', height: '100px', borderRadius: '5px', border: '1px solid black' }}
                />
                {errors.description && <Typography variant='caption' color="error">{errors.description}</Typography>}
              </Grid>
            </Grid> */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy bỏ</Button>
          <Button onClick={handleUpdateLevel} autoFocus>
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
  entryLevelEducation: PropTypes.string,
  status: PropTypes.bool,
  description: PropTypes.string,
  occupationalGroup: PropTypes.string,
  occupationalSkills: PropTypes.string,
  education: PropTypes.string,
  howToWork: PropTypes.string,
  jobOutlook: PropTypes.string,
  payScale: PropTypes.string,
  workEnvironment: PropTypes.string,
  rowKey: PropTypes.number
};