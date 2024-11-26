import { Box, display, Grid } from '@mui/system';
// link react-router-dom
import { Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import HeaderPayment from './headerPayment';
// usenavigate usedispatch



export default function Payment() {
    let role = localStorage.getItem('role');


    return (
        <Box>
            {/* <Box sx={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", height: 70, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <Link to="/payment">
                    <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' }, marginLeft: 2, color: 'rgba(99,102,241,1)' }} >
                        VGA
                    </Typography>
                </Link>
                <Button
                    style={{
                        height: '40px',
                        padding: '0 16px',
                        border: '1px solid #007BFF',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s, transform 0.2s',
                        backgroundColor: '#007BFF',
                        color: '#fff',
                    }}
                >
                    Đăng nhập
                </Button>
            </Box> */}
            <HeaderPayment />
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
                <Box
                    sx={{
                        width: {
                            xs: '100%', // Mobile
                            sm: '75%',  // Tablet
                            md: '50%',  // Desktop
                        },
                    }}
                >
                    <Box>
                        <img
                            src="https://contentgarena-a.akamaihd.net/GOP/newshop_banners/EDFD8F8D399786C0.jpg?v=1731394594"
                            alt="loading"
                            style={{ height: '50%' }}
                        />
                    </Box>
                    <Box sx={{ textAlign: 'center', my: '10px' }}>
                        Chọn nạp điểm
                    </Box>
                    <Box>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item md={3}>
                                {role ? (
                                    <Link to="/paymentbegin">
                                        <Box
                                            sx={{
                                                border: '1px solid #ddd',
                                                borderRadius: '8px',
                                                padding: 2,
                                                textAlign: 'center',
                                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                                transition: 'transform 0.3s',
                                                '&:hover': {
                                                    transform: 'scale(1.05)',
                                                },
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: '80%',
                                                    height: 'auto',
                                                    marginBottom: 2,
                                                }}
                                            >
                                                <img
                                                    src="https://contentgarena-a.akamaihd.net/GOP/newshop_banners/EDFD8F8D399786C0.jpg?v=1731394594"
                                                    alt="chưa có"
                                                    style={{
                                                        width: '100px',
                                                        height: '100px',
                                                        borderRadius: '8px',
                                                        objectFit: 'cover',
                                                    }}
                                                />
                                            </Box>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                                                Nạp điểm
                                            </Typography>
                                        </Box>
                                    </Link>
                                ) : (
                                    <Link to="/signinpayment">
                                        <Box
                                            sx={{
                                                border: '1px solid #ddd',
                                                borderRadius: '8px',
                                                padding: 2,
                                                textAlign: 'center',
                                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                                transition: 'transform 0.3s',
                                                '&:hover': {
                                                    transform: 'scale(1.05)',
                                                },
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: '80%',
                                                    height: 'auto',
                                                    marginBottom: 2,
                                                }}
                                            >
                                                <img
                                                    src="https://contentgarena-a.akamaihd.net/GOP/newshop_banners/EDFD8F8D399786C0.jpg?v=1731394594"
                                                    alt="chưa có"
                                                    style={{
                                                        width: '100px',
                                                        height: '100px',
                                                        borderRadius: '8px',
                                                        objectFit: 'cover',
                                                    }}
                                                />
                                            </Box>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                                                Nạp điểm
                                            </Typography>
                                        </Box>
                                    </Link>
                                )}
                            </Grid>
                        </Grid>

                    </Box>
                </Box>

            </Box>

        </Box >
    );
}