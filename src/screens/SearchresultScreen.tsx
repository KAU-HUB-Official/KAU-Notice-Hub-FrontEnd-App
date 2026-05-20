// SearchresultScreen.tsx

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
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

type Props = NativeStackScreenProps<
  RootStackParamList,
  "SearchresultScreen"
>;

const results = [
  {
    title:
      "2026학년도 국가우수장학금(이공계) 재학중우수자(2년지원) 유형 신규장학생 신청 안내",
    date: "2026.05.08",
    tags: ["학부 재학생", "항공경영대", "항공교통물류"],
  },
  {
    title: "2026년 서울독립유공자후손장학금 선발 안내",
    date: "2026.05.08",
    tags: ["전체 공통", "장학/대출", "공식 홈페이지"],
  },
  {
    title: "2026년 화성시인재육성재단 「꿈드림 장학금」안내",
    date: "2026.05.06",
    tags: ["전체 공통", "장학/대출", "공식 홈페이지"],
  },
  {
    title: "KICS 한국통신학회 장학금 지원 대상자 선발 지원자 모집 안내",
    date: "2026.04.27",
    tags: ["전체 공통", "장학/대출", "공식 홈페이지"],
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
  const [searchText, setSearchText] = useState("장학금");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <Image
            source={require("../../assets/images/kau_logo_white_transparent.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.noticeText}>notice</Text>
        </View>

        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>⌕</Text>

          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="공지 제목, 태그 검색 ..."
            placeholderTextColor="#C4C4C4"
            style={styles.searchInput}
          />
        </View>
      </View>

      <ScrollView
        style={styles.contentArea}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.resultTitle}>공지 목록</Text>

        {results.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.noticeCard}
            activeOpacity={0.8}
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
          <Text style={styles.tabIcon}>⌂</Text>
          <Text style={styles.tabText}>홈</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate("ChatbotScreen")}
        >
          <Text style={styles.tabIcon}>🗨</Text>
          <Text style={styles.tabText}>챗봇</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4F9",
  },

  header: {
    height: 125,
    backgroundColor: "#0B2D78",
    paddingTop: 30,
    paddingHorizontal: 14,
    paddingBottom: 15,
  },

  logoRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  logo: {
    width: 74,
    height: 28,
    marginRight: 6,
  },

  noticeText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  searchBar: {
    height: 38,
    borderRadius: 8,
    backgroundColor: "rgba(159,160,160,0.55)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },

  searchIcon: {
    fontSize: 22,
    color: "#C4C4C4",
    marginRight: 6,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#FFFFFF",
    paddingVertical: 0,
  },

  contentArea: {
    flex: 1,
    backgroundColor: "#F2F4F9",
  },

  contentContainer: {
  paddingHorizontal: 12,
  paddingTop: 14,
  paddingBottom: 18,
  gap: 12,
},

  resultTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 12,
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
    height: 58,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  tabItem: {
    justifyContent: "center",
    alignItems: "center",
  },

  tabIcon: {
    fontSize: 24,
    color: "#9FA0A0",
    marginBottom: 2,
  },

  tabText: {
    fontSize: 10,
    color: "#9FA0A0",
  },
});