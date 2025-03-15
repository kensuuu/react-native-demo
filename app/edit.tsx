import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, TextInput, KeyboardAvoidingView, Platform, Animated, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useMemoStore } from '@/stores/memoStore';
import { Memo } from '@/types/memo';

export default function MemoEditScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { memos, updateMemo, addMemo } = useMemoStore();
  const memo = useMemo(() => memos.find((m: Memo) => m.id === id), [memos, id]);
  const [title, setTitle] = useState(memo?.title ?? '');
  const [content, setContent] = useState(memo?.content ?? '');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'border');
  const placeholderColor = useThemeColor({}, 'placeholder');
  const primaryColor = useThemeColor({}, 'primary');

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSave = useCallback(() => {
    if (!title.trim()) return;

    const newMemo: Memo = {
      id: memo?.id ?? Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      createdAt: memo?.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (memo) {
      updateMemo(newMemo);
    } else {
      addMemo(newMemo);
    }

    router.back();
  }, [title, content, memo, updateMemo, addMemo, router]);

  return (
    <>
      <Stack.Screen
        options={{
          title: memo ? 'メモを編集' : '新規メモ',
          headerRight: () => (
            <Pressable
              onPress={handleSave}
              style={({ pressed }) => [
                styles.saveButton,
                pressed && styles.saveButtonPressed,
              ]}
            >
              <ThemedText style={[styles.saveButtonText, { color: primaryColor }]}>
                保存
              </ThemedText>
            </Pressable>
          ),
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.container, { backgroundColor }]}
      >
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <TextInput
            style={[styles.titleInput, { color: textColor, borderColor }]}
            value={title}
            onChangeText={setTitle}
            placeholder="タイトル"
            placeholderTextColor={placeholderColor}
          />
          <TextInput
            style={[styles.contentInput, { color: textColor, borderColor }]}
            value={content}
            onChangeText={setContent}
            placeholder="メモを入力"
            placeholderTextColor={placeholderColor}
            multiline
            textAlignVertical="top"
          />
        </Animated.View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    padding: 8,
    borderBottomWidth: 1,
  },
  contentInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
  },
  saveButton: {
    marginRight: 16,
    padding: 8,
  },
  saveButtonPressed: {
    opacity: 0.7,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});