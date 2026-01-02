import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
type Users={
    id:number;
    name:string;
    role:string;
    salary: number;
}
const API = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const [loading, setLoading] = useState(true);
  const [clients, setClient] = useState<any[]>([]);
  useEffect(() => {
  fetch('http://192.168.1.7:3000/user')
    .then(res => res.json())
    .then((data: Users[]) => {
      setUsers(data);
      setLoading(false);
    })
    .catch(err => {
      console.log(err);
      setLoading(false);
    });
}, []);

  useEffect(() => {
    fetch('http://192.168.1.7:3000/client')
      .then(res => res.json())
      .then(data => {
        setClient(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="red"/>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Users List</Text>

      <FlatList<Users>
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.text}>ID: {item.id}</Text>
            <Text style={styles.text}>Name: {item.name}</Text>
            <Text style={styles.text}>Role: {item.role}</Text>
            <Text style={styles.text}>Salary: ₹{item.salary}</Text>
          </View>
        )}
      />
      <Text style={styles.title}>Clients List</Text>

      <FlatList
        data={clients}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.text}>ID: {item.id}</Text>
            <Text style={styles.text}>Name: {item.name}</Text>
            <Text style={styles.text}>Role: {item.role}</Text>
            {/* <Text style={styles.text}>Salary: ₹{item.salary}</Text> */}
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default API;


const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
  },
});
