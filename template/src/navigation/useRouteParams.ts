import { useRoute } from '@react-navigation/native';

export const useRouteParams = <TParams = unknown>(): TParams | undefined => {
  const route = useRoute();
  return (route?.params as unknown as TParams) ?? undefined;
};
