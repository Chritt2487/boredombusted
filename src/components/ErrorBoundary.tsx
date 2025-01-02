import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error) {
    console.error('Questionnaire error:', error);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 text-center">
          <h2 className="text-xl font-semibold text-[#7E69AB]">Oops! Something went wrong</h2>
          <p className="text-gray-600">Don't worry, we're here to help. Try refreshing the page.</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-[#9b87f5] hover:bg-[#7E69AB]"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Refresh Page
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;