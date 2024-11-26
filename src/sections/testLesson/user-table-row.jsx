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
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useDispatch, useSelector } from 'react-redux';
import { actUserUpdateAsync, actUserDelete, resetUserSuccess, actUserDeleteAsync, actUserBan } from 'src/store/users/action';
import { actDeleteTestLessonAsync, actResetSuccess, actGetquestionbyTestIdAsync } from 'src/store/testLesson/action';
import DeleteDialog from '../../pages/delete';
// import BanAccountDialog from '../banAccounDialog';


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
  testTypeId,
  name,
  description,
  id,
  rowKey,
}) {

  console.log('id', id);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const { testLessons = [], total, success, typestest = [], questions = [] } = useSelector((state) => state.testLessonReducer);
  const [open, setOpen] = useState(null);
  const [dialog, setDialog] = useState('');
  const [formData, setformData] = useState({

  });
  const [errors, setErrors] = useState({});


  const testTypeName = typestest.find((test) => test.id === testTypeId)?.name || 'N/A';
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
    // Kiểm tra giới tính đã được chọn chưa
    if (formData.gender === undefined) {
      newErrors.gender = 'Vui lòng chọn giới tính';
    }
    setErrors(newErrors);

    // Trả về true nếu không có lỗi
    return Object.keys(newErrors).length === 0;
  };


  const dispatch = useDispatch();
  const { usersSuccess } = useSelector((state) => state.usersReducer);


  const handleUpdate = () => {
    if (!validateForm()) {
      // Nếu form không hợp lệ, dừng lại và không gửi request
      return;
    }

    dispatch(actUserUpdateAsync(formData, id));
    if (usersSuccess) {
      dispatch(resetUserSuccess());
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

  const { token } = theme.useToken();



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
  const [value, setValue] = useState(options[0]);

  useEffect(() => {
    dispatch(actGetquestionbyTestIdAsync(id));
  }, [id]);

  const answerValue = [
    { key: "Extraversion (E)", value: 1 },
    { key: "Introversion (I)", value: 2 },
    { key: "Sensing (S)", value: 3 },
    { key: "Intuition (N)", value: 4 },
    { key: "Thinking (T)", value: 5 },
    { key: "Feeling (F)", value: 6 },
    { key: "Judging (J)", value: 7 },
    { key: "Perceiving (P)", value: 8 },
  ];

  const [editedQuestions, setEditedQuestions] = useState(questions);

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...editedQuestions];
    newQuestions[index].content = event.target.value; // Cập nhật câu hỏi
    setEditedQuestions(newQuestions);
  };

  const handleAnswerChange = (questionIndex, answerIndex, event) => {
    const newQuestions = [...editedQuestions];
    newQuestions[questionIndex].answerModels[answerIndex].content = event.target.value; // Cập nhật câu trả lời
    setEditedQuestions(newQuestions);
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
        <TableCell sx={{ textAlign: 'center' }}>{description}</TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Dialog
        open={dialog === "Question"}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center" }}>
          Danh sách các câu hỏi
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {editedQuestions.map((question, index) => (
              <Grid size={{ md: 12 }} container key={question.questionId}>
                <Typography variant="h6" gutterBottom>
                  Câu hỏi {index + 1}:
                </Typography>

                <Grid size={{ md: 12 }} container>
                  <TextField
                    fullWidth
                    label="Câu hỏi"
                    value={question.content}
                    onChange={(e) => handleQuestionChange(index, e)} // Sửa đổi câu hỏi
                    variant="outlined"
                    margin="dense"
                  />
                  <Typography variant="body2" gutterBottom>
                    Nhóm: {question.group}
                  </Typography>

                </Grid>


                {question.answerModels.map((answer, idx) => (
                  <Grid size={{ md: 12 }} container key={answer.id} mb={1}>
                    <Grid size={{ md: 8 }} >

                      <TextField
                        fullWidth
                        label={`Câu trả lời ${idx + 1}`}
                        value={answer.content}
                        onChange={(e) => handleAnswerChange(index, idx, e)} // Sửa đổi câu trả lời
                        variant="outlined"
                        margin="dense"
                      />
                    </Grid>
                    <Grid size={{ md: 4 }} >

                      <Autocomplete
                        value={answerValue.find((opt) => opt.value === answer.answerValue)} // Tìm kiếm giá trị đã chọn
                        options={answerValue} // Dữ liệu cho autocomplete
                        getOptionLabel={(option) => option.key} // Định dạng giá trị hiển thị trong danh sách
                        onChange={(event, newValue) => {
                          const newQuestions = [...editedQuestions];
                          newQuestions[index].answerModels[idx].answerValue = newValue?.value || null; // Cập nhật giá trị answerValue
                          setEditedQuestions(newQuestions);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            label="Giá trị trả lời"
                            variant="outlined"
                            margin="dense"
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          {/* <Button variant="contained" color="primary" onClick={handleUpdateQuestion}>
            Cập nhật
          </Button> */}
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Hủy bỏ
          </Button>
        </DialogActions>
      </Dialog>



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
        <MenuItem onClick={() => handleClickOpenDialog('Detail')}>
          <InfoIcon sx={{ mr: 2 }} />
          Chi tiết
        </MenuItem>
        <MenuItem onClick={() => handleClickOpenDialog('Question')}>
          <InfoIcon sx={{ mr: 2 }} />
          Các câu hỏi
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
};
