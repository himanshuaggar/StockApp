// components/DetailCard.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Chart from './Chart';
import MediumChart from './Chart';
import { ptData } from '../utils/staticData';
import Seekbar from './Seekbar';

const DetailCard = ({ stock, rate, change_percentage }) => {
    return (
        <ScrollView  showsVerticalScrollIndicator={false} style={styles.card}>
            <View style={styles.header}>
                <Image source={{ uri: "https://i.pinimg.com/564x/8d/f5/e7/8df5e76136dcba44841002494e01e050.jpg" }} style={{ height: 40, width: 40 }} />
                <View>
                    <Text style={styles.title}>{stock.Name}</Text>
                    <Text style={styles.subtitle}>{stock.Symbol}, {stock.AssetType}</Text>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>${rate}</Text>
                    <Text style={[styles.change, change_percentage > 0 ? styles.positive : styles.negative]}>
                        {change_percentage > 0 ? `${change_percentage}` : `${change_percentage}`}
                    </Text>
                </View>
            </View>
            <MediumChart data={ptData}  />
            <View style={styles.infoContainer}>
                <Text style={styles.sectionTitle}>About {stock.Name}</Text>
                <Text style={{color:'gray'}}>{stock.Description}</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagContainer}>
                <Text style={styles.tag}>{stock.Industry}</Text>
                <Text style={styles.tag}>{stock.Sector}</Text>
            </ScrollView>
            <Seekbar
                leftPoint={stock['52WeekLow']}
                rightPoint={stock['52WeekHigh']}
                leftText="52 Week low"
                position={0.7}
                rightText="52 Week high"
            />
            <View style={styles.statsContainer}>
                
                <View style={styles.stat}>
                    <Text style={styles.statLabel}>Market Cap</Text>
                    <Text style={styles.statValue}>{stock.MarketCapitalization}</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statLabel}>P/E Ratio</Text>
                    <Text style={styles.statValue}>{stock.PERatio}</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statLabel}>Dividend Yield</Text>
                    <Text style={styles.statValue}>{stock.DividendYield}</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statLabel}>Profit Margin</Text>
                    <Text style={styles.statValue}>{stock.ProfitMargin}</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statLabel}>Beta</Text>
                    <Text style={styles.statValue}>{stock.Beta}</Text>
                </View>
            </View>
        </ScrollView>
    )
}
    ;

const styles = StyleSheet.create({
    card: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        margin: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 50,
        height: 50,
        marginRight: 16,
    },
    title: {
        width:'70%',
        fontSize: 18,
        fontWeight: 'bold',
        color:'#000'
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
    },
    priceContainer: {
        marginLeft: 'auto',
        alignItems: 'flex-end',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    change: {
        fontSize: 14,
    },
    positive: {
        color: '#4caf50',
    },
    negative: {
        color: '#f44336',
    },
    infoContainer: {
        marginTop: 16,
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: 8,
         color:'#000'
    },
    tagContainer: {
        flexDirection: 'row',
        marginVertical: 16,
    },
    tag: {
        backgroundColor: '#ffa756',
        padding: 8,
        borderRadius: 14,
        marginRight: 8,
        color:'#fff'
    },
    statsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    stat: {
        width: '48%',
        marginBottom: 16,
    },
    statLabel: {
        fontSize: 14,
        fontWeight:'900',
        color: '#666',
    },
    statValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#808080',
    },
});

export default DetailCard;
