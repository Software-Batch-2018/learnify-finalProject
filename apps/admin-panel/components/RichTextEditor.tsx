import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const ReactQuill = dynamic(() => import('react-quill').then((c) => c), {
  ssr: false,
});

const toolBarOptions = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link'],
    ['clean'],
  ],
};

interface Props {
  // value: string;
  onChange: (value: string) => void;
  defaultValue?: string;
  placeholder?: string;
}

function RichTextEditor({ onChange, defaultValue, placeholder }: Props) {
  const [_initial, _setInitial] = useState(true);

  useEffect(() => {
    _setInitial(false);
  }, []);

  return _initial ? null : (
    <ReactQuill
      {...{
        defaultValue,
        placeholder,
        onChange,
      }}
      theme="snow"
      modules={toolBarOptions}
    />
  );
}

export default RichTextEditor;
