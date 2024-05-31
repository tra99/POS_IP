import { useState } from 'react';
import { Row, Col, Card, Statistic, Table, Tag, Pagination,Input,Space } from 'antd';
import { Bar, Pie } from '@ant-design/charts';
import { DollarOutlined ,AudioOutlined} from '@ant-design/icons';
import '../style/Dashboard.css';


const Dashboard = () => {
  const salesData = [
    { day: 'Mon', type: 'Sales', value: 21 },
    { day: 'Mon', type: 'Purchases', value: 10 },
    { day: 'Tue', type: 'Sales', value: 23 },
    { day: 'Tue', type: 'Purchases', value: 15 },
    { day: 'Wed', type: 'Sales', value: 27 },
    { day: 'Wed', type: 'Purchases', value: 23 },
    { day: 'Thu', type: 'Sales', value: 25 },
    { day: 'Thu', type: 'Purchases', value: 17 },
    { day: 'Fri', type: 'Sales', value: 29 },
    { day: 'Fri', type: 'Purchases', value: 28 },
    { day: 'Sat', type: 'Sales', value: 28 },
    { day: 'Sat', type: 'Purchases', value: 25 },
    { day: 'Sun', type: 'Sales', value: 31 },
    { day: 'Sun', type: 'Purchases', value: 30 },
  ];

  const pieData = [
    { type: 'Beauty', value: 21, color: '#0160C9' },
    { type: 'Beverage', value: 21, color: '#0D85D8' },
    { type: 'Food-Meat', value: 21, color: '#1CA3DE' },
    { type: 'Snack', value: 10, color: '#3ACBE8' },
  ];

  const transactionData = [
    { key: '1', customer: 'Chab Sreylen', createdOn: '21 Feb 2024', status: 'Pending', orderDetail: 'Banana', amount: '$32.8' },
    { key: '2', customer: 'Sophorn Socrety', createdOn: '21 Feb 2024', status: 'Paid', orderDetail: 'Orange', amount: '$100.00' },
    { key: '3', customer: 'Pom Mouylang', createdOn: '21 Feb 2024', status: 'Paid', orderDetail: 'Apple', amount: '$123.67' },
    { key: '4', customer: 'Pom Mouylang', createdOn: '21 Feb 2024', status: 'Paid', orderDetail: 'Watermelon', amount: '$25.76' },
    { key: '5', customer: 'Customer 5', createdOn: '21 Feb 2024', status: 'Pending', orderDetail: 'Grapes', amount: '$45.50' },
    { key: '6', customer: 'Customer 6', createdOn: '21 Feb 2024', status: 'Paid', orderDetail: 'Pineapple', amount: '$70.00' },
    { key: '7', customer: 'Customer 7', createdOn: '21 Feb 2024', status: 'Pending', orderDetail: 'Peach', amount: '$15.20' },
    { key: '8', customer: 'Customer 8', createdOn: '21 Feb 2024', status: 'Paid', orderDetail: 'Mango', amount: '$33.90' },
    { key: '9', customer: 'Customer 9', createdOn: '21 Feb 2024', status: 'Pending', orderDetail: 'Kiwi', amount: '$22.60' },
    { key: '10', customer: 'Customer 10', createdOn: '21 Feb 2024', status: 'Paid', orderDetail: 'Papaya', amount: '$18.30' },
    { key: '11', customer: 'Customer 11', createdOn: '21 Feb 2024', status: 'Pending', orderDetail: 'Plum', amount: '$26.40' },
    { key: '12', customer: 'Customer 12', createdOn: '21 Feb 2024', status: 'Paid', orderDetail: 'Lychee', amount: '$29.50' },
  ];

  const columns = [
    { title: 'Customer', dataIndex: 'customer', key: 'customer' },
    { title: 'Created On', dataIndex: 'createdOn', key: 'createdOn' },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (status) => <Tag color={status === 'Pending' ? 'volcano' : 'green'}>{status}</Tag> },
    { title: 'Order Detail', dataIndex: 'orderDetail', key: 'orderDetail' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
  ];

  const salesConfig = {
    data: salesData,
    xField: 'day',
    yField: 'value',
    color: ['#5B8FF9', '#5AD8A6'],
    seriesField: 'type',
    isGroup: true,
    legend: { position: 'top' },
  };
  
  

  const pieConfig = {
    appendPadding: 10,
    data: pieData,
    angleField: 'value',
    colorField: 'color',
    radius: 0.8,
    label: { type: 'outer', content: '{name} {percentage}' },
    color: ['#0160C9', '#0D85D8', '#1CA3DE', '#3ACBE8'], 
  };

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedTransactions = transactionData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );



  return (
    <div className="dashboard-container">
      <div className="earnings-container">
        <div className="earning-card">
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Statistic
              title="Today's Earnings"
              style={{ color: 'black', fontWeight: 'semi-bold' }}
              value={1096.45}
              prefix={<DollarOutlined />}
              precision={2}
              valueStyle={{ color: '#0160C9' }}
            />
            <img src="src/assets/Stack_of_Money.png" alt="logo" style={{ marginLeft: '16px' }} />
          </div>
        </Card>

        </div>
        <div className="earning-card">
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Statistic
                title="Weekly Earnings"
                style={{ color: 'black', fontWeight: 'semi-bold' }}
                value={95000.45}
                prefix={<DollarOutlined />}
                precision={2}
                valueStyle={{ color: '#0160C9' }}
              />
              <img src="src/assets/Increase.png" alt="logo" style={{ marginLeft: '16px' }} />
            </div>
          </Card>
        </div>
        <div className="earning-card">
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Statistic title="Customers" value={100} valueStyle={{ color: '#0160C9' }}/>
              <img src="src/assets/user.png" alt="logo" style={{ marginLeft: '16px' }} />
            </div>
          </Card>
        </div>
        <div className="earning-card">
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Statistic title="Customers" value={100} valueStyle={{ color: '#0160C9' }}/>
              <img src="src/assets/invoice.png" alt="logo" style={{ marginLeft: '16px' }} />
            </div>
          </Card>
        </div>
      </div>

      <Row gutter={16}>
        <Col span={24} className="graph">
          <Card title="This Week Sales & Purchases" className="grahp-container">
            <Bar {...salesConfig} />
          </Card>
          <Card title="Top Selling Products (2024)" className="grahp-container">
            <Pie {...pieConfig} />
          </Card>
        </Col>
      </Row>

      <div className="table">
        <Row gutter={16} style={{ marginTop: 20 }}>
          <Col span={24}>
            <Card title="Recent Transactions">
              <Table
                dataSource={paginatedTransactions}
                columns={columns}
                pagination={false}
              />
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={transactionData.length}
                onChange={handlePageChange}
                style={{ marginTop: '20px', textAlign: 'center' }}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: 20 }}>
          <Col span={24}>
            <Card title="Best Seller">
              <ul className="best-seller-list">
                <li>
                  Apple <span className="sales">$8.90</span>
                </li>
                <li>
                  Orange <span className="sales">$5.25</span>
                </li>
                <li>
                  Banana <span className="sales">$2.30</span>
                </li>
                <li>
                  Strawberry <span className="sales">$12.80</span>
                </li>
              </ul>
            </Card>
          </Col>
        </Row>
      </div>
      
    </div>
  );
};

export default Dashboard;
