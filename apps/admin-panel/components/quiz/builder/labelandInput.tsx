import clsx from 'clsx';
import React from 'react';

interface PartialProps {
  label: string;
  labelIcon?: React.ReactElement;
}

type DefaultProps = PartialProps &
  Omit<InputProps, 'className'> & { onRenderInput?: undefined };

type OverwrittenProps = PartialProps &
  Omit<InputProps, 'className'> & {
    onRenderInput: (inputProps: InputProps) => React.ReactElement;
  };

export function LabelAndInput(props: DefaultProps | OverwrittenProps) {
  return (
    <label className="flex flex-col w-full mb-[20px]">
      <span className="text-[14px] mb-[10px]">
        <>
          {props.labelIcon}
          {props.label}
        </>
      </span>

      {props.onRenderInput ? (
        props.onRenderInput(props)
      ) : (
        <Input onChange={props.onChange} value={props.value} />
      )}
    </label>
  );
}

interface InputProps {
  className?: string;
  onChange: (value: string) => void;
  value: string | undefined;
}

export const Input = ({
  className = '',
  onChange,
  value,
}: InputProps): React.ReactElement => (
  <input
    onChange={(e: any) => {
      onChange(e.target.value);
    }}
    value={value}
    className={clsx('rounded-half p-[10px] border', className)}
  />
);
