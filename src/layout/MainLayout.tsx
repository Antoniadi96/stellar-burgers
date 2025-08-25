import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppHeader } from '@components/app-header';

const MainLayout: React.FC = () => (
  <>
    {/* Шапка из ui */}
    <AppHeader />

    {/* Основное содержимое страниц */}
    <div className='container'>
      <Outlet />
    </div>
  </>
);

export default MainLayout;
