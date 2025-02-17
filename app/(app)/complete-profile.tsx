import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { router } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../lib/auth';

export default function CompleteProfile() {
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    regimentalNumber: '',
    unit: '',
    schoolCollege: '',
    directorate: '',
    group: '',
  });

  const handleSubmit = async () => {
    if (!session?.user?.id) return;

    // Validate all fields are filled
    if (Object.values(formData).some(value => !value)) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { error: updateError } = await supabase
        .from('profiles')
        .upsert({
          user_id: session.user.id,
          name: formData.name,
          regimental_number: formData.regimentalNumber,
          unit: formData.unit,
          school_college: formData.schoolCollege,
          directorate: formData.directorate,
          group: formData.group,
        });

      if (updateError) throw updateError;

      router.replace('/(app)/dashboard');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Complete Your Profile
      </Text>

      {error && (
        <Text style={styles.error}>{error}</Text>
      )}

      <TextInput
        label="Full Name"
        value={formData.name}
        onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Regimental Number"
        value={formData.regimentalNumber}
        onChangeText={(text) => setFormData(prev => ({ ...prev, regimentalNumber: text }))}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Unit"
        value={formData.unit}
        onChangeText={(text) => setFormData(prev => ({ ...prev, unit: text }))}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="School/College"
        value={formData.schoolCollege}
        onChangeText={(text) => setFormData(prev => ({ ...prev, schoolCollege: text }))}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Directorate"
        value={formData.directorate}
        onChangeText={(text) => setFormData(prev => ({ ...prev, directorate: text }))}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Group"
        value={formData.group}
        onChangeText={(text) => setFormData(prev => ({ ...prev, group: text }))}
        mode="outlined"
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        Complete Profile
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    marginBottom: 40,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
  },
}); 