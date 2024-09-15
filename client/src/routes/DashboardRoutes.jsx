import DashboardLayout from "~/layouts/DashboardLayout/index";
import Page404 from "~/pages/error/Page404";
import MajorPage from "~/pages/dashboard/MajorPage";
import SubjectPage from "~/pages/dashboard/SubjectPage";
import LecturerPage from "~/pages/dashboard/LecturerPage";
import AccountPage from "~/pages/dashboard/AccountPage";
import AuthGuard from "~/guards/AuthGuard";
import TeachingPlanPage from "~/pages/dashboard/TeachingPlan/TeachingPlanPage";
import { fetchTeachingPlan } from "~/store/slices/TeachingPlanSlice";
import { dispatch } from "~/store";
import CreateTeachingPlanPage from "~/pages/dashboard/TeachingPlan/CreateTeachingPlanPage";
import ListTeachingRegistrationPage from "~/pages/dashboard/TeachingRegistration/ListTeachingRegistrationPage";
import TeachingRegistrationPage from "~/pages/dashboard/TeachingRegistration/TeachingRegistrationPage";
import DepartmentPage from "~/pages/dashboard/DepartmentPage";
import AssignmentTeachingPlanPage from "~/pages/dashboard/TeachingPlan/AssignmentTeachingPlanPage";
import { fetchTeachingPlanAssignments } from "~/store/slices/TeachingAssignmentSlice";
import AddTrainingProgramPage from "~/pages/dashboard/TrainingProgram/AddTrainingProgramPage";

export const UserRoutes = {
  element: <AuthGuard />,
  children: [
    {
      path: "/",
      element: <DashboardLayout />,
      errorElement: <Page404 />,
      children: [
        {
          index: true,
          element: <ListTeachingRegistrationPage />,
        },
        {
          path: "categories",
          children: [
            {
              path: "majors",
              element: <MajorPage />,
            },
            {
              path: "subjects",
              element: <SubjectPage />,
            },
            {
              path: "departments",
              element: <DepartmentPage />,
            },
          ],
        },
        {
          path: "lecturers",
          element: <LecturerPage />,
        },
        {
          path: "accounts",
          element: <AccountPage />,
        },
        {
          path: "training-programs/create",
          element: <AddTrainingProgramPage />,
        },
        {
          path: "/teaching-plans",
          element: <TeachingPlanPage />,
        },
        {
          path: "teaching-plans/:id",
          element: <CreateTeachingPlanPage />,
          loader: async ({ params }) => {
            const teachingPlan = await dispatch(fetchTeachingPlan(params.id));
            return teachingPlan.payload.data;
          },
        },
        {
          path: "teaching-plans/:id/assign",
          element: <AssignmentTeachingPlanPage />,
          loader: async ({ params }) => {
            const teachingPlan = await dispatch(fetchTeachingPlanAssignments(params.id));
            return teachingPlan.payload.data;
          },
        },
        {
          path: "teaching-registration",
          element: <ListTeachingRegistrationPage />,
        },
        {
          path: "teaching-registration/:id",
          element: <TeachingRegistrationPage />,
          loader: async ({ params }) => {
            const teachingPlan = await dispatch(fetchTeachingPlan(params.id));
            return teachingPlan.payload.data;
          },
        },
      ],
    },
  ],
};
