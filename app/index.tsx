import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { useAuthStore } from '@/store/auth-store';

export default function Index() {
  const { user } = useAuthStore();
  
  // Redirect based on authentication status
  return user ? <Redirect href="/(tabs)" /> : <Redirect href="/auth/login" />;
}