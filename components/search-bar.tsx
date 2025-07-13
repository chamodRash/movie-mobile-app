import { icons } from "@/constants/icons";
import React, { forwardRef } from "react";
import { Image, TextInput, View, TextInputProps } from "react-native";

interface Props extends TextInputProps {
  onChangeText: (text: string) => void;
}

const SearchBar = forwardRef<TextInput, Props>((
  { onChangeText, ...props },
  ref
) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-6 py-2">
      <Image
        source={icons.search}
        className="size-6"
        resizeMode="contain"
        tintColor={"#ab8bff"}
      />
      <TextInput
        ref={ref}
        placeholderTextColor="#ab8bff"
        className="flex-1 text-white ml-3 text-lg"
        onChangeText={onChangeText}
        {...props}
      />
    </View>
  );
});

SearchBar.displayName = "SearchBar";

export default SearchBar;
