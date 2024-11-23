import React from 'react';
import DashboardLayout from '~/layouts/DashboardLayout';
import Loadable from '~/components/Loadable';
import PrivateRoute from '~/guards/PrivateRoute';

const VaccinationPage = Loadable(React.lazy(() => import('~/pages/manager/VaccinationPage')));
const AppointmentPage = Loadable(React.lazy(() => import('~/pages/manager/AppointmentPage')));
const MemberPage = Loadable(React.lazy(() => import('~/pages/manager/MemberPage')));
const AllergyPage = Loadable(React.lazy(() => import('~/pages/manager/AllergyPage')));
const EmergencyContactPage = Loadable(React.lazy(() => import('~/pages/manager/EmergencyContactPage')));
const MedicalRecordPage = Loadable(React.lazy(() => import('~/pages/manager/MedicalRecordPage')));
const HelpPage = Loadable(React.lazy(() => import('~/pages/manager/HelpPage')));
const HealthStatsPage = Loadable(React.lazy(() => import('~/pages/manager/HealthStatsPage')))
const ChatPage = Loadable(React.lazy(() => import('~/pages/manager/ChatPage')))

export const DashboardRoutes = {
  children: [
    {
      path: '/manager',
      element: <PrivateRoute component={DashboardLayout} />,
      children: [
        {
          path: '',
          element: <MemberPage />
        },
        {
          path: 'allergies',
          element: <AllergyPage />
        },
        {
          path: 'vaccinations',
          element: <VaccinationPage />
        },
        {
            path: 'emergency-contacts',
            element: <EmergencyContactPage />
        },
        {
          path: 'medical-records',
          element: <MedicalRecordPage />
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
