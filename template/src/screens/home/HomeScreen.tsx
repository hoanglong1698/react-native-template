import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Header, UIText } from '@/components/common';
import { useTranslation } from '@/i18n';
import { useLogout, useMutationAddPost, useQueryPosts, useTheme } from '@/hooks';
import { useAuthStore } from '@/stores';
import { scaleFont } from '@/helpers';

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

      <View className="border-b p-4">
        <Text className="font-regular text-16 text-textDefault">Regular text</Text>
        <Text
          style={{
            fontFamily: 'Inter-Regular',
            fontSize: scaleFont(16),
            color: colors.textDefault,
          }}>
          Regular text
        </Text>

        <Text className="font-bold text-16 text-textDefault">Bold text</Text>
        <Text
          style={{
            fontFamily: 'Inter-Bold',
            fontSize: scaleFont(16),
            color: colors.textDefault,
          }}>
          Bold text
        </Text>

        <Text className="font-medium text-16 text-textDefault">Medium text</Text>
        <Text className="font-semibold text-16 text-textDefault">SemiBold text</Text>
        <Text className="font-italic text-16 italic text-textDefault">Italic text</Text>
        <Text
          style={{
            fontFamily: 'Inter-Italic',
            fontStyle: 'italic',
            fontSize: 16,
            color: colors.textDefault,
          }}>
          Italic text
        </Text>

        <Text className="font-bold text-16 text-textDefault" numberOfLines={1}>
          Token: {accessToken ? `${accessToken.substring(0, 25)}...` : 'None'}
        </Text>

        <View className="mt-2 flex-row gap-2">
          <TouchableOpacity
            onPress={handleAddPost}
            disabled={isAdding}
            className="flex-1 items-center rounded bg-primary p-2">
            {isAdding ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text className="font-semibold text-14 text-white">Add Demo Post</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={logout} className="flex-1 items-center rounded bg-red p-2">
            <Text className="font-semibold text-14 text-white">Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      ) : isError ? (
        <View className="flex-1 items-center justify-center p-4">
          <Text className="mb-2">Failed to load posts.</Text>
          <TouchableOpacity onPress={() => refetch()} className="rounded border p-2">
            <Text className="text-textDefault">Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={posts?.slice(0, 15)}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <View>
              <UIText className="mb-1 font-semibold text-14 text-textDefault">{item.title}</UIText>
              <UIText className="text-12 text-textDefault opacity-70">{item.body}</UIText>
            </View>
          )}
          ItemSeparatorComponent={<View className="my-10 h-1 bg-borderDefault" />}
        />
      )}
    </View>
  );
};

export default HomeScreen;
