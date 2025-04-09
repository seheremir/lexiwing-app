import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  SafeAreaView, 
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { Plus, Edit, Trash2, BookOpen } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useVocabularyStore } from '@/store/vocabulary-store';
import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/Button';

export default function WordListDetailScreen() {
  const { id } = useLocalSearchParams();
  const { wordLists, deleteWordList } = useVocabularyStore();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const wordList = wordLists.find(list => list.id === id);
  
  if (!wordList) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ title: 'Word List Not Found' }} />
        <View style={styles.centered}>
          <Text style={styles.errorText}>This word list doesn't exist or has been deleted.</Text>
          <Button 
            title="Go Back" 
            onPress={() => router.back()} 
            style={styles.backButton}
          />
        </View>
      </SafeAreaView>
    );
  }
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    // In a real app, you might fetch data from an API here
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };
  
  const handleAddWord = () => {
    // Navigate to add word screen
    Alert.alert('Add Word', 'This would navigate to the add word screen');
  };
  
  const handleEditList = () => {
    // Navigate to edit list screen
    Alert.alert('Edit List', 'This would navigate to the edit list screen');
  };
  
  const handleDeleteList = () => {
    Alert.alert(
      'Delete Word List',
      `Are you sure you want to delete "${wordList.name}"? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            deleteWordList(wordList.id);
            router.back();
          }
        }
      ]
    );
  };
  
  const renderWordItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.wordItem}
      onPress={() => Alert.alert('View Word', `This would show details for "${item.term}"`)}
    >
      <View>
        <Text style={styles.term}>{item.term}</Text>
        <Text style={styles.definition} numberOfLines={2}>{item.definition}</Text>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: wordList.name,
          headerRight: () => (
            <View style={styles.headerButtons}>
              <TouchableOpacity 
                style={styles.headerButton} 
                onPress={handleEditList}
              >
                <Edit size={20} color={colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.headerButton} 
                onPress={handleDeleteList}
              >
                <Trash2 size={20} color={colors.error} />
              </TouchableOpacity>
            </View>
          ),
        }} 
      />
      
      <View style={styles.listInfo}>
        <Text style={styles.description}>{wordList.description}</Text>
        <Text style={styles.count}>
          {wordList.words.length} {wordList.words.length === 1 ? 'word' : 'words'}
        </Text>
      </View>
      
      <FlatList
        data={wordList.words}
        keyExtractor={(item) => item.id}
        renderItem={renderWordItem}
        contentContainerStyle={styles.listContent}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        ListEmptyComponent={
          <EmptyState
            title="No Words Yet"
            description="Add words to this list to start building your vocabulary."
            buttonTitle="Add Word"
            onButtonPress={handleAddWord}
            icon={<BookOpen size={48} color={colors.primary} />}
            style={styles.emptyState}
          />
        }
      />
      
      <TouchableOpacity 
        style={styles.fab}
        onPress={handleAddWord}
      >
        <Plus size={24} color={colors.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    minWidth: 120,
  },
  headerButtons: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  listInfo: {
    backgroundColor: colors.white,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  count: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  wordItem: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  term: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  definition: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 40,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});