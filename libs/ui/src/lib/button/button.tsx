import { classNames } from '../utils/classNames';

/* eslint-disable-next-line */
export interface ButtonProps {
  name: string;
}

export function Button(props: ButtonProps) {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      {props.name}
    </button>
  );
}

export function PageButton({
  children,
  className,
  ...rest
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <button
      type="button"
      className={classNames(
        'relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
