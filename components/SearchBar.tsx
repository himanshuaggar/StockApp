import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { storeData, getData } from '../utils/cache';

const categories = ['All', 'Stocks', 'Etfs'];

const SearchBar = ({ onSelect }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [recentSearches, setRecentSearches] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const loadRecentSearches = async () => {
            const data = await getData('recentSearches');
            if (data) {
                setRecentSearches(data);
            }
        };

        loadRecentSearches();
    }, []);

    const fetchSuggestions = async (query) => {
        try {
            const response = await axios.get('https://www.alphavantage.co/query', {
                params: {
                    function: 'SYMBOL_SEARCH',
                    keywords: query,
                    apikey: 'NPDQ12Z1S1F0M6H6',
                },
            });
            setSuggestions(response.data.bestMatches);
        } catch (err) {
            console.error('Error fetching suggestions:', err.message);
        }
    };

    const handleSearch = async () => {
        if (!searchQuery) return;

        const newRecentSearches = [searchQuery, ...recentSearches.filter((item) => item !== searchQuery)];
        setRecentSearches(newRecentSearches);
        await storeData('recentSearches', newRecentSearches);

        onSelect(searchQuery);
    };

    const filteredSuggestions = suggestions.filter((item) => {
        if (selectedCategory === 'All') return true;
        return item.AssetType === selectedCategory;
    });

    useEffect(() => {
        if (searchQuery.length > 1) {
            fetchSuggestions(searchQuery);
        } else {
            setSuggestions([]);
        }
    }, [searchQuery]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search stocks..."
                placeholderTextColor="#888"
                onSubmitEditing={handleSearch}
            />
            <FlatList
                data={categories}
                horizontal
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => setSelectedCategory(item)} style={styles.chip}>
                        <Text style={styles.chipText}>{item}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item}
            />
            <FlatList
                data={filteredSuggestions}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => onSelect(item['1. symbol'])} style={styles.suggestion}>
                        <Text style={styles.suggestionText}>{item['2. name']}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item['1. symbol']}
            />
            <Text style={styles.recentTitle}>Recent Searches:</Text>
            {recentSearches.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => onSelect(item)}>
                    <Text style={styles.recentText}>{item}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 8,
        borderRadius: 4,
        marginBottom: 16,
        color: '#000',
    },
    suggestion: {
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    suggestionText: {
        color: '#000',
    },
    chip: {
        padding: 8,
        backgroundColor: '#ddd',
        borderRadius: 16,
        marginRight: 8,
    },
    chipText: {
        fontSize: 14,
        color: '#000',
    },
    recentTitle: {
        fontWeight: 'bold',
        marginTop: 16,
        color: '#000',
    },
    recentText: {
        color: '#000',
        marginTop: 8,
    },
});

export default SearchBar;
