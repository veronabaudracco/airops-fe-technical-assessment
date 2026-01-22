import { Button } from './Button';

interface FeedbackAction {
  label: string;
  onClick: () => void;
}

interface FeedbackMessageProps {
  title: string;
  message?: string | null;
  action?: FeedbackAction;
}

export const FeedbackMessage = ({ title, message, action }: FeedbackMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-lg border border-gray-200">
      <p className="text-lg font-medium text-gray-500">{title}</p>
      {message && (
        <p className="text-sm mt-2 text-gray-400">{message}</p>
      )}
      {action && (
        <Button
          onClick={() => {
            action.onClick();
          }}
          className="mt-4 px-4 py-2 bg-brand-purple text-white text-sm font-medium rounded-md hover:opacity-90 transition-opacity"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
};
