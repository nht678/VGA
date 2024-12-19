import { useState, useEffect } from 'react';
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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/system/Grid';
import Box from '@mui/material/Box';
import Iconify from 'src/components/iconify';
import Button from '@mui/material/Button';
import { Calendar, theme, Image, Row } from 'antd';
import Autocomplete from '@mui/material/Autocomplete';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useDispatch, useSelector } from 'react-redux';
import { actUserUpdateAsync, actUserDelete, resetUserSuccess, actUserDeleteAsync, actUserBan } from 'src/store/users/action';
import { actDeleteTestLessonAsync, actResetSuccess, actGetquestionbyTestIdAsync, actUpdateTestLessonAsync, actDeleteQuestionAsync } from 'src/store/testLesson/action';
import DeleteDialog from '../../pages/delete';
import { validateFormData, isRequired } from '../formValidation';


export default function UserTableRow({
  testTypeId,
  name,
  description,
  id,
  rowKey,
  point
}) {

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const { testLessons = [], total, success, typestest = [], questions = [] } = useSelector((state) => state.testLessonReducer);
  const [open, setOpen] = useState(null);
  const [dialog, setDialog] = useState('');

  const [formData, setformData] = useState({
    id: id,
    name: name,
    description: description,
  });
  const [errors, setErrors] = useState({});
  const [refreshKey, setRefreshKey] = useState(0);
  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1); // Tăng giá trị để kích hoạt lại useEffect
  };


  const testTypeName = typestest.find((test) => test.id === testTypeId)?.name || 'N/A';
  // Hàm validate form

  const rules = {
    name: [isRequired('Tên')],
    description: [isRequired('Mô tả')],
  };

  const validateForm = () => {
    const newErrors = validateFormData(formData, rules);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const dispatch = useDispatch();


  const handleUpdate = () => {
    if (!validateForm()) return;
    dispatch(actUpdateTestLessonAsync(id, formData));
    if (success) {
      dispatch(actResetSuccess());
    }
    handleCloseDialog();
  };

  const handleDelete = () => {
    dispatch(actDeleteTestLessonAsync(id));
    if (success) {
      dispatch(actResetSuccess());
    }
    handleCloseDialog();
  }

  const handleChange = (event) => {
    setformData({ ...formData, [event.target.name]: event.target.value });
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
    setDialog('');
  };


  const handleClose = () => {
    setDialog('');
  };


  return (
    <>
      <TableRow hover >
        <TableCell >
          {rowKey}
        </TableCell>
        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{testTypeName}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{description.length > 100 ? `${description.slice(0, 100)} ...` : description}</TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Dialog
        open={dialog === 'edit'}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center' }}>
          Cập nhật thông tin
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid size={{ md: 12 }}>
              <Typography variant="h6">Tên bài kiểm tra:</Typography>
              <TextField
                fullWidth
                label="Tên"
                name='name'
                defaultValue={name}
                onChange={handleChange}
                variant="outlined"
                margin="dense"
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid size={{ md: 12 }}>
              <Typography variant="h6">Mô tả:</Typography>
              <textarea name='description' onChange={handleChange} placeholder="Hãy viết mô tả..." style={{ width: '100%', height: '100px', borderRadius: '5px', border: '1px solid black' }}
                defaultValue={description}
              />
              {errors.description && <Typography variant='caption' color="error">{errors.description}</Typography>}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleCloseDialog}>
            Hủy bỏ
          </Button>
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>

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
          Chi tiết bài kiểm tra
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: 3 }}
          >
            <Grid container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px', mt: 2, px: 3 }}>
              <Grid size={{ md: 12 }} container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px', mt: 2, px: 3 }} >
                <Grid size={{ md: 12 }} container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px' }} >
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                      Tên bài kiểm tra:
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
                      Mô tả:
                    </Typography>
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body2">
                      {description}
                    </Typography>
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                      Điểm số:
                    </Typography>
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body2">
                      {point}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog >




      <DeleteDialog open={dialog} onClose={handleCloseDialog} handleDelete={() => handleDelete()} />

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
        <MenuItem onClick={() => {
          handleClickOpenDialog('Detail')

        }
        }>
          <InfoIcon sx={{ mr: 2 }} />
          Chi tiết
        </MenuItem>
        {/* <MenuItem onClick={() => {
          handleClickOpenDialog('Question')
          handleRefresh();
        }}>
          <InfoIcon sx={{ mr: 2 }} />
          Các câu hỏi
        </MenuItem> */}
        <MenuItem>
          <Link to={`/questions/${id}`}>
            <InfoIcon sx={{ mr: 2 }} />
            Các câu hỏi
          </Link>
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  rowKey: PropTypes.number,
  description: PropTypes.string,
  testTypeId: PropTypes.string,
  point: PropTypes.number,
};
