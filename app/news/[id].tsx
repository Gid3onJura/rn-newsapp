import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect, useState } from "react"
import { router, Stack, useLocalSearchParams } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { NewsDataType } from "@/types"
import axios from "axios"
import Loading from "@/components/Loading"
import { Colors } from "@/constants/Colors"
import moment from "moment"

type Props = {}

const NewsDetails = (props: Props) => {
  const { id } = useLocalSearchParams<{ id: string }>()

  const [news, setNews] = useState<NewsDataType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getNews()
  }, [])

  const getNews = async () => {
    try {
      const newsDataUrl =
        process.env.EXPO_PUBLIC_NEWS_DATA_API_BASE_URL +
        "/news?apikey=" +
        process.env.EXPO_PUBLIC_NEWS_DATA_API_KEY +
        "&id=" +
        id

      const response = await axios.get(newsDataUrl)

      if (response && response.data) {
        setNews(response.data.results)
        setIsLoading(false)
      }
    } catch (error: any) {
      console.log("Error in getBreakingNews:", error.message)
    }
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={22} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => {}}>
              <Ionicons name="heart-outline" size={22} />
            </TouchableOpacity>
          ),
          title: "",
        }}
      />

      {isLoading ? (
        <Loading size={"large"} />
      ) : (
        <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
          <Text style={styles.newsInfoTitle}>{news[0].title}</Text>
          <View style={styles.newsInfoWrapper}>
            <Text style={styles.newsInfo}>{moment(news[0].pubDate).format("DD. MMMM, HH:mm")}</Text>
            <Text style={styles.newsInfo}>{news[0].source_name}</Text>
          </View>
          <Image source={{ uri: news[0].image_url }} style={styles.newsImage} />
          {news[0].content && news[0].content !== "ONLY AVAILABLE IN PAID PLANS" ? (
            <Text style={styles.newsInfoContent}>{news[0].content}</Text>
          ) : (
            <Text style={styles.newsInfoContent}>{news[0].description}</Text>
          )}
        </ScrollView>
      )}
    </>
  )
}

export default NewsDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  newsImage: {
    width: "100%",
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
  newsInfoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.black,
    marginVertical: 10,
    letterSpacing: 0.5,
  },
  newsInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  newsInfo: {
    fontSize: 12,
    color: Colors.darkGrey,
  },
  newsInfoContent: {
    fontSize: 14,
    color: "#555",
    letterSpacing: 0.8,
    lineHeight: 22,
  },
})
