// utils/flatListHelpers.ts
import { Text } from 'react-native';

export const keyExtractors = {
  courses: (item: any) => item.course_id?.toString(),
  students: (item: any) => item.student_id?.toString(),
  faculty: (item: any) => item.faculty_id?.toString(),
  sections: (item: any) => item.section_id?.toString(),
  sections_students: (item: any) => item.id?.toString(),
  sections_faculty: (item: any) => item.id?.toString(),
};

export const renderItems = {
  courses: ({ item }: { item: any }) => (
    <Text key={item.course_id}>{item.course_name}</Text>
  ),
  students: ({ item }: { item: any }) => (
    <Text key={item.student_id}>{item.first_name} {item.last_name}</Text>
  ),
  faculty: ({ item }: { item: any }) => (
    <Text key={item.faculty_id}>{item.first_name} {item.last_name}</Text>
  ),
  sections: ({ item }: { item: any }) => (
    <Text key={item.section_id}>{item.section_name} - {item.term} {item.year}</Text>
  ),
  sections_students: ({ item }: { item: any }) => (
    <Text key={item.id}>Section ID: {item.section_id} - Student ID: {item.student_id}</Text>
  ),
  sections_faculty: ({ item }: { item: any }) => (
    <Text key={item.id}>Section ID: {item.section_id} - Faculty ID: {item.faculty_id}</Text>
  ),
};
