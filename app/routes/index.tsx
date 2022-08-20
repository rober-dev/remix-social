import { json } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { getPosts } from '~/models/posts.server';

import { Post } from '../components/Post';

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
      <h1 className=''>Welcome to Remix</h1>
      <ul>
        {posts?.map((post) => (
          <li key={post.title}>
            <Post header={post.title}>{post.body}</Post>
          </li>
        ))}
      </ul>
    </div>
  );
}
