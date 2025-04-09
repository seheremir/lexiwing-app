import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  SafeAreaView, 
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native';
import { router, Stack } from 'expo-router';
import { Plus, BookOpen } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useVocabularyStore } from '@/store/vocabulary-store';
import { WordListItem } from '@/components/WordListItem';
import { EmptyState } from '@/components/EmptyState';
import { WordList } from '@/types/vocabulary';

export default function VocabularyScreen() {
  const { wordLists } = useVocabularyStore();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // In a real app, you might fetch data from an API here
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleListPress = (list: WordList) => {
    router.push({
      pathname: '/vocabulary/[id]',
      params: { id: list.id }
    });
  };

  const handleAddList = () => {
    router.push('/vocabulary/create');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'My Word Lists',
          headerRight: () => (
            <TouchableOpacity 
              style={styles.addButton} 
              onPress={handleAddList}
            >
              <Plus size={24} color={colors.primary} />
            </TouchableOpacity>
          ),
        }} 
      />
      
      <FlatList
        data={wordLists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <WordListItem list={item} onPress={handleListPress} />
        )}
        contentContainerStyle={styles.listContent}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        ListEmptyComponent={
          <EmptyState
            title="No Word Lists Yet"
            description="Create your first word list to start building your vocabulary."
            buttonTitle="Create Word List"
            onButtonPress={handleAddList}
            icon={<BookOpen size={48} color={colors.primary} />}
            style={styles.emptyState}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  addButton: {
    padding: 8,
    marginRight: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 40,
  },
});