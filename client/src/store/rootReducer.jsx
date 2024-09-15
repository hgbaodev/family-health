import { combineReducers } from "@reduxjs/toolkit";
import { accountReducer } from "~/store/slices/AccountSlice";
import { authReducer } from "~/store/slices/AuthSlice";
import { departmentReducer } from "~/store/slices/DepartmentSlice";
import { lecturerReducer } from "~/store/slices/LecturerSlice";
import { majorReducer } from "~/store/slices/MajorSlice";
import { subjectReducer } from "~/store/slices/SubjectSlice";
import { teachingAssignmentReducer } from "~/store/slices/TeachingAssignmentSlice";
import { teachingPlanReducer } from "~/store/slices/TeachingPlanSlice";
import { teachingRegistrationReducer } from "~/store/slices/TeachingRegistrationSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  major: majorReducer,
  subject: subjectReducer,
  department: departmentReducer,
  lecturer: lecturerReducer,
  account: accountReducer,
  teachingPlan: teachingPlanReducer,
  teachingRegistration: teachingRegistrationReducer,
  teachingAssignment: teachingAssignmentReducer,
});

export default rootReducer;
