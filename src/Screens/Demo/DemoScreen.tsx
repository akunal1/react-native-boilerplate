/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent, Suspense} from 'react';
import {View, Text, Button, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';

import _get from 'lodash/get';

import styles from './DemoScreen.styles';
import {GlobalState} from '../../Store';

import {
  allEmployeeDetailsRequest,
  employeeDetailsByIdRequest,
} from '../../Store/Demo/action';
import {
  AllEmployees,
  singleEmpInput,
  SingleEmployees,
} from '../../Types/demo/demoTypes';
import {
  getAllEmployeesDetails,
  getEmployeeDetailsById,
} from '../../Store/Demo/selectors';
import ErrorBoundary from '../../Components/ErrorBoundary/ErrorBoundary';

import EmployeeTable from '../../Components/demo-components/EmployeeTable';
import GetEmployeeById from '../../Components/demo-components/GetById';

export interface Props {
  allEmployeeDetailsRequest?: typeof allEmployeeDetailsRequest;
  allEmployeeDetailsData?: typeof allEmployeeDetailsRequest;

  employeeDetailsByIdRequest?: typeof employeeDetailsByIdRequest;
  employeeDetailsByIdData?: typeof employeeDetailsByIdRequest;

  allEmployees?: AllEmployees;
  singleEmployee?: SingleEmployees;
}

interface DemoScreenState {
  screen: string;
}

class DemoScreen extends PureComponent<Props, DemoScreenState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      screen: 'getAll',
    };
  }

  getAllDetails = () => {
    const {allEmployeeDetailsData} = this.props;
    if (allEmployeeDetailsData) {
      allEmployeeDetailsData();
    }
  };

  getEmployeeById = (value: any) => {
    const {employeeDetailsByIdData} = this.props;
    if (employeeDetailsByIdData) {
      employeeDetailsByIdData(_get(value, 'id', ''));
    }
  };

  loadComponentData = () => {
    this.getAllDetails();
  };

  __retry = () => {
    this.setState({screen: 'getAll'});
  };

  curdOperation = (type: string) => {
    if (type === 'getAll') {
      this.setState({screen: 'getAll'});
      this.getAllDetails();
    } else if (type === 'getById') {
      this.setState({screen: 'getById'});
    } else if (type === 'error') {
      this.setState({screen: 'error'});
    }
  };

  keyExtractor = (item: any) => item && item.id;

  render() {
    const {screen} = this.state;
    const checkGetId =
      screen === 'getById' &&
      _get(this.props, 'singleEmployee.errorMessage', '');

    const getEmployeeById = (value: string) => this.getEmployeeById(value);
    return (
      <ErrorBoundary retry={this.__retry}>
        <Suspense fallback={<ActivityIndicator />}>
          <View style={styles.screen} testID="DemoScreen_container">
            <Text style={styles.header}>Employee Details</Text>
            <View style={styles.btnContainer}>
              <Button
                onPress={() => this.curdOperation('getAll')}
                title="Get All Employees"
                testID="DemoScreen_GetAllBtn"
              />
              <Button
                onPress={() => this.curdOperation('getById')}
                title="Get Emp. by ID"
              />
              <Button
                color="red"
                onPress={() => this.curdOperation('error')}
                title="Test Error"
              />
            </View>

            {screen === 'getAll' && (
              <EmployeeTable tableData={_get(this.props, 'allEmployees', {})} />
            )}
            {screen === 'getById' && (
              <GetEmployeeById
                handleSubmitForm={getEmployeeById}
                isApiLoading={_get(
                  this.props,
                  'singleEmployee.isLoading',
                  false,
                )}
              />
            )}

            {checkGetId ? (
              <View style={styles.margin16}>
                {!_get(this.props, 'singleEmployee.isLoading', false) && (
                  <Text
                    style={{
                      backgroundColor: 'yellow',
                      color: 'red',
                      padding: 16,
                    }}>
                    {_get(this.props, 'singleEmployee.errorMessage', '')}
                  </Text>
                )}
              </View>
            ) : (
              _get(this.props, 'singleEmployee.data', []).length > 0 &&
              screen === 'getById' && (
                <EmployeeTable
                  tableData={_get(this.props, 'singleEmployee', {})}
                />
              )
            )}
          </View>
        </Suspense>
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  allEmployees: getAllEmployeesDetails(state),
  singleEmployee: getEmployeeDetailsById(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  allEmployeeDetailsData: () => dispatch(allEmployeeDetailsRequest()),
  employeeDetailsByIdData: (params: singleEmpInput) =>
    dispatch(employeeDetailsByIdRequest(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DemoScreen);
