import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from "react-redux";

const store = configureStore({
  reducer: rootReducer,
});

const { dispatch } = store;

const useDispatch = () => useAppDispatch();
const useSelector = useAppSelector;

export { store, dispatch, useSelector, useDispatch };
