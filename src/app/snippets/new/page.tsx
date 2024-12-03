'use client';

import * as actions from '@/actions';
import { useActionState } from 'react';

export default function SnippetCreatePage() {
  // const createSnippet = async (formData: FormData) => {
  //   // this needs to be a server action!
  //   'use server';
  //
  //   // check the user's inputs and make sure they are valid
  //   const title = formData.get('title') as string;
  //
  //   const code = formData.get('code') as string;
  //
  //   // create a new record in the database
  //   const snippet = await db.snippet.create({
  //     data: {
  //       title,
  //       code,
  //     },
  //   });
  //
  //   // redirect the user back to the root route
  //   redirect('/');
  // }

  const [formState, action] = useActionState(actions.createSnippet, {
    message: '',
  });

  return <form action={action}>
    <h3 className='font-bold m-3'>Create a Snippet</h3>

    <div className='flex flex-col gap-2'>
      <div className='flex gap-4'>
        <label className='w-12' htmlFor='title'>Title</label>

        <input
          name='title'
          className='border rounded p-2 w-full'
        />
      </div>

      <div className='flex gap-4'>
        <label className='w-12' htmlFor='code'>Code</label>

        <textarea
          name='code'
          className='border rounded p-2 w-full'
        />
      </div>

      <div><span className='text-red-600 text-sm'>
        { formState.message }
      </span></div>

      <button type='submit' className='rounded p-2 bg-blue-200'>Create</button>
    </div>
  </form>
}
