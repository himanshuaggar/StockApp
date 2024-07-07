import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import DetailCard from '../components/DetailCard';
import LoadingScreen from '../components/LoadingScreen';
import SearchBar from '../components/SearchBar';

const StockDetailScreen = ({ route, navigation }) => {
  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { stockTicker, rate, change_percentage } = route.params;

  const fetchStockData = async () => {
    try {
      console.log("Fetching stock data...");
      const response = await axios.get(
        'https://www.alphavantage.co/query',
        {
          params: {
            function: 'OVERVIEW',
            symbol: stockTicker,
            apikey: 'NPDQ12Z1S1F0M6H6',
          },
        }
      );

      console.log("API response received:", response.data);
      if (response.data) {
        setStock(response.data);
      } else {
        throw new Error("No data received from API");
      }
    } catch (err) {
      console.error("Error fetching stock data:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  const handleSelectStock = (stockTicker) => {
    navigation.navigate('StockDetail', { stockTicker });
  };

  if (loading) return <LoadingScreen />;
  if (error) return <View><Text>Error: {error}</Text></View>;
  if (!stock) return <View><Text>No Data</Text></View>;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>DETAILS SCREEN</Text>
        <SearchBar onSelect={handleSelectStock} />
      </View>
      <DetailCard stock={stock} rate={rate} change_percentage={change_percentage} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    color: '#000',
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
    backgroundColor: '#fff',
    color: '#000',
  },
  searchInput: {
    height: 40,
    width: 180,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
});

export default StockDetailScreen;
