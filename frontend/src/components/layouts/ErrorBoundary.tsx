import { Button, Typography } from '@material-ui/core';
import { AxiosError } from 'axios';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface OwnProps {
  style: React.CSSProperties;
}

type Props = OwnProps & RouteComponentProps;

interface ErrorInfo {
  componentStack: string;
}

interface State {
  error: AxiosError | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null
    };
  }

  public componentDidMount() {
    this.setState({
      error: null,
      errorInfo: null
    });
  }

  public componentDidUpdate(prevProps: any) {
    if (this.props.location !== prevProps.location) {
      this.setState({
        error: null,
        errorInfo: null
      });
    }
  }

  public componentDidCatch(error: AxiosError, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });
  }

  public render() {
    if (this.state.error) {
      return (
        <div style={{ textAlign: 'center' }}>
          <Typography variant='h6' gutterBottom>
            {this.state.error.response ? this.state.error.response.statusText : this.state.error.message}
          </Typography>
          <Button onClick={this.props.history.goBack}>Back to Previous Page</Button>
        </div>
      );
    }
    return <div>{this.props.children}</div>;
  }
}

export default withRouter(ErrorBoundary);
