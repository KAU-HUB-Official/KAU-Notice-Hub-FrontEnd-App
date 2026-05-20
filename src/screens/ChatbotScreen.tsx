// ChatbotScreen.tsx

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
  Image,
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

type TagChipProps = {
  label: string;
  type?: "default" | "green" | "blue";
};

function TagChip({ label, type = "default" }: TagChipProps) {
  return (
    <View
      style={[
        styles.tagChip,
        type === "green" && styles.greenChip,
        type === "blue" && styles.blueChip,
      ]}
    >
      <Text style={styles.tagText}>{label}</Text>
    </View>
  );
}

export default function ChatbotScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
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
          <Text style={styles.searchIcon}>🔍</Text>
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
        <View style={styles.chatContainer}>
          <View style={styles.chatBox}>
            <Text style={styles.chatText}>
              공지 데이터 기반으로 답변합니다.
              {"\n"}
              일정/제출 요건처럼 중요한 내용은 원문 공지 링크를 함께 확인하세요.
            </Text>
          </View>
        </View>

        <View style={styles.tagRow}>
          <TagChip label="장학" />
          <TagChip label="행사" type="green" />
          <TagChip label="소프트웨어학과" type="blue" />
        </View>
      </ScrollView>

      <View style={styles.bottomTab}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate("Homescreen")}
        >
          <Text style={styles.tabIcon}>🏠</Text>
          <Text style={styles.inactiveTabText}>홈</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>💬</Text>
          <Text style={styles.activeTabText}>챗봇</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
    gap: 15,
  },

  chatContainer: {
    width: "100%",
    alignItems: "flex-start",
  },

  chatBox: {
    width: 280,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
  },

  chatText: {
    fontSize: 10,
    lineHeight: 14,
    color: "#000000",
  },

  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  tagChip: {
    height: 27,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  greenChip: {
    backgroundColor: "rgba(61,157,96,0.2)",
    borderColor: "#3D9D60",
  },

  blueChip: {
    backgroundColor: "rgba(0,64,152,0.2)",
    borderColor: "#004098",
  },

  tagText: {
    fontSize: 11,
    color: "#000000",
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
  },

  activeTabText: {
    fontSize: 11,
    color: "#595757",
  },
});