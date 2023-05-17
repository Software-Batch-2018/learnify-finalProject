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

export default Button;
