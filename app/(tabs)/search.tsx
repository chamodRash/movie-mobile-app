import MovieCard from "@/components/movie-card";
import Pagination from "@/components/pagination";
import SearchBar from "@/components/search-bar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  View,
} from "react-native";

const Search = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchRef = useRef<TextInput>(null);

  const {
    data: movieData,
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchTerm, page }), false);
  movieData &&
    console.log(
      "Movie list data:",
      movieData.total_results,
      movieData.results.length
    );

  // Debounced effect for search term changes
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm.trim()) {
        setPage(1);
        loadMovies();
      } else {
        reset();
      }
    }, 500); // 500ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Effect to update search count when new data arrives from a search
  useEffect(() => {
    const update = async () => {
      if (movieData && movieData.results.length > 0 && page === 1) {
        const firstMovie = movieData.results[0];
        if (firstMovie) {
          await updateSearchCount(searchTerm, firstMovie);
          console.log("Search count updated for:", searchTerm);
        }
      }
    };

    if (searchTerm.trim()) {
      update();
    }
  }, [movieData]);

  // Immediate effect for pagination changes
  useEffect(() => {
    if (page > 1 && searchTerm.trim()) {
      loadMovies();
    }
  }, [page]);

  useFocusEffect(() => {
    searchRef.current?.focus();
  });

  const handleSearchChange = (text: string) => {
    setSearchTerm(text);
    setPage(1);
  };

  const movies = movieData?.results;
  const totalPages = movieData?.total_pages;

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="flex-1 absolute z-0 w-full" />
      <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
      <SearchBar
        ref={searchRef}
        value={searchTerm}
        onChangeText={handleSearchChange}
        placeholder="Search a movie"
      />
      <FlatList
        data={movies}
        keyExtractor={(item) => `${item.id}-${page}`}
        renderItem={({ item }) => <MovieCard movie={item} />}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "space-between",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          !loading && !error && searchTerm ? (
            <Text className="text-light-300 text-center mt-10 mx-5">
              No results found for {`"${searchTerm.trim()}"`}
            </Text>
          ) : null
        }
        ListHeaderComponent={() => (
          <>
            {loading ? (
              <ActivityIndicator
                size={"large"}
                color={"#0000ff"}
                className="mt-10 self-center"
              />
            ) : error ? (
              <Text className="text-red-500 text-center mt-5">
                {error.message}
              </Text>
            ) : (
              <View className="flex-1 mt-8">
                {!loading &&
                  !error &&
                  searchTerm.trim() &&
                  movies?.length > 0 && (
                    <Text className="text-lg text-white font-bold">
                      Search Results for{" "}
                      <Text className="text-light-200">
                        {`"${searchTerm.trim()}"`}
                      </Text>
                    </Text>
                  )}
              </View>
            )}
          </>
        )}
        ListFooterComponent={() =>
          totalPages > 1 && !loading ? (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          ) : null
        }
      />
    </View>
  );
};

export default Search;
