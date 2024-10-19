import React from 'react';
import DashboardLayout from '~/layouts/DashboardLayout';
import Loadable from '~/components/Loadable';
import PrivateRoute from '~/guards/PrivateRoute';
import VaccinationPage from '~/pages/manager/VaccinationPage';
// import EmergencyContactPage from


const DashBoardPage = Loadable(React.lazy(() => import('~/pages/manager/DashBoardPage')));
const MemberPage = Loadable(React.lazy(() => import('~/pages/manager/MemberPage')));
const AllergyPage = Loadable(React.lazy(() => import('~/pages/manager/AllergyPage')));
const MedicationPage = Loadable(React.lazy(() => import('~/pages/manager/MedicationPage')));
const EmergencyContactPage = Loadable(React.lazy(() => import('~/pages/manager/EmergencyContactPage')));
const HelpPage = Loadable(React.lazy(() => import('~/pages/manager/HelpPage')));
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
        },
        {
          path: 'vaccinations',
          element: <PrivateRoute component={VaccinationPage} />
        },
        {
            path: 'emergencyContacts',
            element: <PrivateRoute component= {EmergencyContactPage} />
        },
        {
            path: 'help-support',
            element: <PrivateRoute component= {HelpPage} />
        }
      ]
    }
  ]
};