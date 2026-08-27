import React, { useCallback } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Header, UIText } from '@/components/common';
import { ColorsType, Fonts, Typography } from '@/constants';
import { scale, scaleRadius } from '@/helpers';
import { useLogout, useMutationAddPost, useQueryPosts, useTheme, useThemedStyles } from '@/hooks';
import { useTranslation } from '@/i18n';
import { useAuthStore } from '@/stores';

const HomeScreen = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);
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

  const renderSeparator = useCallback(() => <View style={styles.separator} />, [styles.separator]);

  return (
    <View style={styles.container}>
      <Header title={t('home.title')} />

      <View style={styles.demoSection}>
        <Text style={styles.regularText}>Regular text</Text>
        <UIText fs16 fw400>
          Regular (fs16 fw400)
        </UIText>

        <Text style={styles.mediumText}>Medium text</Text>
        <UIText fs16 fw500>
          Medium (fs16 fw500)
        </UIText>

        <Text style={styles.semiBoldText}>SemiBold text</Text>
        <UIText fs16 fw600>
          SemiBold (fs16 fw600)
        </UIText>

        <Text style={styles.boldText}>Bold text</Text>
        <UIText fs16 fw700>
          Bold (fs16 fw700)
        </UIText>

        <Text style={styles.italicText}>Italic text</Text>
        <UIText fs16 fw400_Italic>
          Italic (fs16 fw400_Italic)
        </UIText>

        <UIText fs18 bold style={{ marginTop: scale(4) }}>
          Semantic Alias (fs18 bold)
        </UIText>

        <UIText fs16 bold numberOfLines={1} style={{ marginTop: scale(4) }}>
          Token: {accessToken ? `${accessToken.substring(0, 25)}...` : 'None'}
        </UIText>

        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={handleAddPost} disabled={isAdding} style={styles.addButton}>
            {isAdding ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <UIText fs14 fw600 style={styles.buttonText}>
                Add Demo Post
              </UIText>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={logout} style={styles.logoutButton}>
            <UIText fs14 fw600 style={styles.buttonText}>
              Logout
            </UIText>
          </TouchableOpacity>
        </View>
      </View>

      {isLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : isError ? (
        <View style={styles.errorContainer}>
          <UIText fs14 regular style={styles.errorText}>
            Failed to load posts.
          </UIText>
          <TouchableOpacity onPress={() => refetch()} style={styles.retryButton}>
            <UIText fs14 regular style={styles.retryText}>
              Retry
            </UIText>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={posts?.slice(0, 15)}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View>
              <UIText fs14 fw600 style={styles.postTitle}>
                {item.title}
              </UIText>
              <UIText fs12 regular style={styles.postBody}>
                {item.body}
              </UIText>
            </View>
          )}
          ItemSeparatorComponent={renderSeparator}
        />
      )}
    </View>
  );
};

export default HomeScreen;

const createStyles = (colors: ColorsType) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    demoSection: {
      borderBottomWidth: 1,
      borderBottomColor: colors.borderDefault,
      padding: scale(16),
    },
    regularText: {
      fontFamily: Fonts.Regular,
      ...Typography.fs16,
      color: colors.textDefault,
    },
    mediumText: {
      fontFamily: Fonts.Medium,
      ...Typography.fs16,
      color: colors.textDefault,
    },
    semiBoldText: {
      fontFamily: Fonts.SemiBold,
      ...Typography.fs16,
      color: colors.textDefault,
    },
    boldText: {
      fontFamily: Fonts.Bold,
      ...Typography.fs16,
      color: colors.textDefault,
    },
    italicText: {
      fontFamily: Fonts.RegularItalic,
      fontStyle: 'italic',
      ...Typography.fs16,
      color: colors.textDefault,
    },
    buttonRow: {
      marginTop: scale(8),
      flexDirection: 'row',
      gap: scale(8),
    },
    addButton: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: scaleRadius(6),
      backgroundColor: colors.primary,
      padding: scale(8),
    },
    logoutButton: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: scaleRadius(6),
      backgroundColor: colors.red,
      padding: scale(8),
    },
    buttonText: {
      color: '#FFFFFF',
    },
    centerContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    errorContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: scale(16),
    },
    errorText: {
      color: colors.textDefault,
      marginBottom: scale(8),
    },
    retryButton: {
      borderRadius: scaleRadius(6),
      borderWidth: 1,
      borderColor: colors.borderDefault,
      padding: scale(8),
    },
    retryText: {
      color: colors.textDefault,
    },
    listContent: {
      padding: scale(16),
    },
    postTitle: {
      marginBottom: scale(4),
      color: colors.textDefault,
    },
    postBody: {
      color: colors.textDefault,
      opacity: 0.7,
    },
    separator: {
      marginVertical: scale(10),
      height: 1,
      backgroundColor: colors.borderDefault,
    },
  });
};
