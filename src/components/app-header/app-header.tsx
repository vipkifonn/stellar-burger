import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { Outlet } from 'react-router-dom';
import { getUserName } from '@selectors';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const userName = useSelector(getUserName);

  return (
    <>
      <AppHeaderUI userName={userName} />
      <Outlet />
    </>
  );
};
