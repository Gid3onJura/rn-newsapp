import { View, StyleSheet, TextInput } from "react-native"
import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { Colors } from "@/constants/Colors"

type Props = {
  withHoritzontalPadding: boolean
  setSearchQuery: Function
}

const SearchBar = ({ withHoritzontalPadding, setSearchQuery }: Props) => {
  return (
    <View style={[styles.container, withHoritzontalPadding && { paddingHorizontal: 20 }]}>
      <View style={styles.searchbar}>
        <Ionicons name="search-outline" size={20} color={Colors.lightGrey} />
        <TextInput
          style={styles.searchText}
          placeholder="Search"
          placeholderTextColor={Colors.lightGrey}
          autoCapitalize="none"
          onChangeText={(query) => setSearchQuery(query)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
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
