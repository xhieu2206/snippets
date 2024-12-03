'use client';
import { Editor } from '@monaco-editor/react';
import type { Snippet } from '@prisma/client';
import { useState } from 'react';

interface SnippetEditFormProps {
  snippet: Snippet
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [code, setCode] = useState(snippet.code);

  const handleChange = (value: string = '') => {
    setCode(value);
  }

  return (
    <div>
      <Editor
        defaultValue={snippet.code}
        height='40vh'
        language='javascript'
        theme='vs-dark'
        onChange={handleChange}
      />
    </div>
  )
}
