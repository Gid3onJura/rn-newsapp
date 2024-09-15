import { View, StyleSheet, TextInput } from "react-native"
import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { Colors } from "@/constants/Colors"

type Props = {}

const SearchBar = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchbar}>
        <Ionicons name="search-outline" size={20} color={Colors.lightGrey} />
        <TextInput
          style={styles.searchText}
          placeholder="Search"
          placeholderTextColor={Colors.lightGrey}
          autoCapitalize="none"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  searchbar: {
    backgroundColor: "#e4e4e4",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: "row",
    gap: 10,
  },
  searchText: {
    fontSize: 14,
    flex: 1,
    color: Colors.darkGrey,
  },
})

export default SearchBar
