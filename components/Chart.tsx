import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import React, { FC } from "react";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { RFValue } from "react-native-responsive-fontsize";
import PointerChart from "./PointerChart";
import { lineDataItem } from "react-native-gifted-charts";

const screenHeight = Dimensions.get("window").height;
const height = screenHeight * 0.28;
interface MediumChartProps {
    loading?: boolean;
    data: lineDataItem[];
    color?: string;
    onPressExpand?: () => void;
}
const MediumChart: FC<MediumChartProps> = ({
    loading,
    data,
    color,
    onPressExpand,
}) => {
    const { colors } = useTheme();
    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator  />
            ) : (
                <View
                    style={{
                        height: height,
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingTop: 100,
                        overflow: "hidden",
                    }}
                >
                    <PointerChart color={color} data={data} height={height} />
                </View>
            )}
            <TouchableOpacity
                onPress={onPressExpand}
                style={[styles.absoluteBtn, { backgroundColor: colors.card }]}
            >
                <Icon name="zoom-out-map" color="green" size={RFValue(16)} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        height: height,
    },
    absoluteBtn: {
        padding: 6,
        borderRadius: 50,
        position: "absolute",
        right: 0,
        bottom: 4,
    },
});
export default MediumChart;