import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View, Image, useColorScheme } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Memo } from '@/types/memo';
import { format } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';

type MemoListProps = {
  memos: Memo[];
  onMemoPress: (memo: Memo) => void;
};

export const MemoList: React.FC<MemoListProps> = ({ memos, onMemoPress }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const renderMemoItem = ({ item }: { item: Memo }) => (
    <TouchableOpacity
      style={styles.memoItem}
      onPress={() => onMemoPress(item)}
      activeOpacity={0.7}
    >
      <ThemedView style={[styles.memoContent, isDark && styles.memoContentDark]}>
        <View style={styles.memoHeader}>
          <ThemedText type="subtitle" numberOfLines={1} style={styles.memoTitle}>
            {item.title}
          </ThemedText>
          <ThemedText type="default" style={styles.memoDate}>
            {format(item.updatedAt, 'yyyy/MM/dd')}
          </ThemedText>
        </View>
        <View style={styles.memoBody}>
          <View style={styles.memoTextContainer}>
            <ThemedText numberOfLines={2} style={styles.memoContentText}>
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
  );

  return (
    <FlatList
      data={memos}
      renderItem={renderMemoItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  memoItem: {
    marginBottom: 12,
  },
  memoContent: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  memoContentDark: {
    backgroundColor: '#1c1c1e',
    shadowColor: '#000',
    shadowOpacity: 0.3,
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
    fontSize: 12,
  },
  memoBody: {
    flexDirection: 'row',
  },
  memoTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  memoContentText: {
    fontSize: 14,
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