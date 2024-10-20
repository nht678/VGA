import { Box, Typography, Button } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export default function WalletCard() {
    return (
        <Box
            id="chartMix"
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
                onClick={() => alert('Phân phối Gold')}>
                Phân phối Gold
            </Button>
        </Box>
    );
}
