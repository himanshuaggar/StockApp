import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const screenwidth = Dimensions.get('screen').width

const StockCard = ({ stock }) => {
    const navigation = useNavigation();
    const changePercentage = parseFloat(stock.change_percentage.replace('%', ''));


    const handlePress = () => {
        navigation.navigate('StockDetail', {
            stockTicker: stock.ticker,
            rate: stock.price,
            change_percentage: changePercentage,
        });
    };
    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.card}>
                <View style={styles.header}>
                    <Image source={{ uri: "https://i.pinimg.com/564x/8d/f5/e7/8df5e76136dcba44841002494e01e050.jpg" }} style={styles.logo} />

                </View>
                <View>
                    <Text style={styles.title}>{stock.ticker}</Text>
                </View>
                <Text style={styles.price}>${stock.price}</Text>
                <Text style={[styles.change, { color: changePercentage > 0 ? '#4caf50' : '#f44336' }]}>
                {stock.change_percentage > 0 ? `+${stock.change_percentage}%` : `${stock.change_percentage}%`}
                </Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    card: {
        padding: 4,
        backgroundColor: '#fff',
        color: '#000',
        borderRadius: 8,
        margin: 8,
        width: screenwidth * 0.45,
        marginTop: 10,
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        paddingBottom: 12,
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    subtitle: {
        fontSize: 14,
        color: '#000',

    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'gray',
    },
    change: {
        fontSize: 14,
    },
    positive: {
        color: '#000',
    },
    negative: {
        color: '#f44336',
    },
});

export default StockCard;
