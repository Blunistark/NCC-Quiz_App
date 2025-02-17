import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../lib/auth';

export default function EditProfile() {
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

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', session?.user?.id)
        .single();

      if (error) throw error;

      setFormData({
        name: data.name,
        regimentalNumber: data.regimental_number,
        unit: data.unit,
        schoolCollege: data.school_college,
        directorate: data.directorate,
        group: data.group,
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }

  async function handleSubmit() {
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
          updated_at: new Date().toISOString(),
        });

      if (updateError) throw updateError;

      router.back();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Edit Profile</Text>

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
        Save Changes
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