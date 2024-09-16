import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useRef, useState } from "react"
import { Colors } from "@/constants/Colors"
import newsCategoryList from "@/constants/Categories"

type Props = {
  onCategoryChanged: (category: string) => void
}

const Categories = ({ onCategoryChanged }: Props) => {
  const scrollRef = useRef<ScrollView>(null)
  const itemRef = useRef<TouchableOpacity[] | null[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  const handleSelectCategory = (index: number) => {
    const selected = itemRef.current[index]
    setActiveIndex(index)

    selected?.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 20, y: 0, animated: true })
    })

    onCategoryChanged(newsCategoryList[index].slug)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trending</Text>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.itemsWrapper}
      >
        {newsCategoryList.map((item, index) => (
          <TouchableOpacity
            ref={(element) => (itemRef.current[index] = element)}
            key={index}
            style={[styles.item, activeIndex === index && styles.itemActive]}
            onPress={() => handleSelectCategory(index)}
          >
            <Text style={[styles.itemTitle, activeIndex === index && styles.itemTitleActive]}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

export default Categories

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
  itemsWrapper: {
    gap: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  item: {
    borderWidth: 1,
    borderColor: Colors.darkGrey,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  itemTitle: {
    fontSize: 14,
    color: Colors.darkGrey,
    letterSpacing: 0.5,
  },
  itemActive: {
    backgroundColor: Colors.tint,
    borderColor: Colors.tint,
  },
  itemTitleActive: {
    fontWeight: "600",
    color: Colors.white,
  },
})
