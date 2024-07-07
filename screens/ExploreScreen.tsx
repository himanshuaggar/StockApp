import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import axios from 'axios';
import StockCard from '../components/StockCard';
import LoadingScreen from '../components/LoadingScreen';
import { useTheme } from '../context/ThemeContext';
import SearchBar from '../components/SearchBar';

const TopGainers = () => {
    const { theme, toggleTheme } = useTheme();
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopGainers = async () => {
            try {
                const response = await axios.get(`https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=NPDQ12Z1S1F0M6H6`);
                console.log(response.data.top_gainers)
                setStocks(response.data.top_gainers);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTopGainers();
    }, []);

    if (loading) return <LoadingScreen />;
    if (error) return <View><Text>Error: {error}</Text></View>;

    return (
        <View style={styles.grid}>
            {stocks.map(stock => (
                <StockCard key={stock.Symbol} stock={stock} />
            ))}
        </View>
    );
};

const TopLosers = () => {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopLosers = async () => {
            try {
                const response = await axios.get(`https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=YOUR_API_KEY`);
                console.log(response.data.top_losers);
                setStocks(response.data.top_losers);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTopLosers();
    }, []);

    if (loading) return <LoadingScreen />;
    if (error) return <View><Text>Error: {error}</Text></View>;

    return (
        <View style={styles.grid}>
            {stocks.map(stock => (
                <StockCard key={stock.Symbol} stock={stock} />
            ))}
        </View>
    );
};

const ExploreScreen = ({ navigation }) => {
    const [selectedCategory, setSelectedCategory] = useState('Top Gainers');
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'gainers', title: 'Top Gainers' },
        { key: 'losers', title: 'Top Losers' },
    ]);

    const renderScene = SceneMap({
        gainers: TopGainers,
        losers: TopLosers,
    });


    return (

        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: 400 }}
            renderTabBar={props => (
                <View>
                    <View style={{backgroundColor:'white', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <Text style={{fontSize:24, fontWeight:'700',color:'gray'}}>Stock App</Text>
                    </View>
                    <TabBar
                        {...props}
                        indicatorStyle={{ backgroundColor: 'black' }}
                        style={{ backgroundColor: 'white' }}
                        labelStyle={{ color: 'black' }}
                    />
                </View>
            )}
        />

    );
};

const styles = StyleSheet.create({
    grid: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
    },
});

export default ExploreScreen;
