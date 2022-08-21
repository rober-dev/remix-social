import { json, redirect } from '@remix-run/node';
import type { LoaderFunction, ActionFunction } from '@remix-run/node';
import { useActionData, useLoaderData } from '@remix-run/react';

import { createPost, getPosts } from '~/models/posts.server';

import { Post } from '../components/Post';
import { PostForm } from '../components/PostForm';

import { CreatePost } from '../validations/Post';

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>;
};

type ActionData = {
  error: {
    formError: string[];
    fieldsError: {
      title: string[];
      body: string[];
    };
  };
  fields: {
    title?: string;
    body?: string;
  };
};

export const loader: LoaderFunction = async () => {
  const data: LoaderData = { posts: await getPosts() };
  return json(data);
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const rawTitle = form.get('title');
  const rawBody = form.get('body');
  const result = CreatePost.safeParse({ title: rawTitle, body: rawBody });

  if (!result.success) {
    return json(
      {
        error: result.error.flatten(),
        fields: {
          title: rawTitle,
          body: rawBody,
        },
      },
      { status: 400 }
    );
  }

  await createPost({
    title: result.data.title || null,
    body: result.data.body,
  });

  return redirect('/');
};

export default function IndexRoute() {
  const { posts } = useLoaderData<LoaderData>();
  const formData = useActionData<ActionData>();

  return (
    <div className='flex flex-col max-w-3xl items-center'>
      <h1 className='text-5xl mt-4 mb-10'>Remix Social</h1>
      <PostForm
        action='/?index'
        error={formData?.error}
        fields={formData?.fields}
      />

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
