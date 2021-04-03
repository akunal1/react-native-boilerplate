import React from 'react';
import {ErrorView} from './ErrorView';

interface Props {
  retry?: () => void;
  isError?: boolean;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError() {
    return {hasError: true};
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidCatch(error: any, errorInfo: any) {
    // TODO : log Error Here
  }

  // Retry component error before props error
  _retry = () => {
    const {hasError} = this.state;
    const {retry} = this.props;
    if (hasError) {
      this.setState({hasError: false});
    } else {
      retry && retry();
    }
  };

  render() {
    const {hasError} = this.state;
    const {isError, children} = this.props;

    if (hasError || isError) {
      return <ErrorView {...this.props} retry={this._retry} />;
    }

    return children;
  }
}
