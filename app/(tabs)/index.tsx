import { StyleSheet, View, useColorScheme } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MemoList } from '@/components/MemoList';
import { Memo } from '@/types/memo';

// サンプルデータ
const sampleMemos: Memo[] = [
  {
    id: '1',
    title: '買い物リスト',
    content: '1. 牛乳\n2. パン\n3. 卵\n4. バナナ',
    createdAt: new Date('2024-03-14T10:00:00'),
    updatedAt: new Date('2024-03-14T10:00:00'),
  },
  {
    id: '2',
    title: '会議メモ',
    content: '新プロジェクトのキックオフミーティング\n・スケジュール確認\n・役割分担\n・次回の打ち合わせ日程',
    createdAt: new Date('2024-03-13T15:30:00'),
    updatedAt: new Date('2024-03-13T16:45:00'),
  },
  {
    id: '3',
    title: 'React Native学習メモ',
    content: '・コンポーネントのライフサイクル\n・Hooksの使い方\n・ナビゲーションの実装',
    createdAt: new Date('2024-03-12T09:15:00'),
    updatedAt: new Date('2024-03-12T09:15:00'),
  },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleMemoPress = (memo: Memo) => {
    console.log('Memo pressed:', memo.title);
    // TODO: メモの詳細画面への遷移を実装
  };

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <ThemedView style={[styles.header, isDark && styles.headerDark]}>
        <ThemedText type="title">メモ</ThemedText>
      </ThemedView>
      <MemoList memos={sampleMemos} onMemoPress={handleMemoPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  containerDark: {
    backgroundColor: '#000',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerDark: {
    borderBottomColor: '#2c2c2e',
  },
});
