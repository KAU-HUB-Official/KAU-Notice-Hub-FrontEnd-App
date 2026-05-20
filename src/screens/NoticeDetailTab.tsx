// NoticeDetailTab.tsx

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import type { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "NoticeDetailTab">;

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

export default function NoticeDetailTab({ navigation }: Props) {
  const openOriginalLink = () => {
    Linking.openURL("https://e.asiae.co.kr/afef2026/#program");
  };

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
            <Text style={styles.backText}>← 공지 상세</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.contentArea} showsVerticalScrollIndicator={false}>
        <View style={styles.noticeSection}>
          <View style={styles.noticeTagRow}>
            <View style={styles.tagGroup}>
              <TagChip label="전체 대상" />
              <TagChip label="행사" type="green" />
              <TagChip label="소프트웨어학과" type="blue" />
            </View>

            <Text style={styles.dateText}>2026.05.08.</Text>
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.noticeTitle}>
              2026 아시아미래기업포럼(부제 : 스페이스 노믹스) 참가 안내(무료)
            </Text>
          </View>

          <View style={styles.noticeContent}>
            <View style={styles.summaryBox}>
              <Text style={styles.sectionLabel}>요약</Text>
              <Text style={styles.contentText}>
                우리 대학 학생 및 교직원 누구나 참석하실 수 있는 무료 행사입니다.
                많은 신청 바랍니다.
                {"\n\n"}
                더 자세한 프로그램 내용 확인 :
                {"\n"}
                https://e.asiae.co.kr/afef2026/#program
              </Text>
            </View>

            <View style={styles.bodyBox}>
              <Text style={styles.sectionLabel}>본문</Text>
              <Text style={styles.contentText}>
                우리 대학 학생 및 교직원 누구나 참석하실 수 있는 무료 행사입니다.
                많은 신청 바랍니다.
                {"\n\n"}
                더 자세한 프로그램 내용 확인 :
                {"\n"}
                https://e.asiae.co.kr/afef2026/#program
                {"\n\n"}
                참가 신청 :
                {"\n"}
                https://docs.google.com/forms/u/1/d/e/1FAIpQLSc-ZLaJwvC5anepvmA7suZK3hBFgtNhdksJzjd7_twoIKC5XA/viewform
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.linkButton} onPress={openOriginalLink}>
            <Text style={styles.linkButtonText}>원문 보러가기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.bottomTab}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate("Homescreen")}
        >
          <Text style={styles.tabIcon}>⌂</Text>
          <Text style={styles.inactiveTabText}>홈</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate("ChatbotScreen")}
        >
          <Text style={styles.tabIcon}>🗨</Text>
          <Text style={styles.activeTabText}>챗봇</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },

  header: {
    backgroundColor: "#002870",
    paddingTop: 36,
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 10,
  },

  headerTop: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
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
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  noticeSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 24,
    gap: 20,
  },

  noticeTagRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  tagGroup: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    flex: 1,
  },

  dateText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#9FA0A0",
    marginLeft: 10,
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

  titleContainer: {
    width: "100%",
  },

  noticeTitle: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "500",
    color: "#000000",
  },

  noticeContent: {
    gap: 10,
  },

  summaryBox: {
    borderWidth: 1,
    borderColor: "#9FA0A0",
    borderRadius: 10,
    padding: 10,
    gap: 10,
  },

  bodyBox: {
    borderWidth: 1,
    borderColor: "#595757",
    borderRadius: 10,
    padding: 10,
    gap: 10,
  },

  sectionLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: "#000000",
  },

  contentText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#000000",
  },

  linkButton: {
    width: 100,
    height: 33,
    borderWidth: 1,
    borderColor: "#004098",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  linkButtonText: {
    fontSize: 11,
    color: "#004098",
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