import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { Link, Stack } from "expo-router"
import Loading from "@/components/Loading"
import { NewsItem } from "@/components/NewsList"
import { NewsDataType } from "@/types"
import { useIsFocused } from "@react-navigation/native"

type Props = {}

const Page = (props: Props) => {
  const [bookmarkNews, setBookmarkNews] = useState<NewsDataType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const isFocused = useIsFocused()

  useEffect(() => {
    fetchBookmarks()
  }, [isFocused])

  const fetchBookmarks = async () => {
    await AsyncStorage.getItem("bookmarks").then(async (token) => {
      const bookmarks = JSON.parse(token || "[]")
      setIsLoading(true)
      if (bookmarks !== null) {
        let query_string = bookmarks.join(",")
        const newsDataUrl =
          process.env.EXPO_PUBLIC_NEWS_DATA_API_BASE_URL +
          "/news?apikey=" +
          process.env.EXPO_PUBLIC_NEWS_DATA_API_KEY +
          "&id=" +
          query_string
        try {
          const response = await axios.get(newsDataUrl)
          setBookmarkNews(response.data.results)
          setIsLoading(false)
        } catch (error: any) {
          console.log("Error in fetchBookmarks:", error.message)
          setIsLoading(false)
        }
      } else {
        setBookmarkNews([])
        setIsLoading(false)
      }
    })
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
        }}
      />
      <View style={styles.container}>
        {isLoading ? (
          <Loading size={"large"} />
        ) : (
          <FlatList
            data={bookmarkNews}
            keyExtractor={(_, index) => `list_item${index}`}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <Link href={`/news/${item.article_id}`} asChild key={index}>
                  <TouchableOpacity>
                    <NewsItem item={item} />
                  </TouchableOpacity>
                </Link>
              )
            }}
          />
        )}
      </View>
    </>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
})
