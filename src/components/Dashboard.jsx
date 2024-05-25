import { Row, Col, Card, Statistic, Table, Tag } from 'antd';
import { Area, Pie } from '@ant-design/charts';
import { UserOutlined, ShoppingCartOutlined, DollarOutlined } from '@ant-design/icons';
import '../style/Dashboard.css';

const Dashboard = () => {
  const salesData = [
    { day: 'Mon', sales: 21, purchases: 10 },
    { day: 'Tue', sales: 23, purchases: 15 },
    { day: 'Wed', sales: 27, purchases: 23 },
    { day: 'Thu', sales: 25, purchases: 17 },
    { day: 'Fri', sales: 29, purchases: 28 },
    { day: 'Sat', sales: 28, purchases: 25 },
    { day: 'Sun', sales: 31, purchases: 30 },
  ];

  const pieData = [
    { type: 'Beauty', value: 21 },
    { type: 'Beverage', value: 21 },
    { type: 'Food-Meat', value: 21 },
    { type: 'Snack', value: 10 },
  ];

  const transactions = [
    {
      key: '1',
      customer: 'Chab Sreylen',
      createdOn: '21 Feb 2024',
      status: 'Pending',
      orderDetail: 'Banana',
      amount: '$32.8',
    },
    {
      key: '2',
      customer: 'Sophorn Socrety',
      createdOn: '21 Feb 2024',
      status: 'Paid',
      orderDetail: 'Orange',
      amount: '$100.00',
    },
    {
      key: '3',
      customer: 'Pom Mouylang',
      createdOn: '21 Feb 2024',
      status: 'Paid',
      orderDetail: 'Apple',
      amount: '$123.67',
    },
    {
      key: '4',
      customer: 'Pom Mouylang',
      createdOn: '21 Feb 2024',
      status: 'Paid',
      orderDetail: 'Watermelon',
      amount: '$25.76',
    },
  ];

  const columns = [
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Created On',
      dataIndex: 'createdOn',
      key: 'createdOn',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Tag color={status === 'Pending' ? 'volcano' : 'green'}>{status}</Tag>
      ),
    },
    {
      title: 'Order Detail',
      dataIndex: 'orderDetail',
      key: 'orderDetail',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
  ];

  const salesConfig = {
    data: salesData,
    xField: 'day',
    yField: 'sales',
    seriesField: 'type',
    color: ['#5B8FF9', '#5AD8A6'],
    legend: { position: 'top' },
    areaStyle: () => {
      return {
        fillOpacity: 0.5,
      };
    },
  };

  const pieConfig = {
    appendPadding: 10,
    data: pieData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
  };

  return (
    <div className="dashboard-container">
      <div className="earnings-container">
        <div className="earning-card">
          <Card>
            <Statistic
              title="Today's Earnings"
              value={1096.45}
              prefix={<DollarOutlined />}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </div>
        <div className="earning-card">
          <Card>
            <Statistic
              title="Weekly Earnings"
              value={95000.45}
              prefix={<DollarOutlined />}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </div>
        <div className="earning-card">
          <Card>
            <Statistic
              title="Customers"
              value={100}
              prefix={<UserOutlined />}
            />
          </Card>
        </div>
        <div className="earning-card">
          <Card>
            <Statistic
              title="Sales Invoice"
              value={170}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </div>
      </div>
  
      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={24}>
          <Card title="This Week Sales & Purchases">
            <Area {...salesConfig} />
          </Card>
          <Card title="Top Selling Products (2024)" style={{ marginTop: 20 }}>
            <Pie {...pieConfig} />
          </Card>
        </Col>
      </Row>
  
      { <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={24}>
          <Card title="Recent Transactions">
            <Table dataSource={transactions} columns={columns} pagination={false} />
          </Card>
        </Col>
      </Row> }
  
      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={24}>
          <Card title="Best Seller">
            <ul className="best-seller-list">
              <li>Apple <span className="sales">$8.90</span></li>
              <li>Orange <span className="sales">$5.25</span></li>
              <li>Banana <span className="sales">$2.30</span></li>
              <li>Strawberry <span className="sales">$12.80</span></li>
            </ul>
          </Card>
        </Col>
      </Row>
    </div>
  );
  

  
  
};

export default Dashboard;
