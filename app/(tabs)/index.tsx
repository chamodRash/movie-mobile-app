import MovieCard from "@/components/movie-card";
import Pagination from "@/components/pagination";
import SearchBar from "@/components/search-bar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const getMovies = useCallback(() => fetchMovies({ query: "", page }), [page]);

  const {
    data: movieData,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(getMovies);

  const movies = movieData?.results;
  const totalPages = movieData?.total_pages;

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <View className="flex-1 bg-primary pb-32">
      <Image source={images.bg} className="absolute z-0 w-full" />
      <FlatList
        data={movies}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        keyExtractor={(item) => `${item.id}-${page}`}
        renderItem={({ item }) => <MovieCard movie={item} />}
        ListHeaderComponent={() => (
          <>
            <Image
              source={icons.logo}
              className="w-12 h-10 mt-20 mb-5 mx-auto"
            />
            {moviesLoading ? (
              <ActivityIndicator
                size={"large"}
                color={"#0000ff"}
                className="mt-10 self-center"
              />
            ) : moviesError ? (
              <Text className="text-red-500 text-center mt-5">
                {moviesError.message}
              </Text>
            ) : (
              <View className="flex-1 mt-5">
                <SearchBar
                  value=""
                  onChangeText={() => {}}
                  onPress={() => router.push("/search")}
                  placeholder="Search a movie"
                />

                <Text className="text-lg text-white font-bold my-8">
                  Latest Movies
                </Text>
              </View>
            )}
          </>
        )}
        ListFooterComponent={() =>
          totalPages > 1 && !moviesLoading ? (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          ) : null
        }
        className="flex-1 px-5 pb-16"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      />
    </View>
  );
}
