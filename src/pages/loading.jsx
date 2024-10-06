import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';


export default function LoadingPage() {
    return (
        // loading
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <Spin size="large" />
        </div>


    );
}
