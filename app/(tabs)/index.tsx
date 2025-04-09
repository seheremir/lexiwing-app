import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Platform } from 'react-native';
import { Button } from '@/components/Button';
import { colors } from '@/constants/colors';
import { useAuthStore } from '@/store/auth-store';

export default function HomeScreen() {
  const { user } = useAuthStore();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>
            Welcome, {user?.username || 'User'}!
          </Text>
          <Text style={styles.welcomeSubtitle}>
            You've successfully logged in to the app.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Getting Started</Text>
          <Text style={styles.cardText}>
            This is a sample home screen. In a real app, you would see your content here.
          </Text>
          <Button 
            title="Explore Features" 
            onPress={() => {}} 
            style={styles.cardButton}
          />
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>App Features</Text>
          
          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, { backgroundColor: colors.primary }]} />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>User Authentication</Text>
              <Text style={styles.featureDescription}>
                Secure login, registration, and password recovery
              </Text>
            </View>
          </View>
          
          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, { backgroundColor: colors.secondary }]} />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Profile Management</Text>
              <Text style={styles.featureDescription}>
                View and update your profile information
              </Text>
            </View>
          </View>
          
          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, { backgroundColor: colors.success }]} />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Settings</Text>
              <Text style={styles.featureDescription}>
                Customize your app experience and preferences
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 20,
  },
  welcomeSection: {
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
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
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  cardText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 24,
  },
  cardButton: {
    alignSelf: 'flex-start',
  },
  infoSection: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
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
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  featureIcon: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 6,
    marginRight: 12,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});