import React, { memo, useCallback, useEffect, useRef } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View, Image, useColorScheme, Animated } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Memo } from '@/types/memo';
import { format } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ja } from 'date-fns/locale';

type MemoListProps = {
  memos: Memo[];
  onMemoPress: (memo: Memo) => void;
};

const MemoItem = memo(({ item, onPress, isDark }: { 
  item: Memo; 
  onPress: (memo: Memo) => void;
  isDark: boolean;
}) => {
  const backgroundColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'cardBorder');
  const textColor = useThemeColor({}, 'text');
  const secondaryColor = useThemeColor({}, 'secondary');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <TouchableOpacity
        style={[styles.memoItem, { backgroundColor, borderColor }]}
        onPress={() => onPress(item)}
        activeOpacity={0.7}
      >
        <ThemedView style={[styles.memoContent, isDark && styles.memoContentDark]}>
          <View style={styles.memoHeader}>
            <ThemedText type="subtitle" numberOfLines={1} style={[styles.memoTitle, { color: textColor }]}>
              {item.title}
            </ThemedText>
            <ThemedText type="default" style={[styles.memoDate, { color: secondaryColor }]}>
              {format(new Date(item.updatedAt), 'yyyy/MM/dd HH:mm', { locale: ja })}
            </ThemedText>
          </View>
          <View style={styles.memoBody}>
            <View style={styles.memoTextContainer}>
              <ThemedText numberOfLines={2} style={[styles.memoContentText, { color: textColor }]}>
                {item.content}
              </ThemedText>
            </View>
            {item.imageUri && (
              <View style={styles.thumbnailContainer}>
                <Image source={{ uri: item.imageUri }} style={styles.thumbnail} />
              </View>
            )}
            {!item.imageUri && (
              <View style={[styles.noImageContainer, isDark && styles.noImageContainerDark]}>
                <Ionicons 
                  name="document-text-outline" 
                  size={24} 
                  color={isDark ? '#666' : '#999'} 
                />
              </View>
            )}
          </View>
        </ThemedView>
      </TouchableOpacity>
    </Animated.View>
  );
});

export const MemoList: React.FC<MemoListProps> = ({ memos, onMemoPress }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const renderMemoItem = useCallback(({ item }: { item: Memo }) => (
    <MemoItem item={item} onPress={onMemoPress} isDark={isDark} />
  ), [onMemoPress, isDark]);

  const keyExtractor = useCallback((item: Memo) => item.id, []);

  const getItemLayout = useCallback((data: any, index: number) => ({
    length: 140, // メモアイテムの高さ
    offset: 140 * index,
    index,
  }), []);

  return (
    <FlatList
      data={memos}
      renderItem={renderMemoItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      getItemLayout={getItemLayout}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
      removeClippedSubviews={true}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  memoItem: {
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  memoContent: {
    padding: 16,
  },
  memoContentDark: {
    backgroundColor: '#1c1c1e',
  },
  memoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  memoTitle: {
    flex: 1,
    marginRight: 8,
  },
  memoDate: {
    fontSize: 14,
  },
  memoBody: {
    flexDirection: 'row',
  },
  memoTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  memoContentText: {
    fontSize: 16,
    lineHeight: 20,
  },
  thumbnailContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  noImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageContainerDark: {
    backgroundColor: '#2c2c2e',
  },
}); 