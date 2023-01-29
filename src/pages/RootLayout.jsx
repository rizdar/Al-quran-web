import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';

export default function RootLayout() {
  return (
    <>
      <Link to="/">
        <Logo>
          <h2>Al-Quran</h2>
          <span>web - Indonesia</span>
        </Logo>
      </Link>

      <MainLayout>
        <Outlet />
      </MainLayout>
    </>
  );
}

const Logo = styled.div`
  color: #c0abab;
  padding-top: 12px;

  h2 {
    @media (max-width: 640px) {
      font-size: 16px;
    }
  }
  span {
    display: block;
    margin-top: -6px;
    font-size: 14px;
    @media (max-width: 640px) {
      font-size: 11px;
    }
  }
`;

const MainLayout = styled.main`
  text-align: center;
`;
