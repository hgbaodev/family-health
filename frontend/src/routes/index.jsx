import { AdminRoutes } from "~/routes/AdminRoutes";
import { AuthRoutes } from "./AuthRoutes";
import { DashboardRoutes } from "./DashboardRoutes";
import { ErrorRoutes } from "./ErrorRoutes";
import { HomeRoutes } from "./HomeRoutes";

export const ThemeRoutes = [AuthRoutes, HomeRoutes, DashboardRoutes, AdminRoutes, ErrorRoutes];