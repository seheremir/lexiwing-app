import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Platform } from 'react-native';
import { Link, router } from 'expo-router';
import { AuthLayout } from '@/components/AuthLayout';
import { TextInput } from '@/components/TextInput';
import { Button } from '@/components/Button';
import { colors } from '@/constants/colors';
import { validateEmail } from '@/utils/validation';
import { useAuthStore } from '@/store/auth-store';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { resetPassword, isLoading, error, clearError } = useAuthStore();
  
  // Show error from auth store
  useEffect(() => {
    if (error) {
      if (Platform.OS === 'web') {
        alert(error);
      } else {
        Alert.alert('Error', error);
      }
      clearError();
    }
  }, [error, clearError]);
  
  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailError(null);
  };
  
  const validateForm = (): boolean => {
    const emailValidationError = validateEmail(email);
    setEmailError(emailValidationError);
    return !emailValidationError;
  };
  
  const handleResetPassword = async () => {
    if (validateForm()) {
      await resetPassword(email);
      setIsSubmitted(true);
    }
  };
  
  if (isSubmitted) {
    return (
      <AuthLayout 
        title="Check Your Email" 
        subtitle="We've sent password reset instructions to your email"
      >
        <View style={styles.successContainer}>
          <Text style={styles.successText}>
            If an account exists with the email {email}, you will receive instructions to reset your password.
          </Text>
          
          <Button
            title="Back to Login"
            onPress={() => router.push('/auth/login')}
            style={styles.backButton}
            fullWidth
          />
        </View>
      </AuthLayout>
    );
  }
  
  return (
    <AuthLayout 
      title="Forgot Password" 
      subtitle="Enter your email to reset your password"
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
        
        <Button
          title="Reset Password"
          onPress={handleResetPassword}
          loading={isLoading}
          fullWidth
          style={styles.resetButton}
        />
        
        <View style={styles.backContainer}>
          <Text style={styles.backText}>Remember your password? </Text>
          <Link href="/auth/login" asChild>
            <TouchableOpacity>
              <Text style={styles.backLink}>Back to Login</Text>
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
  resetButton: {
    marginTop: 16,
  },
  backContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  backText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  backLink: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  successContainer: {
    width: '100%',
    alignItems: 'center',
  },
  successText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  backButton: {
    marginTop: 16,
  },
});