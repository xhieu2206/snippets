'use client';
import { Editor } from '@monaco-editor/react';
import type { Snippet } from '@prisma/client';
import { useState } from 'react';
import * as actions from '@/actions';

interface SnippetEditFormProps {
  snippet: Snippet
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [code, setCode] = useState(snippet.code);

  const handleChange = (value: string = '') => {
    setCode(value);
  }

  const editSnippetAction = actions.editSnippet.bind(null, snippet.id, code);

  return (
    <div>
      <Editor
        defaultValue={snippet.code}
        height='40vh'
        language='javascript'
        theme='vs-dark'
        onChange={handleChange}
      />

      <form action={editSnippetAction}>
        <button type='submit' className='p-2 border rounded'>Save</button>
      </form>
    </div>

  )
}
