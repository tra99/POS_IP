// import { useState } from 'react';
// import { Layout, theme } from 'antd';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
// import Dashboard from './components/Dashboard';
// import MenuComponent from './components/Menu';
// import Order from './components/Order';
// import Customer from './components/Customer';
// import Promotion from './components/Promotion';
// import Setting from './components/Setting';
// import Login from "./authentication/Login";

// const { Header, Content, Sider } = Layout;

// const App = () => {
//   const [isAuth, setIsAuth] = useState(false);

//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();

//   return (
//     <Router>
//       <Layout
//         style={{
//           minHeight: '100vh',
//         }}
//       >
//         {isAuth ? (
//           <>
//             <Sider
//               theme="light"
//               style={{
//                 border: '2px solid white',
//                 borderRadius: '10px',
//                 boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//               }}
//             >
//               <div className="logo" style={{ textAlign: 'center', padding: '16px' }}>
//                 <img src="src/assets/Logo.png" alt="Logo" style={{ width: '70%', height: 'auto' }} />
//               </div>
//               <Sidebar />
//             </Sider>
//             <Layout>
//               <Header
//                 style={{
//                   padding: 20,
//                   background: colorBgContainer,
//                 }}
//               />
//               <Content
//                 style={{
//                   margin: '0 16px',
//                 }}
//               >
//                 <Routes>
//                   <Route path="/dashboard" element={<Dashboard />} />
//                   <Route path="/menu" element={<MenuComponent />} />
//                   <Route path="/order" element={<Order />} />
//                   <Route path="/customer" element={<Customer />} />
//                   <Route path="/promotion" element={<Promotion />} />
//                   <Route path="/setting" element={<Setting />} />
//                   <Route path="*" element={<Navigate to="/dashboard" />} /> {/* Default route when authenticated */}
//                 </Routes>
//               </Content>
//             </Layout>
//           </>
//         ) : (
//           <Content
//             style={{
//               margin: '0 16px',
//             }}
//           >
//             <Routes>
//               <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
//               <Route path="*" element={<Navigate to="/login" replace />} /> {/* Redirect all other routes to login */}
//             </Routes>
//           </Content>
//         )}
//       </Layout>
//     </Router>
//   );
// };

// export default App;
// src/App.jsx
import { useState } from 'react';
import { Layout, theme ,Input} from 'antd';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import MenuComponent from './components/Menu';
import Order from './components/Order';
import Customer from './components/Customer';
import Promotion from './components/Promotion';
import Setting from './components/Setting';
import './style/Dashboard.css';
import { BellOutlined} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

const App = () => {
  const [isAuth, setIsAuth] = useState(true);
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Router>
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        {isAuth ? (
          <>
            <Sider
              theme="light"
              style={{
                border: '2px solid white',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div className="logo" style={{ textAlign: 'center', padding: '16px' }}>
                <img src="src/assets/Logo.png" alt="Logo" style={{ width: '70%', height: 'auto' }} />
              </div>
              <Sidebar />
            </Sider>
            <Layout>
            <div className="header" >
              <h1 className="text1" >Dashboard</h1>
              <div className='text2'>
                <Search
                  placeholder="input search text"
                  onSearch={onSearch}
                  style={{
                    width: 200,
                  }}
                />
                <div className="image-container">
                  <BellOutlined style={{fontSize:"20px"}}/>
                </div>
                <div className="image-container">
                  <img src="src/assets/cat.png" alt="Logo" className="login-logo" />
                </div>
              </div>
            </div>
              <Content
                style={{
                  margin: '0 16px',
                }}
              >
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/menu" element={<MenuComponent />} />
                  <Route path="/order" element={<Order />} />
                  <Route path="/customer" element={<Customer />} />
                  <Route path="/promotion" element={<Promotion />} />
                  <Route path="/setting" element={<Setting />} />
                  <Route path="*" element={<Navigate to="/login" />} /> {/* Default route */}
                </Routes>
              </Content>
            </Layout>
          </>
        ) : (
          <Navigate to="/login" replace />
        )}
      </Layout>
    </Router>
  );
};

export default App;