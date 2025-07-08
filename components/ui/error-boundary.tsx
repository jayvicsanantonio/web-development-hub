'use client';

import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log error to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      // Replace with your error monitoring service
      console.error('Error caught by boundary:', error, errorInfo);
    } else {
      console.error('Error caught by boundary:', error, errorInfo);
    }

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="max-w-md w-full mx-auto p-6">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <AlertTriangle className="h-16 w-16 text-red-500" />
              </div>
              
              <h1 className="text-2xl font-bold text-foreground mb-4">
                Something went wrong
              </h1>
              
              <p className="text-foreground-muted mb-6">
                We're sorry, but something unexpected happened. Please try refreshing the page or go back to the homepage.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={this.handleRetry}
                  className="inline-flex items-center justify-center px-4 py-2 bg-accent-neon text-black rounded-md hover:bg-accent-neon/80 transition-colors"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </button>
                
                <button
                  onClick={() => window.location.href = '/'}
                  className="inline-flex items-center justify-center px-4 py-2 border border-border text-foreground rounded-md hover:bg-accent/10 transition-colors"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </button>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-6 text-left">
                  <summary className="cursor-pointer text-sm font-medium text-foreground-muted hover:text-foreground">
                    Error Details (Development Only)
                  </summary>
                  <div className="mt-2 p-4 bg-muted rounded-md overflow-auto">
                    <pre className="text-xs text-foreground-muted">
                      {this.state.error.message}
                      {this.state.error.stack}
                    </pre>
                  </div>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook-based error boundary for functional components
export const useErrorHandler = () => {
  const handleError = (error: Error, errorInfo?: React.ErrorInfo) => {
    if (process.env.NODE_ENV === 'production') {
      // Log to monitoring service
      console.error('Application error:', error, errorInfo);
    } else {
      console.error('Application error:', error, errorInfo);
    }
  };

  return { handleError };
};

// Async error boundary for handling promise rejections
export const useAsyncError = () => {
  const [, setError] = React.useState();
  return React.useCallback(
    (error: Error) => {
      setError(() => {
        throw error;
      });
    },
    [setError]
  );
};

// Error fallback component for specific sections
export const ErrorFallback: React.FC<{
  error?: Error;
  resetError?: () => void;
  message?: string;
}> = ({ error, resetError, message = "Something went wrong in this section" }) => {
  return (
    <div className="border border-border rounded-lg p-6 bg-background text-center">
      <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {message}
      </h3>
      <p className="text-foreground-muted mb-4">
        Please try refreshing this section or contact support if the problem persists.
      </p>
      {resetError && (
        <button
          onClick={resetError}
          className="inline-flex items-center justify-center px-4 py-2 bg-accent-neon text-black rounded-md hover:bg-accent-neon/80 transition-colors"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </button>
      )}
      {process.env.NODE_ENV === 'development' && error && (
        <details className="mt-4 text-left">
          <summary className="cursor-pointer text-sm font-medium text-foreground-muted hover:text-foreground">
            Error Details
          </summary>
          <pre className="mt-2 p-2 bg-muted rounded text-xs text-foreground-muted overflow-auto">
            {error.message}
          </pre>
        </details>
      )}
    </div>
  );
};