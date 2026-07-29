import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Header } from '@/components/common';
import { useTranslation } from '@/i18n';
import { useLogout, useMutationAddPost, useQueryPosts, useTheme } from '@/hooks';
import { useAuthStore } from '@/stores';

const HomeScreen = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { logout } = useLogout();
  const accessToken = useAuthStore(state => state.accessToken);

  const { data: posts, isLoading, isError, refetch } = useQueryPosts();
  const { mutate: addPost, isPending: isAdding } = useMutationAddPost();

  const handleAddPost = () => {
    addPost({
      title: 'New Post Title',
      body: 'This is a new post body content.',
    });
  };

  return (
    <View className="flex-1 bg-background">
      <Header title={t('home.title')} />

      <View className="border-border bg-card border-b p-4">
        <Text className="font-inter text-16 text-textDefault">Regular text</Text>
        <Text
          style={{
            fontFamily: 'Inter-Regular',
            fontSize: 16,
            color: colors.textDefault,
          }}>
          Regular text
        </Text>

        <Text className="font-inter-bold text-16 text-textDefault">Bold text</Text>
        <Text
          style={{
            fontFamily: 'Inter-Bold',
            fontSize: 16,
            color: colors.textDefault,
          }}>
          Bold text
        </Text>

        <Text className="font-inter-medium text-16 text-textDefault">Medium text</Text>
        <Text className="font-inter-semibold text-16 text-textDefault">SemiBold text</Text>
        <Text className="font-inter-italic text-16 italic text-textDefault">Italic text</Text>
        <Text
          style={{
            fontFamily: 'Inter-Italic',
            fontStyle: 'italic',
            fontSize: 16,
            color: colors.textDefault,
          }}>
          Italic text
        </Text>

        <Text className="font-inter-bold text-16 text-textDefault" numberOfLines={1}>
          Token: {accessToken ? `${accessToken.substring(0, 25)}...` : 'None'}
        </Text>

        <View className="mt-2 flex-row gap-2">
          <TouchableOpacity
            onPress={handleAddPost}
            disabled={isAdding}
            className="flex-1 items-center rounded bg-blue-500 p-2">
            {isAdding ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text className="text-xs font-semibold text-white">Add Demo Post</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={logout} className="flex-1 items-center rounded bg-red-500 p-2">
            <Text className="text-xs font-semibold text-white">Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      ) : isError ? (
        <View className="flex-1 items-center justify-center p-4">
          <Text className="mb-2 text-red-500">Failed to load posts.</Text>
          <TouchableOpacity onPress={() => refetch()} className="bg-card border-border rounded border p-2">
            <Text className="text-textDefault">Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={posts?.slice(0, 15)}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <View className="bg-card border-border mb-3 rounded-lg border p-3">
              <Text className="mb-1 text-sm font-semibold text-textDefault">{item.title}</Text>
              <Text className="text-xs text-textDefault opacity-70">{item.body}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default HomeScreen;
