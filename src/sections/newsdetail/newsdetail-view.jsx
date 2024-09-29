import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Image } from 'antd';
import { Box } from '@mui/system';


function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

export default function NewsDetailView() {

    return (
        <Box role="presentation" onClick={handleClick} sx={{ m: 20 }}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    Số hóa
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    href="/material-ui/getting-started/installation/"
                >
                    Sản phẩm
                </Link>
                <Typography sx={{ color: 'text.primary' }}>Thị trường</Typography>
            </Breadcrumbs>
            <Typography variant="h4" sx={{ mb: 5, mt: 2 }}>
                10.000 chiếc iPhone 16 tới tay người dùng trong đêm
            </Typography>

            <Typography variant="body1" sx={{ mb: 5 }}>
                Các hệ thống bán lẻ cho biết đã giao hàng nghìn iPhone 16 từ 0h đến 2-3h tới những người đặt trước, dự kiến trả thêm hàng chục nghìn máy trong hôm nay.

                Hai năm qua, sau khi Apple tăng cường hiện diện tại Việt Nam, việc giao iPhone tới người dùng được nhiều đại lý ủy quyền thực hiện ngay từ 0h, vừa đảm bảo yêu cầu từ hãng về thời gian mở bán, vừa đáp ứng nhu cầu muốn nhận máy sớm nhất có thể của người dùng.

                Thế Giới Di Động cho biết đã giao iPhone 16 cho 3.000 khách hàng, Viettel Store là 2.800, CellphoneS là 2.500 và FPT Shop là 1.000 trong đêm, được thực hiện tại tất cả cửa hàng của hệ thống trên cả nước.
            </Typography>
            <Box sx={{ m: 10 }}>
                <Image
                    style={{ margin: 'auto' }}
                    width={'90%'}
                    height={500}
                    src="./assets/images/avatars/avatar_9.jpg"

                />
            </Box>


            <Typography variant="body1" sx={{ mb: 5 }}>
                Các hệ thống bán lẻ cho biết đã giao hàng nghìn iPhone 16 từ 0h đến 2-3h tới những người đặt trước, dự kiến trả thêm hàng chục nghìn máy trong hôm nay.

                Hai năm qua, sau khi Apple tăng cường hiện diện tại Việt Nam, việc giao iPhone tới người dùng được nhiều đại lý ủy quyền thực hiện ngay từ 0h, vừa đảm bảo yêu cầu từ hãng về thời gian mở bán, vừa đáp ứng nhu cầu muốn nhận máy sớm nhất có thể của người dùng.

                Thế Giới Di Động cho biết đã giao iPhone 16 cho 3.000 khách hàng, Viettel Store là 2.800, CellphoneS là 2.500 và FPT Shop là 1.000 trong đêm, được thực hiện tại tất cả cửa hàng của hệ thống trên cả nước.
            </Typography>


            <Typography variant="body1" sx={{ mb: 5 }}>
                Các hệ thống bán lẻ cho biết đã giao hàng nghìn iPhone 16 từ 0h đến 2-3h tới những người đặt trước, dự kiến trả thêm hàng chục nghìn máy trong hôm nay.

                Hai năm qua, sau khi Apple tăng cường hiện diện tại Việt Nam, việc giao iPhone tới người dùng được nhiều đại lý ủy quyền thực hiện ngay từ 0h, vừa đảm bảo yêu cầu từ hãng về thời gian mở bán, vừa đáp ứng nhu cầu muốn nhận máy sớm nhất có thể của người dùng.

                Thế Giới Di Động cho biết đã giao iPhone 16 cho 3.000 khách hàng, Viettel Store là 2.800, CellphoneS là 2.500 và FPT Shop là 1.000 trong đêm, được thực hiện tại tất cả cửa hàng của hệ thống trên cả nước.
            </Typography>


            <Typography variant="body1" sx={{ mb: 5 }}>
                Các hệ thống bán lẻ cho biết đã giao hàng nghìn iPhone 16 từ 0h đến 2-3h tới những người đặt trước, dự kiến trả thêm hàng chục nghìn máy trong hôm nay.

                Hai năm qua, sau khi Apple tăng cường hiện diện tại Việt Nam, việc giao iPhone tới người dùng được nhiều đại lý ủy quyền thực hiện ngay từ 0h, vừa đảm bảo yêu cầu từ hãng về thời gian mở bán, vừa đáp ứng nhu cầu muốn nhận máy sớm nhất có thể của người dùng.

                Thế Giới Di Động cho biết đã giao iPhone 16 cho 3.000 khách hàng, Viettel Store là 2.800, CellphoneS là 2.500 và FPT Shop là 1.000 trong đêm, được thực hiện tại tất cả cửa hàng của hệ thống trên cả nước.
            </Typography>


        </Box>
    );
}