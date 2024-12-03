'use server'

import { redirect } from 'next/navigation';
import { db } from '@/db';

const editSnippet = async (id: number, code: string) => {
  await db.snippet.update({
    where: {id},
    data: {code},
  });

  redirect(`/snippets/${id}`);
}

const createSnippet = async (
  formState: {
    message: string
  },
  formData: FormData,
) => {
  const title = formData.get('title');

  const code = formData.get('code');

  if (typeof title !== 'string' || title.length < 3) {
    return {
      message: 'Title must be longer',
    };
  }

  if (typeof code !== 'string' || code.length < 10) {
    return {
      message: 'Code must be longer',
    };
  }

  try {
    const snippet = await db.snippet.create({
      data: {
        title,
        code,
      },
    });

    redirect(`/snippets/${snippet.id}`);

    // throw new Error('Failed to save data to database');
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    } else {
      return {
        message: 'Something went wrong',
      }
    }
  }
}

const deleteSnippet = async (id: number) => {
  await db.snippet.delete({
    where: { id },
  });

  redirect(`/`);
}

export {
  createSnippet,
  deleteSnippet,
  editSnippet,
}
