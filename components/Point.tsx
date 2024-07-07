import { View, Text, StyleSheet } from "react-native";
import React, { FC } from "react";

interface PointProps {
    label: string;
    point: number;
    rightEnd?: boolean;
}
const Point: FC<PointProps> = ({ label, point, rightEnd }) => {
    return (
        <View style={{ alignItems: rightEnd ? "flex-end" : "center" }}>
            <Text style={styles.label}>
                {label}
            </Text>
            <Text style={styles.point}>
                {point}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        opacity: 0.6,
        marginVertical: 10,
        color:'#000'
    },
    point:{
        opacity:0.8,
        color:'#000'
    }
});
export default Point;