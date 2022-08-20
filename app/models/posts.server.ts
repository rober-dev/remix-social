// Custom libs
import { db } from '~/utils/db.server';

// Types
export type { Post } from '@prisma/client';

// Methods
export const getPosts = () => db.post.findMany({});
