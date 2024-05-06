'use client';
import React from 'react';
// import { toast } from '@/components/ui/use-toast';

// export default function ErrorComponent({ error, resetErrorBoundary }) {

//     return (
//         <div>
//             {
//                 <>
//                     {toast({
//                         title: 'An error occurred',
//                         description: error.message,
//                     })}
//                 </>
//             }
//         </div>
//     )
// }

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
      console.log('errorListener', event);
      this.props.toast({
        title: 'An error occurred',
        description: event.message,
      });
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.log('Error caught in getDerivedStateFromError:', error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log('Error caught by ErrorBoundary:', error);
    console.log('Error info:', errorInfo);
    this.setState({ hasError: true });
    this.props.toast({
      title: 'An error occurred',
      description: error.message,
    });
    console.log({ error, errorInfo });
  }

  componentDidMount(): void {
    window.addEventListener('error', this.errorListener);
  }

  componentWillUnmount(): void {
    window.removeEventListener('error', this.errorListener);
  }

  render() {
    // if (this.state.hasError) {
    //   return (
    //     <div>
    //       <h2>Oops, there is an error!</h2>
    //       <button onClick={() => this.setState({ hasError: false })}>
    //         Try again?
    //       </button>
    //     </div>
    //   );
    // }
    return this.props.children;
  }
}

export default withToast(ErrorBoundary);
