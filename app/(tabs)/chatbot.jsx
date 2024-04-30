import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { speak, stop, isSpeakingAsync } from "expo-speech";

const Chatbot = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const [chat, setChat] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const API_KEY = "AIzaSyDZho2QET6QahxMVeyl57hFbV53WELTs8c";

  const handleUserInput = async () => {
    // Add user input to chat
    let updatedChat = [...chat, { role: "user", parts: [{ text: userInput }] }];
    setLoading(true);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          contents: updatedChat,
        }
      );

      const modelResponse =
        response.data?.candidates[0]?.content?.parts?.[0]?.text || "";
      if (modelResponse) {
        const updateChatWithModel = [
          ...updatedChat,
          { role: "model", parts: [{ text: modelResponse }] },
        ];
        setChat(updateChatWithModel);
        await handleSpeech(modelResponse);
      }

      setUserInput("");
    } catch (error) {
      console.log(error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSpeech = async (text) => {
    if (isSpeaking) {
      stop();
      setIsSpeaking(false);
    } else {
      if (!(await isSpeakingAsync())) {
        speak(text);
        setIsSpeaking(true);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
      >
        {chat.map((message, index) => (
          <View key={index} style={{ paddingHorizontal: 10 }}>
            <View>
              {message.role === "user" ? (
                <View
                  className=" rounded-lg flex w-full"
                  style={{ alignItems: "flex-end" }}
                >
                  <Image
                    source={icons.user}
                    resizeMode="contain"
                    className="w-10 h-10"
                  />
                </View>
              ) : (
                <Image
                  source={icons.chatbot}
                  resizeMode="contain"
                  className="w-10 h-10"
                />
              )}
            </View>
            <View
              style={{
                alignItems: message.role === "user" ? "flex-end" : "flex-start",
                marginVertical: 3,
                marginHorizontal: 12,
              }}
            >
              <View
                className="shadow-lg shadow-orange-400"
                style={{
                  backgroundColor:
                    message.role === "user" ? "#2B8CFF" : "#FFC107",
                  padding: 10,
                  borderTopLeftRadius: message.role === "user" ? 32 : 0,
                  borderTopRightRadius: message.role === "user" ? 0 : 32,
                  borderBottomLeftRadius: 32,
                  borderBottomRightRadius: 32,
                }}
              >
                <Text
                  style={{ color: message.role === "user" ? "#fff" : "#000" }}
                >
                  {message.parts[0].text}
                </Text>
                {message.role === "model" && (
                 <View className="flex items-center flex-row w-full justify-between">
                  <Text></Text>
                   <TouchableOpacity onPress={()=>handleSpeech(message.parts[0].text)} className="flex items-center h-8 w-8 rounded-full bg-white justify-center">
                    <Image
                      source={icons.speaker}
                      resizeMode="contain"
                      className="w-5 h-5"
                    />
                  </TouchableOpacity>
                 </View>
                )}
              </View>
            </View>
          </View>
        ))}
        {loading && (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <ActivityIndicator size="small" color="#FFA001" />
          </View>
        )}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          backgroundColor: "#161622",
        }}
      >
        <TextInput
          className="shadow-sm shadow-orange-400 bg-white"
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "#ccc",
            color: "#000",
            borderRadius: 50,
            padding: 8,
          }}
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Type your message..."
        />
        <TouchableOpacity
          className="shadow-sm shadow-orange-400"
          style={{
            marginLeft: 10,
            backgroundColor: "#fff",
            padding: 12,
            borderRadius: 50,
          }}
          onPress={handleUserInput}
          disabled={!userInput.trim()}
        >
          <Image source={icons.send} resizeMode="contain" className="w-5 h-5" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Chatbot;
