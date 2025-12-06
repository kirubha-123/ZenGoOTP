import React, { useRef, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { signInWithPhoneNumber } from 'firebase/auth';
import { auth, firebaseConfig } from './firebase';

export default function PhoneLoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [confirmation, setConfirmation] = useState<any>(null);
  const recaptchaVerifier = useRef<any>(null);

  const sendOTP = async () => {
    try {
      const conf = await signInWithPhoneNumber(
        auth,
        `+91${phoneNumber}`,
        recaptchaVerifier.current!
      );
      setConfirmation(conf);
      Alert.alert('OTP sent', 'In demo, SMS is blocked (billing not enabled), but flow is wired.');
      console.log('OTP_CONFIRMATION', conf);
    } catch (e: any) {
      Alert.alert('Error sending OTP', e.message);
      console.log('OTP_ERROR', e);
    }
  };

  const verifyCode = async () => {
    if (!confirmation) {
      Alert.alert('No OTP request', 'Send OTP first.');
      return;
    }
    try {
      // In real app this confirms with Firebase.
      // With billing disabled this will fail, but code path is correct.
      await confirmation.confirm(code);
      Alert.alert('Success', 'Phone number verified (demo).');
    } catch (e: any) {
      Alert.alert('Verification failed (demo)', e.message);
    }
  };

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={true}
      />

      <Text style={styles.title}>ZenGo OTP Login</Text>

      <TextInput
        style={styles.input}
        placeholder="10 digit phone number"
        keyboardType="phone-pad"
        maxLength={10}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <TouchableOpacity
        style={[styles.button, phoneNumber.length < 10 && styles.buttonDisabled]}
        disabled={phoneNumber.length < 10}
        onPress={sendOTP}
      >
        <Text style={styles.buttonText}>Send OTP</Text>
      </TouchableOpacity>

      {confirmation && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP code"
            keyboardType="number-pad"
            maxLength={6}
            value={code}
            onChangeText={setCode}
          />
          <TouchableOpacity
            style={[styles.button, code.length < 6 && styles.buttonDisabled]}
            disabled={code.length < 6}
            onPress={verifyCode}
          >
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 32 },
  input: { backgroundColor: 'white', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 18, marginBottom: 16 },
  button: { backgroundColor: '#007AFF', padding: 14, borderRadius: 8, marginTop: 4 },
  buttonDisabled: { backgroundColor: '#ccc' },
  buttonText: { color: 'white', textAlign: 'center', fontSize: 18, fontWeight: 'bold' },
});
