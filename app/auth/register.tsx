import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Platform } from 'react-native';
import { Link, router } from 'expo-router';
import { AuthLayout } from '@/components/AuthLayout';
import { TextInput } from '@/components/TextInput';
import { Button } from '@/components/Button';
import { colors } from '@/constants/colors';
import { 
  validateEmail, 
  validatePassword, 
  validateConfirmPassword,
  validateUsername
} from '@/utils/validation';
import { useAuthStore } from '@/store/auth-store';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  
  const { register, isLoading, error, clearError, user } = useAuthStore();
  
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
        Alert.alert('Registration Error', error);
      }
      clearError();
    }
  }, [error, clearError]);
  
  const handleUsernameChange = (text: string) => {
    setUsername(text);
    setUsernameError(null);
  };
  
  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailError(null);
  };
  
  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordError(null);
    // Also validate confirm password if it's already entered
    if (confirmPassword) {
      setConfirmPasswordError(validateConfirmPassword(text, confirmPassword));
    }
  };
  
  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    setConfirmPasswordError(validateConfirmPassword(password, text));
  };
  
  const validateForm = (): boolean => {
    const usernameValidationError = validateUsername(username);
    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);
    const confirmPasswordValidationError = validateConfirmPassword(password, confirmPassword);
    
    setUsernameError(usernameValidationError);
    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);
    setConfirmPasswordError(confirmPasswordValidationError);
    
    return !usernameValidationError && 
           !emailValidationError && 
           !passwordValidationError && 
           !confirmPasswordValidationError;
  };
  
  const handleRegister = async () => {
    if (validateForm()) {
      await register(username, email, password);
    }
  };
  
  return (
    <AuthLayout 
      title="Create Account" 
      subtitle="Sign up to get started with our app"
    >
      <View style={styles.form}>
        <TextInput
          label="Username"
          value={username}
          onChangeText={handleUsernameChange}
          placeholder="Choose a username"
          autoCapitalize="none"
          error={usernameError}
        />
        
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
          placeholder="Create a password"
          secureTextEntry
          error={passwordError}
        />
        
        <TextInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
          placeholder="Confirm your password"
          secureTextEntry
          error={confirmPasswordError}
        />
        
        <Button
          title="Sign Up"
          onPress={handleRegister}
          loading={isLoading}
          fullWidth
          style={styles.registerButton}
        />
        
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <Link href="/auth/login" asChild>
            <TouchableOpacity>
              <Text style={styles.loginLink}>Sign In</Text>
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
  registerButton: {
    marginTop: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  loginLink: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
});