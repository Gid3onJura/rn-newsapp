import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect, useState } from "react"
import { Link, router, Stack, useLocalSearchParams } from "expo-router"
import axios from "axios"
import { NewsDataType } from "@/types"
import { Ionicons } from "@expo/vector-icons"
import Loading from "@/components/Loading"
import { NewsItem } from "@/components/NewsList"

type Props = {}

const Page = (props: Props) => {
  const { query, category, country } = useLocalSearchParams<{ query: string; category: string; country: string }>()
  const [news, setNews] = useState<NewsDataType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getNews()
  }, [])

  const getNews = async () => {
    try {
      let queryString = ""
      let categoryString = ""
      let countryString = ""

      if (query.length !== 0) {
        queryString = "&q=" + query
      }
      if (category.length !== 0) {
        categoryString = "&category=" + category
      }
      if (country.length !== 0) {
        countryString = "&country=" + country.toLowerCase()
      }
      const newsDataUrl =
        process.env.EXPO_PUBLIC_NEWS_DATA_API_BASE_URL +
        "/news?apikey=" +
        process.env.EXPO_PUBLIC_NEWS_DATA_API_KEY +
        "&language=de&image=1&removeduplicate=1&size=10" +
        queryString +
        categoryString +
        countryString

      const response = await axios.get(newsDataUrl)

      if (response && response.data) {
        setNews(response.data.results)
        setIsLoading(false)
      }
    } catch (error: any) {
      console.log("Error in getNews:", error.message)
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
          title: "Search",
        }}
      />
      <View style={styles.container}>
        {isLoading ? (
          <Loading size={"large"} />
        ) : (
          <FlatList
            data={news}
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
    marginHorizontal: 20,
    marginVertical: 20,
  },
})
