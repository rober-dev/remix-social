import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

type Post = {
  title: string;
  body: string;
};

export const loader: LoaderFunction = async () => {
  return [
    {
      title: 'first',
      body: 'My first post',
    },
    {
      title: 'second',
      body: 'My second post',
    },
  ];
};

export default function Index() {
  const posts = useLoaderData<Post[]>();

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix</h1>
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
