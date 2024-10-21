import React from 'react';
import DashboardLayout from '~/layouts/DashboardLayout';
import Loadable from '~/components/Loadable';
import PrivateRoute from '~/guards/PrivateRoute';
import VaccinationPage from '~/pages/manager/VaccinationPage';

const DashBoardPage = Loadable(React.lazy(() => import('~/pages/manager/DashBoardPage')));
const MemberPage = Loadable(React.lazy(() => import('~/pages/manager/MemberPage')));
const AllergyPage = Loadable(React.lazy(() => import('~/pages/manager/AllergyPage')));
const MedicationPage = Loadable(React.lazy(() => import('~/pages/manager/MedicationPage')));
const EmergencyContactPage = Loadable(React.lazy(() => import('~/pages/manager/EmergencyContactPage')));
const HelpPage = Loadable(React.lazy(() => import('~/pages/manager/HelpPage')));
// const AccountSetting =Loadable(React.lazy(() => import('~/pages/manager/AccountSettingPage')));
export const DashboardRoutes = {
  children: [
    {
      path: '/manager',
      element: <DashboardLayout />,
      children: [
        {
          path: '',
          element: <DashBoardPage />
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
        },
        {
          path: 'vaccinations',
          element: <PrivateRoute component={VaccinationPage} />
        },
        {
            path: 'emergency-contacts',
            element: <PrivateRoute component= {EmergencyContactPage} />
        },
//         {
//           path: 'account-settings',
//           element: <PrivateRoute component= {AccountSettingPage} />
//         },
        {
            path: 'help-support',
            element: <PrivateRoute component= {HelpPage} />
        }

      ]
    }
  ]
};
