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


export default function UserTableRow({
  testTypeId,
  name,
  description,
  id,
  rowKey,
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
  const [value, setValue] = useState(options[0]);

  // useEffect(() => {
  //   dispatch(actGetquestionbyTestIdAsync(id));
  // }, [refreshKey]);


  // const answerValue = [
  //   { key: "Extraversion (E)", value: 1 },
  //   { key: "Introversion (I)", value: 2 },
  //   { key: "Sensing (S)", value: 3 },
  //   { key: "Intuition (N)", value: 4 },
  //   { key: "Thinking (T)", value: 5 },
  //   { key: "Feeling (F)", value: 6 },
  //   { key: "Judging (J)", value: 7 },
  //   { key: "Perceiving (P)", value: 8 },
  // ];
  // const groupValue = [
  //   { key: 'khong biet', value: 0 },
  //   { key: "Realistic", value: 1 },
  //   { key: "Investigative", value: 2 },
  //   { key: "Artistic", value: 3 },
  //   { key: "Social", value: 4 },
  //   { key: "Enterprising", value: 5 },
  //   { key: "Conventional", value: 6 },
  // ];

  // // Đồng bộ `questions` từ Redux store vào `localQuestions`
  // useEffect(() => {
  //   setLocalQuestions(questions);
  // }, [questions]);


  // const [newQuestion, setNewQuestion] = useState({
  //   content: "",
  //   group: null,
  //   personalTestId: "3fa85f64-5717-4562-b3fc-2c963f66afa6", // personalTestId đã được định nghĩa
  //   answers: [{ content: "", answerValue: null }, { content: "", answerValue: null }], // Tạo 2 câu trả lời mặc định
  // });

  // // Cập nhật nội dung câu hỏi mới
  // const handleNewQuestionChange = (event) => {
  //   setNewQuestion({
  //     ...newQuestion,
  //     content: event.target.value,
  //   });
  // };

  // // Cập nhật group của câu hỏi mới
  // const handleNewGroupChange = (newValue) => {
  //   setNewQuestion({
  //     ...newQuestion,
  //     group: newValue?.value || null,
  //   });
  // };

  // // Cập nhật câu trả lời mới
  // const handleNewAnswerChange = (index, event) => {
  //   const updatedAnswers = [...newQuestion.answers];
  //   updatedAnswers[index].content = event.target.value;
  //   setNewQuestion({
  //     ...newQuestion,
  //     answers: updatedAnswers,
  //   });
  // };

  // // Cập nhật giá trị trả lời mới
  // const handleNewAnswerValueChange = (index, newValue) => {
  //   const updatedAnswers = [...newQuestion.answers];
  //   updatedAnswers[index].answerValue = newValue?.value || null;
  //   setNewQuestion({
  //     ...newQuestion,
  //     answers: updatedAnswers,
  //   });
  // };

  // // Thêm câu trả lời
  // const handleAddAnswer = () => {
  //   const updatedAnswers = [...newQuestion.answers, { content: "", answerValue: null }];
  //   setNewQuestion({
  //     ...newQuestion,
  //     answers: updatedAnswers,
  //   });
  // };

  // // Thêm câu hỏi mới vào backend
  // const handleAddQuestion = () => {
  //   // Kiểm tra xem có ít nhất 2 câu trả lời không
  //   if (newQuestion.answers.length < 2) {
  //     alert("Vui lòng nhập tối thiểu 2 câu trả lời.");
  //     return;
  //   }

  //   // Gọi API thêm mới
  //   console.log('newQuestion', newQuestion);

  //   // Reset form sau khi thêm
  //   setNewQuestion({
  //     content: "",
  //     group: null,
  //     personalTestId: id,
  //     answers: [{ content: "", answerValue: null }, { content: "", answerValue: null }],
  //   });
  // };

  // const [localQuestions, setLocalQuestions] = useState([...questions]); // State tạm để chỉnh sửa từng câu hỏi
  // console.log('localQuestions', localQuestions);

  // // Xóa câu hỏi và câu trả lời
  // const handleDeleteQuestion = (index) => {
  //   const questionToDelete = localQuestions[index];
  //   const updatedQuestions = localQuestions.filter(
  //     (question) => question.questionId !== questionToDelete.questionId
  //   );
  //   setLocalQuestions(updatedQuestions);

  //   // Gọi API xóa
  //   dispatch(actDeleteQuestionAsync(questionToDelete.questionId));
  // };

  // // Cập nhật nội dung câu hỏi
  // const handleQuestionChange = (index, event) => {
  //   const updatedQuestions = [...localQuestions];
  //   updatedQuestions[index].content = event.target.value;
  //   setLocalQuestions(updatedQuestions);
  // };

  // // Cập nhật group của câu hỏi
  // const handleGroupChange = (index, newValue) => {
  //   const updatedQuestions = [...localQuestions];
  //   updatedQuestions[index].group = newValue?.value || null;
  //   setLocalQuestions(updatedQuestions);
  // };

  // // Cập nhật nội dung câu trả lời
  // const handleAnswerChange = (questionIndex, answerIndex, event) => {
  //   const updatedQuestions = [...localQuestions];
  //   updatedQuestions[questionIndex].answerModels[answerIndex].content = event.target.value;
  //   setLocalQuestions(updatedQuestions);
  // };

  // // Cập nhật giá trị trả lời
  // const handleAnswerValueChange = (questionIndex, answerIndex, newValue) => {
  //   const updatedQuestions = [...localQuestions];
  //   updatedQuestions[questionIndex].answerModels[answerIndex].answerValue = newValue?.value || null;
  //   setLocalQuestions(updatedQuestions);
  // };

  // // Gửi yêu cầu cập nhật từng câu hỏi
  // const handleUpdateQuestion = (index) => {
  //   const questionToUpdate = localQuestions[index];
  //   const payload = {
  //     content: questionToUpdate.content,
  //     group: questionToUpdate.group,
  //     answers: questionToUpdate.answerModels.map((answer) => ({
  //       id: answer.id,
  //       content: answer.content,
  //       answerValue: answer.answerValue,
  //     })),
  //   };
  //   dispatch(actUpdateQuestionAsync(questionToUpdate.questionId, payload));
  //   console.log('questionToUpdate.questionId', questionToUpdate.questionId);
  //   // onUpdate(questionToUpdate.questionId, payload); // Gọi API cập nhật
  // };

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

      {/* <Dialog
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
            {questions.map((question, index) => (
              <Grid container spacing={2} key={question.questionId}>
                <Grid size={{ md: 12 }}>
                  <Typography variant="h6">Câu hỏi {index + 1}:</Typography>
                </Grid>
                <Grid size={{ md: 12 }}>
                  <TextField
                    fullWidth
                    label="Câu hỏi"
                    value={question.content}
                    onChange={(e) => handleQuestionChange(index, e)}
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid size={{ md: 12 }}>
                  <Autocomplete
                    value={groupValue.find((opt) => opt.value === question.group)}
                    options={groupValue}
                    getOptionLabel={(option) => option.key}
                    onChange={(event, newValue) => handleGroupChange(index, newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label="Nhóm"
                        variant="outlined"
                        margin="dense"
                      />
                    )}
                  />
                </Grid>

                {question.answerModels.map((answer, answerIndex) => (
                  <Grid container spacing={2} key={answer.id}>
                    <Grid size={{ md: 12 }}>
                      <TextField
                        fullWidth
                        label={`Câu trả lời ${answerIndex + 1}`}
                        value={answer.content}
                        onChange={(e) => handleAnswerChange(index, answerIndex, e)}
                        variant="outlined"
                        margin="dense"
                      />
                    </Grid>
                    <Grid size={{ md: 12 }}>
                      <Autocomplete
                        value={answerValue.find((opt) => opt.value === answer.answerValue)}
                        options={answerValue}
                        getOptionLabel={(option) => option.key}
                        onChange={(event, newValue) =>
                          handleAnswerValueChange(index, answerIndex, newValue)
                        }
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

                <Grid size={{ md: 12 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdateQuestion(index)}
                  >
                    Cập nhật
                  </Button>
                </Grid>
                <Grid size={{ md: 12 }}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeleteQuestion(index)}
                  >
                    Xóa
                  </Button>
                </Grid>

              </Grid>
            ))}
            <Grid container spacing={2}>
              <Grid container spacing={2} mt={3}>
                <Grid size={{ md: 12 }}>
                  <Typography variant="h6">Thêm câu hỏi mới:</Typography>
                </Grid>

                <Grid size={{ md: 12 }}>
                  <TextField
                    fullWidth
                    label="Câu hỏi"
                    value={newQuestion.content}
                    onChange={handleNewQuestionChange}
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid size={{ md: 12 }}>
                  <Autocomplete
                    value={groupValue.find((opt) => opt.value === newQuestion.group)}
                    options={groupValue}
                    getOptionLabel={(option) => option.key}
                    onChange={(event, newValue) => handleNewGroupChange(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label="Nhóm"
                        variant="outlined"
                        margin="dense"
                      />
                    )}
                  />
                </Grid>

                {newQuestion.answers.map((answer, answerIndex) => (
                  <Grid container spacing={2} key={answerIndex}>
                    <Grid size={{ md: 6 }}>
                      <TextField
                        fullWidth
                        label={`Câu trả lời ${answerIndex + 1}`}
                        value={answer.content}
                        onChange={(e) => handleNewAnswerChange(answerIndex, e)}
                        variant="outlined"
                        margin="dense"
                      />
                    </Grid>
                    <Grid size={{ md: 6 }}>
                      <Autocomplete
                        value={answerValue.find((opt) => opt.value === answer.answerValue)}
                        options={answerValue}
                        getOptionLabel={(option) => option.key}
                        onChange={(event, newValue) => handleNewAnswerValueChange(answerIndex, newValue)}
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

                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleAddAnswer}
                  >
                    Thêm câu trả lời
                  </Button>
                </Grid>

                <Grid size={{ md: 12 }}>
                  <Button variant="contained" color="primary" onClick={handleAddQuestion}>
                    Thêm mới
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Hủy bỏ
          </Button>
        </DialogActions>
      </Dialog> */}

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
};
