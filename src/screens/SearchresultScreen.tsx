// SearchresultScreen.tsx

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import type { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "SearchresultScreen">;

const results = [
  {
    title: "2026 아시아미래기업포럼 참가 안내",
    date: "2026.05.08",
    tags: ["전체 대상", "행사", "소프트웨어학과"],
  },
  {
    title: "2026 하계 현장실습 모집 안내",
    date: "2026.05.07",
    tags: ["학부 재학생", "학과 취업공지", "AI융합대"],
  },
  {
    title: "2026 비교과 프로그램 신청 안내",
    date: "2026.05.05",
    tags: ["재학생 비교과", "일반", "소프트웨어학과"],
  },
];

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

export default function SearchresultScreen({ navigation }: Props) {
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

        <View style={styles.headerBottom}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← 검색 결과</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.contentArea}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.resultTitle}>검색된 공지</Text>

        {results.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.noticeCard}
            onPress={() => navigation.navigate("NoticeDetailTab")}
          >
            <Text style={styles.noticeTitle}>{item.title}</Text>

            <Text style={styles.noticeDate}>{item.date}</Text>

            <View style={styles.noticeTagRow}>
              <TagChip label={item.tags[0]} />
              <TagChip label={item.tags[1]} type="green" />
              <TagChip label={item.tags[2]} type="blue" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.bottomTab}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate("Homescreen")}
        >
          <Text style={styles.tabIcon}>🏠</Text>
          <Text style={styles.inactiveTabText}>홈</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate("ChatbotScreen")}
        >
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

  headerBottom: {
    alignItems: "flex-start",
  },

  backText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  contentArea: {
    flex: 1,
    backgroundColor: "#F2F4F9",
  },

  contentContainer: {
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 30,
    gap: 12,
  },

  resultTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 8,
  },

  noticeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 14,
    gap: 8,
  },

  noticeTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000000",
  },

  noticeDate: {
    fontSize: 12,
    color: "#9FA0A0",
  },

  noticeTagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
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