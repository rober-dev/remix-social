import type { Props } from './types';

export default function PostForm({
  error,
  fields,
  method = 'post',
  ...props
}: Props) {
  return (
    <form method={method} {...props} className='flex flex-col gap-4'>
      {/* Post title */}
      <div className='mb-4 flex flex-col'>
        <label htmlFor='title' className='mb-2 text-sm'>
          Title
        </label>
        <input
          type='text'
          defaultValue={fields?.title}
          className='p-4 border border-gray-100'
          placeholder='Title of your post'
          name='title'
          id='title'
        />
        {error?.fieldErrors?.title && (
          <p className='text-red-600'>{error.fieldErrors.title}</p>
        )}
      </div>

      {/* Post body */}
      <div className='mb-4 flex flex-col'>
        <label htmlFor='body' className='mb-2 text-sm'>
          Body
        </label>
        <textarea
          rows={3}
          defaultValue={fields?.body}
          className='p-4 border border-gray-100'
          placeholder='Write something amazing'
          name='body'
          id='body'
        />
        {error?.fieldErrors?.body && (
          <p className='text-red-600'>{error.fieldErrors.body}</p>
        )}
      </div>

      {error?.formError && (
        <p className='bg-red-100 p-2 text-red-600'>{error.formError}</p>
      )}

      {/* Create Post button */}
      <div className='mb-4 flex flex-col items-center'>
        <button
          className='transition bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded'
          type='submit'
        >
          Create Post
        </button>
      </div>
    </form>
  );
}
