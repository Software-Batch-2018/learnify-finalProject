import { prettyPrintJson } from 'pretty-print-json';
import { useEffect, useRef } from 'react';
import { IQuiz } from './types';

interface ISchemaViewerProps {
  quiz: IQuiz;
}

export function SchemaViewer({ quiz }: ISchemaViewerProps) {
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    preRef.current!.innerHTML = prettyPrintJson.toHtml(quiz, { indent: 2 });
  }, [quiz]);

  return (
    <section className="border mt-[20px] rounded-half p-[20px] mb-[20px] text-[12px]">
      <pre ref={preRef}></pre>
    </section>
  );
}
