import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { axiosAPI } from '@/services/api';
import { ENDPOINTS, QUERY_KEYS } from '@/constants';
import { Post } from '@/types';

export const getPosts = (): Promise<Post[]> => {
  return axiosAPI.get<Post[]>(ENDPOINTS.POSTS);
};

export const useQueryPosts = (): UseQueryResult<Post[], Error> => {
  return useQuery<Post[], Error>({
    queryKey: QUERY_KEYS.POSTS,
    queryFn: getPosts,
  });
};
