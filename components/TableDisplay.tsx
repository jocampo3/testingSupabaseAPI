import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { supabase } from '../utils/supabase';
import { keyExtractors, renderItems } from '../utils/flatListHelpers';

interface TableScreenProps {
  tableName: keyof typeof keyExtractors & keyof typeof renderItems;
}

export default function TableScreen({ tableName }: TableScreenProps) {
  const [records, setRecords] = useState([] as any[]);

  useEffect(() => {
    const getRecords = async () => {
      try {
        const { data: records, error } = await supabase.from(tableName).select();
        console.log([tableName, records]);
        if (error) {
          console.error(`Error fetching ${tableName}:`, error.message);
          return;
        }

        if (records && records.length > 0) {
          setRecords(records);
        }
      } catch (error) {
        console.error(`Error fetching ${tableName}:`, error.message);
      }
    };
    getRecords();
  }, [tableName]);

  const deleteRecord = async (id: number) => {
    try {
      const { error } = await supabase
        .from(tableName)
        .delete() // delete row
        .eq("id", id) // the id of the row to delete
        
        if (error) throw error;

        const { data, error: fetchError } = await supabase.from(tableName).select();
        if (fetchError) throw fetchError;

        setRecords(data);
    }
    catch (error) {
      console.error(error)
    }
  };

  const deleteRecordButton = ({ item }: { item: any }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <Text style={{ flex: 1 }}>{item.name}</Text> {/* Assuming 'name' is a field in your records */}
      <Button title="Delete" onPress={() => deleteRecord(item.id)} />
    </View>
  )

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{tableName.charAt(0).toUpperCase() + tableName.slice(1)}</Text>
      <FlatList
        data={records}
        keyExtractor={keyExtractors[tableName]}
        renderItem={renderItems[tableName]}
        // deleteRecordButton={deleteRecordButton}
      />      
    </View>
  );
}

