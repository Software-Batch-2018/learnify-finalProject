import { AbsoluteSpinner } from '../spinner';

/* eslint-disable-next-line */
export interface ButtonProps {
  isLoading: boolean;
  name?: string;
  type?: 'submit' | 'reset' | 'button';
  style?: 'primary' | 'danger' | 'grey';
}

export function Button({
  isLoading,
  name = 'Submit',
  type = 'button',
  style = 'primary',
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={isLoading}
      className="btn btn-lg bg-green-600 w-full flex items-center justify-center text-gray-50"
    >
      {isLoading ? (
        <div className="flex  justify-center items-center gap-2">
          <AbsoluteSpinner />
          <p>Submitting</p>
        </div>
      ) : (
        <p> {name}</p>
      )}
    </button>
  );
}
