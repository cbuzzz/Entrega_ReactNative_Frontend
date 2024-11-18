import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { searchByUsername } from '../services/experienceService';

const SearchExperiences = () => {
    const [username, setUsername] = useState('');
    const [experiences, setExperiences] = useState([]);

    const handleSearch = async () => {
        console.log('Username being searched:', username);
        if (!username) {
            alert('Please enter a username');
            return;
        }
        try {
            const result = await searchByUsername(username);
            console.log('Experiences received:', result);
            setExperiences(result);
        } catch (error) {
            console.error('Error fetching experiences:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter username"
                value={username}
                onChangeText={(text) => {
                    console.log('Username updated to:', text);
                    setUsername(text);
                }}
            />
            <Button title="Search" onPress={handleSearch} />
            <FlatList
                data={experiences}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.experience}>
                        <Text style={styles.title}>Description: {item.description}</Text>
                        <Text>Owner: {item.owner?.name || 'Unknown'}</Text>
                        <Text>Participants:</Text>
                        {item.participants?.map((participant) => (
                            <Text key={participant._id}>- {participant.name}</Text>
                        ))}
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    input: { borderWidth: 1, padding: 10, marginBottom: 10 },
    experience: { padding: 10, borderBottomWidth: 1 },
    title: { fontWeight: 'bold' },
});

export default SearchExperiences;
