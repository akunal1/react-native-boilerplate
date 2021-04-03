import {ApiResponse} from 'apisauce';
import {call, put} from 'redux-saga/effects';
import {DemoGetPostApi} from '../../Services/DemoApi';
import * as actions from './action';

export function* getAllEmployeesRequest(api: DemoGetPostApi) {
  try {
    const response: ApiResponse<any, any> = yield call(api.allEmployees);
    const result = response.data;
    console.log('response-->', response);

    if (response.ok) {
      yield put(actions.allEmployeeDetailsSuccess(result.data));
    } else {
      yield put(actions.allEmployeeDetailsFailure(response.problem));
    }
  } catch (error) {
    yield put(actions.allEmployeeDetailsFailure(error));
  }
}

export function* employeeByIdReducerRequest(api: DemoGetPostApi, action: any) {
  try {
    const response: ApiResponse<any, any> = yield call(
      api.employeeById,
      action.id,
    );
    const result = response.data;
    if (response.ok) {
      yield put(actions.employeeDetailsByIdSuccess(result.data));
    } else {
      yield put(
        actions.employeeDetailsByIdFailure(
          `Error in fetching Employee Data : ${response.problem}`,
        ),
      );
    }
  } catch (error) {
    yield put(actions.employeeDetailsByIdFailure(error));
  }
}
