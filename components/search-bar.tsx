import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

interface Props {
  onPress?: () => void;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar = ({ onPress, placeholder, value, onChangeText }: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-6 py-2">
      <Image
        source={icons.search}
        className="size-6"
        resizeMode="contain"
        tintColor={"#ab8bff"}
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#ab8bff"
        value={value}
        className="flex-1 text-white ml-3 text-lg"
        onChangeText={onChangeText}
        onPress={onPress}
      />
    </View>
  );
};

export default SearchBar;
