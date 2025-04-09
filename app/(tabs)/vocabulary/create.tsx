import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  SafeAreaView, 
  TouchableOpacity,
  Alert,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import { router, Stack } from 'expo-router';
import { Check } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { TextInput } from '@/components/TextInput';
import { Button } from '@/components/Button';
import { useVocabularyStore } from '@/store/vocabulary-store';

export default function CreateWordListScreen() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [nameError, setNameError] = useState<string | null>(null);
  
  const { addWordList } = useVocabularyStore();
  
  const validateForm = (): boolean => {
    if (!name.trim()) {
      setNameError('Please enter a name for your word list');
      return false;
    }
    return true;
  };
  
  const handleCreate = () => {
    if (validateForm()) {
      addWordList(name, description);
      router.back();
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Create Word List',
          headerRight: () => (
            <TouchableOpacity 
              style={styles.saveButton} 
              onPress={handleCreate}
            >
              <Check size={24} color={colors.primary} />
            </TouchableOpacity>
          ),
        }} 
      />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formContainer}>
            <TextInput
              label="List Name"
              value={name}
              onChangeText={(text) => {
                setName(text);
                setNameError(null);
              }}
              placeholder="Enter a name for your word list"
              error={nameError}
            />
            
            <TextInput
              label="Description (Optional)"
              value={description}
              onChangeText={setDescription}
              placeholder="Describe what this list is about"
              multiline
              numberOfLines={3}
            />
            
            <Button
              title="Create Word List"
              onPress={handleCreate}
              style={styles.createButton}
              fullWidth
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    flexGrow: 1,
  },
  formContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
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
  saveButton: {
    padding: 8,
    marginRight: 8,
  },
  createButton: {
    marginTop: 24,
  },
});