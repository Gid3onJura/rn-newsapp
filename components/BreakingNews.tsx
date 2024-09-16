import { FlatList, StyleSheet, Text, View, ViewToken } from "react-native"
import React, { useRef, useState } from "react"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { NewsDataType } from "@/types"
import SliderItem from "@/components/SliderItem"
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated"
import Pagination from "@/components/Pagination"

type Props = {
  newsList: Array<NewsDataType>
}

const BreakingNews = ({ newsList }: Props) => {
  const [data, setData] = useState(newsList)
  const [paginationIndex, setPaginationIndex] = useState(0)
  const scrollX = useSharedValue(0)
  const ref = useAnimatedRef<Animated.FlatList<any>>()

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x
    },
  })

  const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length !== 0 && viewableItems[0]["index"] !== undefined && viewableItems[0]["index"] !== null) {
      setPaginationIndex(viewableItems[0]["index"] % newsList.length)
    }
  }

  const viewabilityConfig = {
    waitForInteraction: true,
    itemVisiblePercentThreshold: 70,
  }

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {
        minimumViewTime: 500,
        itemVisiblePercentThreshold: 75,
      },
      onViewableItemsChanged,
    },
  ])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BreakingNews</Text>
      <View style={styles.slideWrapper}>
        <Animated.FlatList
          ref={ref}
          data={data}
          keyExtractor={(_, index) => `list_item${index}`}
          renderItem={({ item, index }) => <SliderItem sliderItem={item} index={index} scrollX={scrollX} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={onScrollHandler}
          scrollEventThrottle={16}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            setData([...data, ...newsList])
          }}
          viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        />
        <Pagination items={newsList} scrollX={scrollX} paginationIndex={paginationIndex} />
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
