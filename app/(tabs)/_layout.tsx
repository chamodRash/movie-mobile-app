import TabItem from "@/components/tab-item";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 52,
          borderWidth: 1,
          borderColor: "#0F0D23",
          backgroundColor: "#0F0D23",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          paddingHorizontal: 10,
          overflow: "hidden",
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabItem
              focused={focused}
              image={images.highlight}
              icon={icons.home}
              label="Home"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabItem
              focused={focused}
              image={images.highlight}
              icon={icons.search}
              label="Search"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabItem
              focused={focused}
              image={images.highlight}
              icon={icons.save}
              label="Saved"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabItem
              focused={focused}
              image={images.highlight}
              icon={icons.person}
              label="Profile"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
