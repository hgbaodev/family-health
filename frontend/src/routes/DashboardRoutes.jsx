import React from 'react';
import DashboardLayout from '~/layouts/DashboardLayout';
import Loadable from '~/components/Loadable';
import VaccinationPage from '~/pages/manager/VaccinationPage';
import PrivateRoute from '~/guards/PrivateRoute';
import AppointmentPage from '~/pages/manager/AppointmentPage';
import ChatPage from '~/pages/manager/ChatPage';

const DashBoardPage = Loadable(React.lazy(() => import('~/pages/manager/DashBoardPage')));
const MemberPage = Loadable(React.lazy(() => import('~/pages/manager/MemberPage')));
const AllergyPage = Loadable(React.lazy(() => import('~/pages/manager/AllergyPage')));
const MedicationPage = Loadable(React.lazy(() => import('~/pages/manager/MedicationPage')));
const EmergencyContactPage = Loadable(React.lazy(() => import('~/pages/manager/EmergencyContactPage')));
const MedicalRecordPage = Loadable(React.lazy(() => import('~/pages/manager/MedicalRecordPage')));
const DocumentPage = Loadable(React.lazy(() => import('~/pages/manager/DocumentPage')));
const HelpPage = Loadable(React.lazy(() => import('~/pages/manager/HelpPage')));
const HealthStatsPage = Loadable(React.lazy(() => import('~/pages/manager/HealthStatsPage')))
// const AccountSetting =Loadable(React.lazy(() => import('~/pages/manager/AccountSettingPage')));
export const DashboardRoutes = {
  children: [
    {
      path: '/manager',
      element: <PrivateRoute component={DashboardLayout} />,
      children: [
        {
          path: '',
          element: <DashBoardPage />
        },
        {
          path: 'members',
          element: <MemberPage />
        },
        {
          path: 'allergies',
          element: <AllergyPage />
        },
        {
          path: 'medications' ,
          element: <MedicationPage />
        },
        {
          path: 'vaccinations',
          element: <VaccinationPage />
        },
        {
            path: 'emergency-contacts',
            element: <EmergencyContactPage />
        },
//         {
//           path: 'account-settings',
//           element: <PrivateRoute component= {AccountSettingPage} />
//         },
        {
          path: 'medical-records',
          element: <MedicalRecordPage />
        },
        {
          path: 'documents',
          element: <DocumentPage />
        },
        {
            path: 'help-support',
            element: <HelpPage />
        },
        {
          path: 'health-stats',
          element: <HealthStatsPage />
        },
        {
          path: 'help-support',
          element: <HelpPage />
        },
        {
          path: 'appointments',
          element: <AppointmentPage />
        },
        {
          path: 'chat-ai',
          element: <ChatPage />
        }
      ]
    }
  ]
};
