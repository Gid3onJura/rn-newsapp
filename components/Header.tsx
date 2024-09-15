import { Image, Pressable, StyleSheet, Text, View } from "react-native"
import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { Colors } from "@/constants/Colors"

type Props = {}

const Header = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
        <Image style={styles.userImage} source={{ uri: "https://randomuser.me/api/portraits/med/men/99.jpg" }} />
        <View style={{ flexDirection: "column", gap: 4 }}>
          <Text style={{ fontSize: 13, fontWeight: "light", color: Colors.darkGrey }}>Welcome</Text>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: Colors.black }}>Brad Simon</Text>
        </View>
      </View>
      <Pressable onPress={() => {}}>
        <Ionicons name="notifications-outline" size={24} color={Colors.black} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
})

export default Header
