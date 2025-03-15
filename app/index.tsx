import React, { useCallback } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { MemoList } from '@/components/MemoListCard';
import { useMemoStore } from '@/stores/memoStore';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import { Memo } from '@/types/memo';

export default function MemoListScreen() {
  const router = useRouter();
  const { memos, clearMemos } = useMemoStore();
  const backgroundColor = useThemeColor({}, 'background');
  const primaryColor = useThemeColor({}, 'primary');
  const errorColor = useThemeColor({}, 'error');

  const handleMemoPress = useCallback((memo: Memo) => {
    router.push(`/edit?id=${memo.id}`);
  }, [router]);

  const handleAddPress = useCallback(() => {
    router.push('/edit');
  }, [router]);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'メモ',
          headerRight: () => (
            <TouchableOpacity
              style={styles.headerButton}
              onPress={clearMemos}
            >
              <Ionicons name="trash-outline" size={24} color={errorColor} />
            </TouchableOpacity>
          ),
        }}
      />
      <ThemedView style={[styles.container, { backgroundColor }]}>
        <MemoList memos={memos} onMemoPress={handleMemoPress} />
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: primaryColor }]}
          onPress={handleAddPress}
        >
          <Ionicons name="add" size={32} color="#fff" />
        </TouchableOpacity>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerButton: {
    marginRight: 16,
    padding: 8,
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
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