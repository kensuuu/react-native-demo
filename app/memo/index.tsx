import React, { useCallback } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { MemoList } from '@/components/MemoListCard';
import { useMemoStore } from '@/stores/memoStore';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import { Memo } from '@/types/memo';

export default function MemoListScreen() {
  const router = useRouter();
  const { memos } = useMemoStore();
  const backgroundColor = useThemeColor({}, 'background');
  const primaryColor = useThemeColor({}, 'primary');

  const handleMemoPress = useCallback((memo: Memo) => {
    router.push(`/memo/edit?id=${memo.id}`);
  }, [router]);

  const handleAddPress = useCallback(() => {
    router.push('/memo/edit');
  }, [router]);

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <MemoList memos={memos} onMemoPress={handleMemoPress} />
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: primaryColor }]}
        onPress={handleAddPress}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
}); 