import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { ENDPOINTS, QUERY_KEYS } from '@/constants';
import { axiosAPI } from '@/services/api';
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
