import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';

import {employeeData, AllEmployees} from '../../Types/demo/demoTypes';
import {Spacing, Colors, Font} from '../../Themes';

export interface Props {
  tableData: AllEmployees | any;
}

const styles = StyleSheet.create({
  employeeDataContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: Spacing.mediumX,
    margin: Spacing.small,
    backgroundColor: Colors.grey.light,
  },
  fullWidth: {
    flex: 1,
  },
  emptyDataContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.hugeX,
  },
  errorText: {
    flex: 1,
    backgroundColor: 'red',
    textAlign: 'center',
  },
  screen: {
    flex: 1,
  },
  headerText: {
    textAlign: 'center',
    fontSize: Font.size.largeX,
    padding: Spacing.mediumX,
  },
});

export default class EmployeeTable extends Component<Props> {
  shouldComponentUpdate(nextProps: any) {
    return !_isEqual(
      _get(this.props, 'tableData.data', {}),
      nextProps.tableData.data,
    );
  }

  // Table View for all the Employee data
  renderItem = ({item}: {item: employeeData}) => {
    return (
      <TouchableOpacity>
        <View style={styles.employeeDataContainer}>
          <Text style={styles.fullWidth}>{item.id}</Text>
          <Text style={styles.fullWidth}>
            {_get(item, 'employee_name', '')}({_get(item, 'employee_age', '')})
          </Text>
          <Text style={styles.fullWidth}>$ {item.employee_salary}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  // If you want to display messages for Empty data
  renderEmptyComponent = () => {
    const {tableData} = this.props;
    const isTableDataAvil =
      _get(tableData, 'data', []).length > 0 ||
      _get(tableData, 'errorMessage', '');
    return (
      <View style={styles.emptyDataContainer}>
        {isTableDataAvil ? (
          <Text style={styles.errorText}>
            {tableData.isLoading ? (
              <ActivityIndicator />
            ) : (
              tableData.errorMessage
            )}
          </Text>
        ) : (
          <Text> You Don&apos;t Have any Employees to Display</Text>
        )}
      </View>
    );
  };

  // creating unique keys
  keyExtractor = (item: any) => item && item.id;

  render() {
    return (
      <View style={styles.screen} testID="EmployeeTable_container">
        <Text style={styles.headerText}>ALL Employee Details</Text>
        <FlatList
          data={_get(this.props, 'tableData.data', {})}
          renderItem={this.renderItem}
          ListEmptyComponent={this.renderEmptyComponent}
          keyExtractor={this.keyExtractor}
          removeClippedSubviews={true}
          maxToRenderPerBatch={1}
          initialNumToRender={1}
        />
      </View>
    );
  }
}
