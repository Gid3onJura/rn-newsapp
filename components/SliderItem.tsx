import { Dimensions, Image, StyleSheet, Text, View } from "react-native"
import React from "react"
import { NewsDataType } from "@/types"
import { SharedValue } from "react-native-reanimated"
import { LinearGradient } from "expo-linear-gradient"
import { Colors } from "@/constants/Colors"

type Props = {
  sliderItem: NewsDataType
  index: number
  scrollX: SharedValue<number>
}

const { width } = Dimensions.get("screen")

const SliderItem = ({ sliderItem, index, scrollX }: Props) => {
  return (
    <View style={styles.itemWrapper}>
      <Image source={{ uri: sliderItem.image_url }} style={styles.image} />
      <LinearGradient colors={["transparent", "rgba(0,0,0,0.8)"]} style={styles.background}>
        <View style={styles.sourceInfo}>
          {sliderItem.source_icon && <Image source={{ uri: sliderItem.source_icon }} style={styles.sourceIcon} />}
          <Text style={styles.sourceName}>{sliderItem.source_name}</Text>
        </View>
        <Text style={styles.sourceTitle} numberOfLines={2}>
          {sliderItem.title}
        </Text>
      </LinearGradient>
    </View>
  )
}

export default SliderItem

const styles = StyleSheet.create({
  itemWrapper: {
    position: "relative",
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width - 60,
    height: 180,
    borderRadius: 20,
  },
  background: {
    position: "absolute",
    left: 30,
    right: 0,
    top: 0,
    width: width - 60,
    height: 180,
    borderRadius: 20,
    padding: 20,
  },
  sourceInfo: {
    flexDirection: "row",
    position: "absolute",
    top: 85,
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 10,
  },
  sourceIcon: {
    width: 25,
    height: 25,
    borderRadius: 20,
  },
  sourceName: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: "600",
  },
  sourceTitle: {
    color: Colors.white,
    fontSize: 14,
    position: "absolute",
    top: 120,
    paddingHorizontal: 20,
    fontWeight: "600",
  },
})
