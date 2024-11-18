import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import experienceService from '../services/experienceService';

const SearchExperiences = () => {
    const [username, setUsername] = useState('');
    const [experiences, setExperiences] = useState([]);

    const handleSearch = async () => {
        try {
            const result = await experienceService.searchByUsername(username);
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
                onChangeText={setUsername}
            />
            <Button title="Search" onPress={handleSearch} />
            <FlatList
                data={experiences}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <Text style={styles.experience}>
                        {item.title} (Owner: {item.owner})
                    </Text>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    input: { borderWidth: 1, padding: 10, marginBottom: 10 },
    experience: { padding: 10, borderBottomWidth: 1 },
});

export default SearchExperiences;
