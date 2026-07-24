import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query';
import { axiosAPI } from '@/services/api';
import { ENDPOINTS, QUERY_KEYS } from '@/constants';
import { CreatePostPayload, Post } from '@/types';

export const addPost = (payload: CreatePostPayload): Promise<Post> => {
  return axiosAPI.post<Post>(ENDPOINTS.POSTS, payload);
};

export const useMutationAddPost = (): UseMutationResult<Post, Error, CreatePostPayload> => {
  const queryClient = useQueryClient();

  return useMutation<Post, Error, CreatePostPayload>({
    mutationFn: (payload: CreatePostPayload) => addPost(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POSTS });
    },
  });
};
