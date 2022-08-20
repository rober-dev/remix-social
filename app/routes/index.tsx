import { json } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { getPosts } from '~/models/posts.server';

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>;
};

export const loader: LoaderFunction = async () => {
  const data: LoaderData = { posts: await getPosts() };
  return json(data);
};

export default function IndexRoute() {
  const { posts } = useLoaderData<LoaderData>();

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1 className='text-3xl font-bold underline'>Welcome to Remix</h1>
      <ul>
        {posts?.map((post) => (
          <li key={post.title}>
            <div>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
