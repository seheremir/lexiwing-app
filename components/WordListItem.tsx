import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Platform 
} from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { WordList } from '@/types/vocabulary';

interface WordListItemProps {
  list: WordList;
  onPress: (list: WordList) => void;
}

export const WordListItem: React.FC<WordListItemProps> = ({ list, onPress }) => {
  const wordCount = list.words.length;
  const formattedDate = new Date(list.updatedAt).toLocaleDateString();
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => onPress(list)}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Text style={styles.name}>{list.name}</Text>
        <Text style={styles.description} numberOfLines={1}>
          {list.description}
        </Text>
        <View style={styles.meta}>
          <Text style={styles.count}>
            {wordCount} {wordCount === 1 ? 'word' : 'words'}
          </Text>
          <Text style={styles.date}>Updated: {formattedDate}</Text>
        </View>
      </View>
      <ChevronRight size={20} color={colors.gray[400]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  content: {
    flex: 1,
    marginRight: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  count: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '500',
  },
  date: {
    fontSize: 13,
    color: colors.gray[500],
  },
});