import { icons } from "@/constants/icons";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const router = useRouter();

  return (
    <Link href={`/movies/${movie.id}`} asChild>
      <TouchableOpacity className="mb-8 w-[30%]">
        <Image
          source={{
            uri: movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://placehold.co/400x800/black/orange?font=raleway&text=Not\nFound",
          }}
          className="w-full h-48 rounded-lg"
          resizeMode="cover"
        />
        {/* adult badge for adult movies */}
        {movie.adult && (
          <View className="absolute top-0 right-0 bg-red-500 px-2 py-1 rounded-bl-lg">
            <Text className="text-white text-xs font-semibold">Adult</Text>
          </View>
        )}
        <View className="absolute top-0 left-0 bg-green-600 px-2 py-1 rounded-br-lg">
          <Text className="text-white text-xs font-semibold">Movie</Text>
        </View>
        <Text
          className="text-white text-sm text-wrap mt-4 font-semibold"
          onPress={() => router.push(`/movies/${movie.id}`)}>
          {movie.title}
        </Text>
        <View className="flex-row items-center justify-start gap-x-1 mt-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-white text-xs font-semibold">
            {movie.vote_average.toFixed(1)}
          </Text>
        </View>
        <View className="flex-row items-center justify-between mt-1">
          <Text className="text-xs text-light-300 font-semibold">
            {movie.release_date?.split("-")[0]}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
