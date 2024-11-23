import { Button, Text, SafeAreaView, StyleSheet, Alert, TextInput } from 'react-native';
import { useState } from 'react';
import TableDisplay from './components/TableDisplay';
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client at the top of your file
const supabase = createClient('https://gbleonkpxnbgdoatdowm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdibGVvbmtweG5iZ2RvYXRkb3dtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA0MTUwMTMsImV4cCI6MjA0NTk5MTAxM30.wknXoxwug9p8v-6wZMILIAvFbQ0PKfgAAUT5yoMIPug');

export default function App() {
  const [table, setTable] = useState("courses");
  const [newCourseName, setCourseName] = useState('');
  const [newCourseId, setCourseId] = useState('');
  const [newCourseCode, setCourseCode] = useState('');

  const addCourse = async () => {
    if (!newCourseName || !newCourseId || !newCourseCode) {
      alert('Please provide a course name and course id and course code');
      return;
    }

    // Use the client already initialized at the top
    const { error } = await supabase.from('courses').insert([{ course_name: newCourseName, course_id: newCourseId, course_code: newCourseCode }]);

    if (error) {
      console.error('Error adding course:', error);
      alert('Failed to add course');
    } else {
      setCourseName('');
      setCourseId('');
      setCourseCode('');
      setTable("courses"); // Optionally switch back to courses view after adding
    }
  };

  const Menu = () => {
    return (
      <SafeAreaView style={styles.container}>
        <Button title="Courses" onPress={() => setTable("courses")} />
        <Button title="Students" onPress={() => setTable("students")} />
        <Button title="Faculty" onPress={() => setTable("faculty")} />
        <Button title="Sections" onPress={() => setTable("sections")} />
        <Button title="Sections_Faculty" onPress={() => setTable("sections_faculty")} />
        <Button title="Sections_Students" onPress={() => setTable("sections_students")} />
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.paragraph}>Select a table</Text>
      <Menu />
      {/* Table display logic, assuming your TableDisplay component handles rendering the selected table */}
      <TableDisplay tableName={table} />

      {/* Course creation form */}
      <Text>Create Course</Text>
      <TextInput
        style={styles.input}
        value={newCourseName}
        onChangeText={(text) => setCourseName(text)}  // React Native uses onChangeText instead of onChange
        placeholder="Course Name"
      />
      <TextInput
        style={styles.input}
        value={newCourseId}
        onChangeText={(text) => setCourseId(Number(text))}  // Convert text input to number
        placeholder="Course Id"
      />
      <TextInput
        style={styles.input}
        value={newCourseCode}
        onChangeText={(text) => setCourseCode(text)}
        placeholder="Course Code"
      />
      <Button
        title="Add Course"
        onPress={addCourse}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    marginTop: 12,
  }
});
