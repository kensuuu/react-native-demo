import React, { useCallback } from 'react';
import { StyleSheet, FlatList, useColorScheme } from 'react-native';
import { Memo } from '@/types/memo';
import { MemoItem } from './MemoItem';

type MemoListProps = {
  memos: Memo[];
  onMemoPress: (memo: Memo) => void;
};

export const MemoList: React.FC<MemoListProps> = ({ memos, onMemoPress }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const renderMemoItem = useCallback(({ item }: { item: Memo }) => (
    <MemoItem item={item} onPress={onMemoPress} isDark={isDark} />
  ), [onMemoPress, isDark]);

  const keyExtractor = useCallback((item: Memo) => item.id, []);

  const getItemLayout = useCallback((data: any, index: number) => ({
    length: 140,
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
}); 