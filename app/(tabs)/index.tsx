import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native"
import React, { useEffect, useState } from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Header from "@/components/Header"
import SearchBar from "@/components/SearchBar"
import axios from "axios"
import { NewsDataType } from "@/types"
import BreakingNews from "@/components/BreakingNews"
import Categories from "@/components/Categories"
import NewsList from "@/components/NewsList"
import Loading from "@/components/Loading"

type Props = {}

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets()
  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([])
  const [news, setNews] = useState<NewsDataType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getBreakingNews()
    getNews()
  }, [])

  const getBreakingNews = async () => {
    try {
      const newsDataUrl =
        process.env.EXPO_PUBLIC_NEWS_DATA_API_BASE_URL +
        "/latest?apikey=" +
        process.env.EXPO_PUBLIC_NEWS_DATA_API_KEY +
        "&language=de&image=1&removeduplicate=1&size=5"

      const response = await axios.get(newsDataUrl)

      if (response && response.data) {
        setBreakingNews(response.data.results)
        setIsLoading(false)
      }
    } catch (error: any) {
      console.log("Error in getBreakingNews:", error.message)
    }
  }

  const getNews = async () => {
    try {
      const newsDataUrl =
        process.env.EXPO_PUBLIC_NEWS_DATA_API_BASE_URL +
        "/latest?apikey=" +
        process.env.EXPO_PUBLIC_NEWS_DATA_API_KEY +
        "&language=de&image=1&removeduplicate=1&size=10"

      const response = await axios.get(newsDataUrl)

      if (response && response.data) {
        setNews(response.data.results)
        // setIsLoading(false)
      }
    } catch (error: any) {
      console.log("Error in getNews:", error.message)
    }
  }

  const onCategoryChanged = (category: string) => {
    console.log(category)
  }

  return (
    <ScrollView style={(styles.container, { paddingTop: safeTop })}>
      <Header />
      <SearchBar />
      {isLoading ? <Loading size={"large"} /> : <BreakingNews newsList={breakingNews} />}
      <Categories onCategoryChanged={onCategoryChanged} />
      <NewsList newsList={news} />
    </ScrollView>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
