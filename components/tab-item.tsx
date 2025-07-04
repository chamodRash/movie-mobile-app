import React from "react";
import { Image, ImageBackground, Text, View } from "react-native";

const TabItem = ({
  focused,
  image,
  icon,
  label,
}: {
  focused?: boolean;
  image: any;
  icon: any;
  label: string;
}) => {
  if (focused) {
    return (
      <>
        <ImageBackground
          source={image}
          className="flex flex-row w-full min-w-[100px] flex-1 min-h-12 mt-4 justify-center items-center rounded-full overflow-hidden">
          <Image source={icon} tintColor={"#151312"} className="size-5" />
          <Text className="text-secondary text-base font-semibold ml-2">
            {label}
          </Text>
        </ImageBackground>
      </>
    );
  }

  return (
    <>
      <View className="size-full mt-4 justify-center items-center rounded-full">
        <Image source={icon} tintColor={"#A8B5DB"} className="size-5" />
      </View>
    </>
  );
};

export default TabItem;
