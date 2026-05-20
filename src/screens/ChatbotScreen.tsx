// ChatbotScreen.tsx

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import type { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "ChatbotScreen">;

type Message = {
  id: number;
  text: string;
  sender: "bot" | "user";
};

export default function ChatbotScreen({ navigation }: Props) {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      text:
        "공지 데이터 기반으로 답변합니다.\n일정/제출 요건처럼 중요한 내용은 원문 공지 링크를 함께 확인하세요.",
    },
  ]);

  const handleSend = () => {
    const trimmed = inputText.trim();

    if (!trimmed) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        text: trimmed,
      },
    ]);

    setInputText("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.titleRow}>
              <Text style={styles.noticeText}>NOTICE</Text>
              <Image
                source={require("../../assets/images/kau_logo_white_transparent.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
          </View>

          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>⌕</Text>
            <TextInput
              placeholder="공지 제목, 태그 검색 ..."
              placeholderTextColor="#9FA0A0"
              style={styles.searchInput}
              onSubmitEditing={() => navigation.navigate("SearchresultScreen")}
            />
          </View>
        </View>

        <ScrollView
          style={styles.contentArea}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageRow,
                message.sender === "user" && styles.userMessageRow,
              ]}
            >
              <View
                style={[
                  styles.chatBox,
                  message.sender === "user" && styles.userChatBox,
                ]}
              >
                <Text
                  style={[
                    styles.chatText,
                    message.sender === "user" && styles.userChatText,
                  ]}
                >
                  {message.text}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.chatInputArea}>
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="메시지를 입력하세요"
            placeholderTextColor="#9FA0A0"
            style={styles.chatInput}
            multiline
          />

          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>전송</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomTab}>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => navigation.navigate("Homescreen")}
          >
            <Text style={styles.tabIcon}>⌂</Text>
            <Text style={styles.inactiveTabText}>홈</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabItem}>
            <Text style={styles.tabIcon}>🗨</Text>
            <Text style={styles.activeTabText}>챗봇</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  keyboardView: {
    flex: 1,
  },

  header: {
    backgroundColor: "#002870",
    paddingTop: 36,
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 10,
  },

  headerTop: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  noticeText: {
    fontSize: 23,
    fontWeight: "600",
    color: "#FFFFFF",
    marginRight: 8,
  },

  logo: {
    width: 80,
    height: 40,
  },

  searchBar: {
    height: 48,
    backgroundColor: "rgba(159,160,160,0.5)",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  searchIcon: {
    fontSize: 16,
    marginRight: 10,
    color: "#9FA0A0",
  },

  searchInput: {
    flex: 1,
    fontSize: 18,
    color: "#FFFFFF",
  },

  contentArea: {
    flex: 1,
    backgroundColor: "#F2F4F9",
  },

  contentContainer: {
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 12,
  },

  messageRow: {
    width: "100%",
    alignItems: "flex-start",
  },

  userMessageRow: {
    alignItems: "flex-end",
  },

  chatBox: {
    maxWidth: "78%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  userChatBox: {
    backgroundColor: "#002870",
  },

  chatText: {
    fontSize: 12,
    lineHeight: 17,
    color: "#000000",
  },

  userChatText: {
    color: "#FFFFFF",
  },

  chatInputArea: {
    minHeight: 58,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },

  chatInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 90,
    backgroundColor: "#F2F4F9",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 14,
    color: "#000000",
  },

  sendButton: {
    height: 40,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "#002870",
    justifyContent: "center",
    alignItems: "center",
  },

  sendButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  bottomTab: {
    height: 76,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  tabItem: {
    justifyContent: "center",
    alignItems: "center",
  },

  tabIcon: {
    fontSize: 22,
    marginBottom: 4,
  },

  inactiveTabText: {
    fontSize: 11,
    color: "#9FA0A0",
    fontWeight: "700",
  },

  activeTabText: {
    fontSize: 11,
    color: "#595757",
    fontWeight: "700",
  },
});