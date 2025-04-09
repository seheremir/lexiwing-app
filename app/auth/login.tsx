import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Platform } from 'react-native';
import { Link, router } from 'expo-router';
import { AuthLayout } from '@/components/AuthLayout';
import { TextInput } from '@/components/TextInput';
import { Button } from '@/components/Button';
import { colors } from '@/constants/colors';
import { validateEmail, validatePassword } from '@/utils/validation';
import { useAuthStore } from '@/store/auth-store';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  
  const { login, isLoading, error, clearError, user } = useAuthStore();
  
  // If user is already logged in, redirect to home
  useEffect(() => {
    if (user) {
      router.replace('/(tabs)');
    }
  }, [user]);
  
  // Show error from auth store
  useEffect(() => {
    if (error) {
      if (Platform.OS === 'web') {
        alert(error);
      } else {
        Alert.alert('Login Error', error);
      }
      clearError();
    }
  }, [error, clearError]);
  
  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailError(null);
  };
  
  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordError(null);
  };
  
  const validateForm = (): boolean => {
    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);
    
    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);
    
    return !emailValidationError && !passwordValidationError;
  };
  
  const handleLogin = async () => {
    if (validateForm()) {
      await login(email, password);
    }
  };
  
  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Sign in to your account to continue"
    >
      <View style={styles.form}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={handleEmailChange}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          error={emailError}
        />
        
        <TextInput
          label="Password"
          value={password}
          onChangeText={handlePasswordChange}
          placeholder="Enter your password"
          secureTextEntry
          error={passwordError}
        />
        
        <TouchableOpacity 
          style={styles.forgotPassword}
          onPress={() => router.push('/auth/forgot-password')}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        
        <Button
          title="Sign In"
          onPress={handleLogin}
          loading={isLoading}
          fullWidth
          style={styles.loginButton}
        />
        
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <Link href="/auth/register" asChild>
            <TouchableOpacity>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  form: {
    width: '100%',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: 14,
  },
  loginButton: {
    marginTop: 8,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  signupText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  signupLink: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
});