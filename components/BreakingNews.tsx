import { FlatList, StyleSheet, Text, View } from "react-native"
import React, { useState } from "react"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { NewsDataType } from "@/types"
import SliderItem from "@/components/SliderItem"
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated"

type Props = {
  newsList: Array<NewsDataType>
}

const BreakingNews = ({ newsList }: Props) => {
  const [paginationIndex, setPaginationIndex] = useState(0)
  const scrollX = useSharedValue(0)
  const ref = useAnimatedRef<Animated.FlatList<any>>()

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x
    },
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BreakingNews</Text>
      <View style={styles.slideWrapper}>
        <Animated.FlatList
          ref={ref}
          data={newsList}
          keyExtractor={(_, index) => `list_item${index}`}
          renderItem={({ item, index }) => <SliderItem sliderItem={item} index={index} scrollX={scrollX} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={onScrollHandler}
          scrollEventThrottle={16}
        />
      </View>
    </View>
  )
}

export default BreakingNews

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 10,
    marginLeft: 20,
  },
  slideWrapper: {
    justifyContent: "center",
  },
})
