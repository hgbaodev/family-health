import React from 'react';
import DashboardLayout from '~/layouts/DashboardLayout';
import Loadable from '~/components/Loadable';
import PrivateRoute from '~/guards/PrivateRoute';

const DashBoardPage = Loadable(React.lazy(() => import('~/pages/manager/DashBoardPage')));
const MemberPage = Loadable(React.lazy(() => import('~/pages/manager/MemberPage')));
const AllergyPage = Loadable(React.lazy(() => import('~/pages/manager/AllergyPage')));
const MedicationPage = Loadable(React.lazy(() => import('~/pages/manager/MedicationPage')));

export const DashboardRoutes = {
  children: [
    {
      path: '/manager',
      element: <DashboardLayout />,
      children: [
        {
          path: '',
          element: <PrivateRoute component={DashBoardPage} />
        },
        {
          path: 'members',
          element: <PrivateRoute component={MemberPage} />
        },
        {
          path: 'allergies',
          element: <PrivateRoute component={AllergyPage} />
        },
        {
          path: 'medications' ,
          element: <PrivateRoute component={MedicationPage} />
        }
      ]
    }
  ]
};