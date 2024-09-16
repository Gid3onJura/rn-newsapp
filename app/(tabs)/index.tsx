import { ActivityIndicator, StyleSheet, Text, View } from "react-native"
import React, { useEffect, useState } from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Header from "@/components/Header"
import SearchBar from "@/components/SearchBar"
import axios from "axios"
import { NewsDataType } from "@/types"
import BreakingNews from "@/components/BreakingNews"
import Categories from "@/components/Categories"
import NewsList from "@/components/NewsList"

type Props = {}

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets()
  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getBreakingNews()
  }, [])

  const getBreakingNews = async () => {
    try {
      const newsDataUrl =
        process.env.EXPO_PUBLIC_NEWS_DATA_API_BASE_URL +
        "/latest?apikey=" +
        process.env.EXPO_PUBLIC_NEWS_DATA_API_KEY +
        "&country=de&language=de&image=1&removeduplicate=1&size=5"

      const response = await axios.get(newsDataUrl)

      if (response && response.data) {
        setBreakingNews(response.data.results)
        setIsLoading(false)
      }
    } catch (error: any) {
      console.log("Error in getBreakingNews:", error.message)
    }
  }

  const onCategoryChanged = (category: string) => {
    console.log(category)
  }

  return (
    <View style={(styles.container, { paddingTop: safeTop })}>
      <Header />
      <SearchBar />
      {isLoading ? <ActivityIndicator size={"large"} /> : <BreakingNews newsList={breakingNews} />}
      <Categories onCategoryChanged={onCategoryChanged} />
      <NewsList newsList={breakingNews} />
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
