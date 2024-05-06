'use client';
import React from 'react';
import withToast from './withToast';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  toast: any;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  errorListener: EventListenerOrEventListenerObject;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
    this.errorListener = event => {
      this.props.toast({
        title: 'An error occurred',
        description: event.message,
      });
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({ hasError: true });
    this.props.toast({
      title: 'An error occurred',
      description: error.message,
    });
  }

  componentDidMount(): void {
    window.addEventListener('error', this.errorListener);
  }

  componentWillUnmount(): void {
    window.removeEventListener('error', this.errorListener);
  }

  render() {
    return this.props.children;
  }
}

export default withToast(ErrorBoundary);
