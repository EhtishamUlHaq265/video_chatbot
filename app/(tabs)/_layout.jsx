import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Tabs, Redirect, useNavigation } from "expo-router";
import { icons } from "../../constants";

const BackButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View
      style={{
        marginLeft: 10,
      }}
    >
      <Image
        source={icons.leftarrow}
        resizeMode="contain"
        className="w-8 h-8"
      />
    </View>
  </TouchableOpacity>
);

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  const navigation = useNavigation();
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            title: "Bookmark",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name="Bookmark"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.plus}
                color={color}
                name="Create"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="chatbot"
          // options={
          //   {
          //     title: 'Chatbot',
          //     tabBarStyle: { display: 'none' },
          //     tabBarIcon: ({ color, focused }) => (
          //     <TabIcon
          //       icon={icons.chatbot}
          //       color={color}
          //       name='Chatbot'
          //       focused={focused}
          //     />)
          //   }
          // }
          options={({ navigation }) => ({
            headerShown: true,
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }} className="items-center flex w-full justify-center gap-2">
                <Image source={icons.chatbot} className="w-10 h-10" />
                <Text style={{ color: '#FFFFFF', marginLeft: 8 }} className="text-xl">Chat Bot</Text>
              </View>
            ),
            tabBarStyle: { display: 'none' },
            headerTintColor: '#FFFFFF',
            headerStyle: {
              backgroundColor: '#161622',

              
            },
            headerLeft: () => (
              <BackButton onPress={() => navigation.goBack()} />
            ),
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.chatbot}
                color={color}
                name="Chatbot"
                focused={focused}
              />
            ),
          })}
          
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});
