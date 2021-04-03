import {GlobalState} from '../../Types/demo/demoTypes';

export const getAllEmployeesDetails = (state: GlobalState) =>
  state.allEmployees;

export const getEmployeeDetailsById = (state: GlobalState) =>
  state.employeeById;
