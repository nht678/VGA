import { Box, Typography, Button } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/system/Grid';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function WalletCard() {
    const { highschools } = useSelector((state) => state.highschoolReducer);
    console.log('highschools:', highschools);

    const handleDistributeGold = () => {
        alert('Phân phối Gold');
    }
    const handleClickOpen = (type) => {
        setOpen(type);
    };
    const handleClose = () => {
        setOpen(null);
    };
    const [open, setOpen] = useState(null);



    return (
        <Box
            sx={(theme) => ({
                boxShadow: 10,
                bgcolor: '#fff',
                color: 'grey.800',
                p: 3,
                m: 0,
                height: 400, // Tăng chiều cao để chứa thêm nút
                borderRadius: 3,
                fontSize: '0.875rem',
                fontWeight: '700',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                ...theme.applyStyles('dark', {
                    bgcolor: '#101010',
                    color: 'grey.300',
                }),
            })}
        >
            {/* Icon Ví tiền */}
            <AccountBalanceWalletIcon sx={{ fontSize: 60, color: '#4caf50' }} />

            {/* Tiêu đề */}
            <Typography variant="h6" style={{ textAlign: 'center', fontSize: '25px' }}>
                Ví tiền của tôi
            </Typography>

            {/* Số tiền */}
            <Typography variant="h6" style={{ textAlign: 'center', fontSize: '20px', color: '#ff5722' }}>
                0 VND
            </Typography>

            {/* Thêm nút hoặc các thông tin khác */}
            <Typography variant="body2" style={{ textAlign: 'center', color: 'grey.600' }}>
                Cập nhật số dư của bạn ngay!
            </Typography>

            {/* Nút Nạp Gold */}
            <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2, width: '80%' }}
                onClick={() => alert('Nạp Gold')}>
                Nạp Gold
            </Button>

            {/* Nút Phân phối Gold */}
            <Button
                variant="outlined"
                color="secondary"
                sx={{ mt: 1, width: '80%' }}
                onClick={() => handleClickOpen('DistributeGold')}>
                Phân phối Gold
            </Button>
            <Dialog
                open={open === 'DistributeGold'}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                // sx={{ height: 400, width: 400 }}
                // fullWidth
                fullheight
            >
                <DialogTitle id="alert-dialog-title" sx={{ marginLeft: 1 }}>
                    Phân phối vàng
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Grid container spacing={2}>
                            <Grid size={{ md: 12 }}>
                                <TextField
                                    fullWidth
                                    label="Gold"
                                    name='Gold'
                                // onchange setformdata
                                // onChange={handleChange}
                                />
                            </Grid>
                        </Grid>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy bỏ</Button>
                    <Button onClick={() => handleDistributeGold()} autoFocus>
                        Phân phối
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
