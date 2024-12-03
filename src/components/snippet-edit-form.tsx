'use client';
import { Editor } from '@monaco-editor/react';
import type { Snippet } from '@prisma/client';

interface SnippetEditFormProps {
  snippet: Snippet
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  return (
    <div>
      <Editor
        defaultValue={snippet.code}
        height='40vh'
        language='javascript'
        theme='vs-dark'
      />
    </div>
  )
}
