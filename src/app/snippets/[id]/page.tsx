import { notFound } from 'next/navigation';
import { db } from '@/db';
import Link from 'next/link';
import * as actions from '@/actions';

interface SnippetShowPageProps {
  params: Promise<
    {
      id: string;
    }
  >
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
  await new Promise((r) => setTimeout(r, 1000));

  const { id } = await props.params;

  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(id) },
  });

  if (!snippet) {
    return notFound();
  }

  const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id);

  return <div>
    <div className='flex m-4 justify-between items-center'>
      <h1 className='text-xl font-bold'>{snippet.title}</h1>

      <div className='flex gap-2'>
        <Link
          className='p-2 border rounded'
          href={`/snippets/${id}/edit`}
        >Edit</Link>

        <form action={deleteSnippetAction}>
          <button className='p-2 border rounded'>Delete</button>
        </form>
      </div>
    </div>

    <pre className='p-3 border rounded bg-gray-200 border-gray-200'>{snippet.code}</pre>
  </div>
}

export async function generateStaticParams() {
  const snippets = await db.snippet.findMany();

  return snippets.map(snippet => {
    return {
      id: snippet.id.toString(),
    }
  })
}
