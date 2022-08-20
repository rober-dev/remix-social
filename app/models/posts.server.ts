import type { Post } from '@prisma/client';
import { db } from '~/utils/db.server';

// Types
export type { Post } from '@prisma/client';

// Methods
export const getPosts = () => db.post.findMany({});

export const createPost = ({ title, body }: Pick<Post, 'title' | 'body'>) => {
  return db.post.create({
    data: { title, body },
  });
};
