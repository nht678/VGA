import { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from 'src/firebaseConfig';
// import React from "react";

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { UploadOutlined } from '@ant-design/icons';
import { Button as ButtonAnt, message, Upload } from 'antd';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import Grid from '@mui/system/Grid';



import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { useSelector, useDispatch } from 'react-redux';

import { actGetOccupationsAsync, actAddOccupationAsync, resetOccupation } from 'src/store/occupation/action';
import { actGetEntryLevelEducationsAsync } from 'src/store/entryLevelEducation/action';
import { actGetOccupationGroupAsync } from 'src/store/occupationGroup/action';
import { actGetWorkSkillsAsync } from 'src/store/workSkill/action';

import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import UserTableToolbar from '../user-table-toolbar';


// ----------------------------------------------------------------------

export default function OccupationView() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [error, setError] = useState({});

  // const [options, setOptions] = useState([]); // Danh sách tỉnh thành
  // console.log('option', options)
  // const [value, setValue] = useState(null); // Giá trị đã chọn
  // console.log('value', value);
  // const [inputValue, setInputValue] = useState(''); // Giá trị input\
  // console.log('inputValue', inputValue);


  const [formData, setFormData] = useState({
    entryLevelEducationId: "",
    occupationalGroupId: "",
    name: "",
    description: "",
    howToWork: "",
    workEnvironment: "",
    education: "",
    payScale: "",
    jobOutlook: "",
    image: "",
    occupationalSkills: [
      {
        workSkillsId: "",
        content: "",
      },
    ],
  });
  console.log('formData', formData);

  const validateForm = () => {
    let newError = {};
    if (!formData.name) {
      newError.name = 'Tên không được để trống';
    }
    if (!formData.priceOnSlot) {
      newError.priceOnSlot = 'Giá trên mỗi slot không được để trống';
    }
    if (!formData.description) {
      newError.description = 'Mô tả không được để trống';
    }
    setError(newError);
    return Object.keys(newError).length === 0;
  };


  // write code here

  const dispatch = useDispatch();

  const { occupations, total = 0, successOccupation } = useSelector((state) => state.occupationReducer);
  const { entryLevelEducations } = useSelector((state) => state.entryLevelEducationReducer);
  const { occupationGroups } = useSelector((state) => state.occupationGroupReducer);
  const { workSkills } = useSelector((state) => state.workSkillReducer);
  console.log('occupations', occupations)





  const handleAddOcupation = async () => {
    dispatch(actAddOccupationAsync(formData));
    if (successOccupation) {
      dispatch(resetOccupation());
      setFormData({
        entryLevelEducationId: "",
        occupationalGroupId: "",
        name: "",
        description: "",
        howToWork: "",
        workEnvironment: "",
        education: "",
        payScale: "",
        jobOutlook: "",
        image: "",
        occupationalSkills: [
          {
            workSkillsId: "",
            content: "",
          },
        ],
      });
    }
    handleClose();
  };


  console.log('formData', formData)

  const handleChangeField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addOccupationalSkill = () => {
    setFormData((prev) => ({
      ...prev,
      occupationalSkills: [
        ...prev.occupationalSkills,
        {
          workSkillsId: "",
          content: "",
        },
      ],
    }));
  };

  const removeOccupationalSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      occupationalSkills: prev.occupationalSkills.filter((_, i) => i !== index),
    }));
  };

  const updateOccupationalSkill = (index, field, value) => {
    setFormData((prev) => {
      const updatedSkills = [...prev.occupationalSkills];
      updatedSkills[index] = {
        ...updatedSkills[index],
        [field]: value,
      };
      return {
        ...prev,
        occupationalSkills: updatedSkills,
      };
    });
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); // Lưu URL ảnh

  const uploadProps = {
    name: "file",
    beforeUpload: async (file) => {
      try {
        setSelectedFile(file);
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);

        setImageUrl(url); // Lưu URL vào state
        setFormData((prevData) => ({
          ...prevData,
          image: url, // Lưu URL vào formData.image
        }));

        return false; // Ngăn upload mặc định
      } catch (error3) {
        console.error("Upload failed:", error3);
        return false;
      }
    },
    onRemove: async (file) => {
      try {
        await deleteImageFromFirebase(imageUrl); // Xóa ảnh từ Firebase
        setSelectedFile(null); // Xóa file trong state
        setImageUrl(""); // Xóa URL trong state
        setFormData((prevData) => ({
          ...prevData,
          image: "", // Xóa URL trong formData
        }));
      } catch (error2) {
        console.error("Failed to remove image:", error2);
      }
    },
  };

  // Hàm xóa ảnh từ Firebase
  const deleteImageFromFirebase = async (imageUrl1) => {
    try {
      const imageRef = ref(storage, imageUrl1); // Tạo reference từ URL
      await deleteObject(imageRef); // Xóa ảnh
      console.log("Ảnh đã được xóa thành công");
    } catch (error1) {
      console.error("Lỗi khi xóa ảnh:", error1);
    }
  };

  const fileList = imageUrl
    ? [
      {
        uid: "-1", // UID duy nhất cho mỗi ảnh
        name: "Uploaded Image", // Tên hiển thị
        status: "done", // Trạng thái upload
        url: imageUrl, // URL ảnh để hiển thị
      },
    ]
    : []; // Nếu chưa có ảnh thì danh sách trống




  // Function để cập nhật formData với giá trị đã chọn
  const handlechange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(actGetOccupationsAsync({ page: newPage + 1, pageSize: rowsPerPage, search: filterName })); // Cập nhật trang và gọi API
  };
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset về trang đầu tiên khi thay đổi số lượng
    dispatch(actGetOccupationsAsync({ page: 1, pageSize: newRowsPerPage, search: filterName })); // Gọi API với `pageSize` mới
  };

  // write code here
  const [open, setOpen] = useState('');

  const handleClickOpen = (Typedialog) => {
    setOpen(Typedialog);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFilterByName = async (event) => {
    const filterValue = event.target.value;
    setFilterName(filterValue);  // Cập nhật tạm thời giá trị tìm kiếm cho input

    if (filterValue.trim()) {
      dispatch(actGetOccupationsAsync({ page: 1, pageSize: rowsPerPage, search: filterValue }));
    } else {
      // Gọi lại API khi không có từ khóa tìm kiếm
      dispatch(actGetOccupationsAsync({ page: 1, pageSize: rowsPerPage, search: filterValue }));
    }
  };

  useEffect(() => {
    dispatch(actGetOccupationsAsync({ page: page + 1, pageSize: rowsPerPage, search: filterName }));
  }, [successOccupation]);

  useEffect(() => {
    dispatch(actGetEntryLevelEducationsAsync({}));
    dispatch(actGetOccupationGroupAsync({}));
    dispatch(actGetWorkSkillsAsync({}));
  }, [dispatch]);


  return (
    <>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography sx={{ mt: 5, mb: 5 }} variant="h4">Nghề nghiệp</Typography>
        <Box>
          <Button sx={{ marginRight: 2 }} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handleClickOpen('Create')}>
            Tạo nghề nghiệp
          </Button>


          <Dialog
            open={open === 'Create'}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" sx={{ marginLeft: 1, textAlign: 'center' }}>
              Tạo mới nghề nghiệp
            </DialogTitle>
            <DialogContent >
              <DialogContentText id="alert-dialog-description">
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid size={{ md: 6 }}>
                    <TextField
                      fullWidth
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
                      onChange={(e, newValue) => handleChangeField('entryLevelEducationId', newValue?.id)}
                      options={entryLevelEducations || []}
                      getOptionLabel={(option) => option?.name || ''}
                      renderInput={(params) => <TextField {...params} label="Chọn trình độ đầu vào" />}
                    />
                  </Grid>

                  <Grid size={{ md: 6 }}>
                    <Autocomplete
                      fullWidth
                      onChange={(e, newValue) => handleChangeField('occupationalGroupId', newValue?.id)}
                      options={occupationGroups || []}
                      getOptionLabel={(option) => option?.name || ''}
                      renderInput={(params) => <TextField {...params} label="Chọn nhóm nghề nghiệp" />}
                    />
                  </Grid>
                  <Grid size={{ md: 12 }}>
                    <Typography variant="h6">Ảnh</Typography>
                    <Upload
                      listType="picture"
                      {...uploadProps}
                      fileList={fileList}
                    >
                      {!imageUrl && ( // Chỉ hiển thị nút upload nếu chưa có ảnh
                        <ButtonAnt type="primary" icon={<UploadOutlined />}>
                          Upload
                        </ButtonAnt>
                      )}
                    </Upload>
                  </Grid>


                  <Grid size={{ md: 12 }}>
                    <Typography variant="h6">Mô tả</Typography>
                    <textarea onChange={(e) => handleChangeField('description', e.target.value)} placeholder="Hãy viết Mô tả....." style={{ width: '100%', height: '100px', borderRadius: '5px', border: '1px solid black' }}
                    />
                    {error.description && <Typography variant='caption' color="error" >{error.description}</Typography>}
                  </Grid>

                  <Grid size={{ md: 12 }}>
                    <Typography variant="h6">Cách làm việc</Typography>
                    <textarea onChange={(e) => handleChangeField('howToWork', e.target.value)} placeholder="Hãy viết cách làm việc....." style={{ width: '100%', height: '100px', borderRadius: '5px', border: '1px solid black' }}
                    />
                  </Grid>
                  <Grid size={{ md: 12 }}>
                    <Typography variant="h6">Môi trường làm việc</Typography>
                    <textarea onChange={(e) => handleChangeField('workEnvironment', e.target.value)} placeholder="Hãy viết môi trường làm việc....." style={{ width: '100%', height: '100px', borderRadius: '5px', border: '1px solid black' }}
                    />
                  </Grid>
                  <Grid size={{ md: 12 }}>
                    <Typography variant="h6">Giáo dục</Typography>
                    <textarea onChange={(e) => handleChangeField('education', e.target.value)} placeholder="Hãy viết giáo dục....." style={{ width: '100%', height: '100px', borderRadius: '5px', border: '1px solid black' }}
                    />
                  </Grid>
                  <Grid size={{ md: 12 }}>
                    <Typography variant="h6">Thang lương</Typography>
                    <textarea onChange={(e) => handleChangeField('payScale', e.target.value)} placeholder="Hãy viết giáo dục....." style={{ width: '100%', height: '100px', borderRadius: '5px', border: '1px solid black' }}
                    />
                  </Grid>
                  <Grid size={{ md: 12 }}>
                    <Typography variant="h6">Triển vọng nghề nghiệp</Typography>
                    <textarea onChange={(e) => handleChangeField('jobOutlook', e.target.value)} placeholder="Hãy viết giáo dục....." style={{ width: '100%', height: '100px', borderRadius: '5px', border: '1px solid black' }}
                    />
                  </Grid>
                </Grid>

                {formData.occupationalSkills.map((skill, index) => (
                  <Grid container spacing={2} sx={{ mt: 1 }} key={index} style={{ border: '1px solid black', borderRadius: '8px' }}>
                    <Grid container size={{ md: 12 }} spacing={2} sx={{ justifyContent: 'center' }}>
                      <Grid size={{ md: 6 }} sx={{ mt: 1 }}>
                        <Autocomplete
                          fullWidth
                          value={workSkills.find((item) => item.id === skill.workSkillsId) || null}
                          onChange={(e, newValue) =>
                            updateOccupationalSkill(index, "workSkillsId", newValue?.id)
                          }
                          options={workSkills || []}
                          getOptionLabel={(option) => option?.name || ""}
                          renderInput={(params) => (
                            <TextField {...params} label="Chọn kĩ năng công việc" />
                          )}
                        />
                      </Grid>
                    </Grid>
                    <Grid size={{ md: 12 }}>
                      <Typography variant="h6">Nội dung</Typography>
                      <textarea onChange={(e) => updateOccupationalSkill(index, 'content', e.target.value)} placeholder="Hãy viết nội dung....." style={{ width: '100%', height: '100px', borderRadius: '5px', border: '1px solid black' }}
                      />
                    </Grid>
                    <Grid size={{ md: 12 }} sx={{ my: 1, justifyContent: 'center', display: 'flex' }}>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => removeOccupationalSkill(index)}
                      >
                        Xóa
                      </Button>
                    </Grid>
                  </Grid>
                ))}
                <Grid size={{ md: 12 }} sx={{ mt: 2, justifyContent: 'center', display: 'flex' }}>
                  <Button variant="contained" onClick={addOccupationalSkill}>
                    Thêm kĩ năng nghề nghiệp
                  </Button>
                </Grid>

              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Hủy bỏ</Button>
              <Button onClick={handleAddOcupation} autoFocus>
                Tạo mới
              </Button>
            </DialogActions>
          </Dialog>



        </Box>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={0}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ height: 500 }}>
            <Table stickyHeader sx={{ minWidth: 800, tableLayout: 'fixed' }}>
              <UserTableHead
                headLabel={[
                  { id: 'name', label: 'Tên', width: '300px' },
                  { id: 'entryLevelEducation', label: 'Trình độ học vấn', align: 'center', width: '300px' },
                  { id: 'occupationalGroup', label: 'Nhóm nghề nghiệp', align: 'center', width: '300px' },
                  { id: 'education', label: 'Học vấn', align: 'center', width: '300px' },
                  { id: 'howToWork', label: 'Cách thức làm việc', align: 'center', width: '300px' },
                  { id: 'jobOutlook', label: 'Triển vọng nghề nghiệp', align: 'center', width: '300px' },
                  { id: 'payScale', label: 'Mức lương', align: 'center', width: '300px' },
                  { id: 'workEnvironment', label: 'Môi trường làm việc', align: 'center', width: '300px' },
                  { id: 'description', label: 'Mô tả', align: 'center', width: '300px' },
                  { id: 'status', label: 'Tình trạng', align: 'center', width: '300px' },
                  { id: '', width: '50px' },
                ]}
              />
              <TableBody>
                {occupations.map((row, index) => (
                  <UserTableRow
                    key={row?.id}
                    id={row?.id}
                    rowKey={index + 1}
                    name={row?.name}
                    entryLevelEducation={row?.entryLevelEducation?.name || ""}
                    occupationalGroup={row?.occupationalGroup?.name || ""}
                    education={row?.education || ""}
                    description={row?.description || ""}
                    howToWork={row?.howToWork || ""}
                    jobOutlook={row?.jobOutlook || ""}
                    payScale={row?.payScale || ""}
                    workEnvironment={row?.workEnvironment || ""}
                    status={row?.status || ""}
                    image={row?.image || ""}
                    entryLevelEducationId={row?.entryLevelEducation?.id || ""}
                    occupationalGroupId={row?.occupationalGroup?.id || ""}
                    occupationalSkills={row?.occupationalSkills || []}
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
          rowsPerPageOptions={[10, 25]}
        />


      </Card>
    </>
  );
}
