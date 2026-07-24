import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Header } from '@/components/common';
import { useTranslation } from '@/i18n';
import { useLogout, useMutationAddPost, useQueryPosts } from '@/hooks';
import { useAuthStore } from '@/stores';

const HomeScreen = () => {
  const { t } = useTranslation();
  const { logout } = useLogout();
  const accessToken = useAuthStore((state) => state.accessToken);

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

      <View className="p-4 border-b border-border bg-card">
        <Text className="text-textColor font-medium text-xs mb-1" numberOfLines={1}>
          Token: {accessToken ? `${accessToken.substring(0, 25)}...` : 'None'}
        </Text>
        <View className="flex-row gap-2 mt-2">
          <TouchableOpacity
            onPress={handleAddPost}
            disabled={isAdding}
            className="flex-1 p-2 bg-blue-500 rounded items-center"
          >
            {isAdding ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text className="text-white font-semibold text-xs">Add Demo Post</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={logout}
            className="flex-1 p-2 bg-red-500 rounded items-center"
          >
            <Text className="text-white font-semibold text-xs">Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      ) : isError ? (
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-red-500 mb-2">Failed to load posts.</Text>
          <TouchableOpacity onPress={() => refetch()} className="p-2 bg-card rounded border border-border">
            <Text className="text-textColor">Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={posts?.slice(0, 15)}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <View className="p-3 mb-3 bg-card rounded-lg border border-border">
              <Text className="text-textColor font-semibold text-sm mb-1">{item.title}</Text>
              <Text className="text-textColor opacity-70 text-xs">{item.body}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default HomeScreen;
