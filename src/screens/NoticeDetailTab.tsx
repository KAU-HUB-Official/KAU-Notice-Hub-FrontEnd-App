// NoticeDetailTab.tsx

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Markdown from "react-native-markdown-display";
import type { RootStackParamList } from "../../App";
import { getNoticeDetail } from "../api/api";

type Props = NativeStackScreenProps<RootStackParamList, "NoticeDetailTab">;

type NoticeDetail = {
  id: string;
  title: string;
  content?: string;
  summary?: string;
  url?: string;
  source?: string;
  sources?: string[];
  audienceGroup?: string;
  sourceGroup?: string;
  sourceGroups?: string[];
  category?: string;
  department?: string;
  date?: string;
  tags?: string[];
  attachments?: {
    name: string;
    url: string;
  }[];
};

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

const cleanMarkdown = (text?: string) => {
  if (!text) return "";

  return text
    .replace(/!\[(.*?)\]\((\S+)\s+"[^"]*"\)/g, "![$1]($2)")
    .replace(/^(\s*)[•●○ㅇ]\s*/gm, "$1- ")
    .replace(/^(\s*)\*\s*/gm, "$1- ")
    .replace(/([^\n])\n[-*]/g, "$1\n\n-")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

export default function NoticeDetailTab({ navigation, route }: Props) {
  const { noticeId } = route.params as { noticeId?: string };

  const [notice, setNotice] = useState<NoticeDetail | null>(null);
  const [loading, setLoading] = useState(false);

  const loadNoticeDetail = async () => {
    if (!noticeId) {
      console.error("noticeId가 없습니다.");
      return;
    }

    try {
      setLoading(true);

      const data = await getNoticeDetail(noticeId);

      console.log("공지 상세:", data);

      setNotice(data);
    } catch (error) {
      console.error("공지 상세 불러오기 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNoticeDetail();
  }, [noticeId]);

  const openOriginalLink = () => {
    if (notice?.url) {
      Linking.openURL(notice.url);
    }
  };

  const firstTag = notice?.audienceGroup || notice?.tags?.[0] || "전체 대상";
  const secondTag = notice?.category || notice?.tags?.[1] || "일반";
  const thirdTag = notice?.department || notice?.tags?.[2] || "공통";

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

      <ScrollView
        style={styles.contentArea}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#002870"
            style={{ marginTop: 40 }}
          />
        ) : !notice ? (
          <Text style={styles.emptyText}>공지 상세를 불러올 수 없습니다.</Text>
        ) : (
          <View style={styles.noticeSection}>
            <View style={styles.noticeTagRow}>
              <View style={styles.tagGroup}>
                <TagChip label={firstTag} />
                <TagChip label={secondTag} type="green" />
                <TagChip label={thirdTag} type="blue" />
              </View>

              <Text style={styles.dateText}>{notice.date || ""}</Text>
            </View>

            <View style={styles.titleContainer}>
              <Text style={styles.noticeTitle}>{notice.title}</Text>
            </View>

            <View style={styles.noticeContent}>
              <View style={styles.summaryBox}>
                <Text style={styles.sectionLabel}>요약</Text>

                <Markdown style={markdownStyles}>
                  {cleanMarkdown(notice.summary) || "요약 정보가 없습니다."}
                </Markdown>
              </View>

              <View style={styles.bodyBox}>
                <Text style={styles.sectionLabel}>본문</Text>

                <Markdown style={markdownStyles}>
                  {cleanMarkdown(notice.content) || "본문 정보가 없습니다."}
                </Markdown>
              </View>
            </View>

            {notice.url ? (
              <TouchableOpacity
                style={styles.linkButton}
                onPress={openOriginalLink}
              >
                <Text style={styles.linkButtonText}>원문 보러가기</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        )}
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

const markdownStyles = {
  body: {
    fontSize: 15,
    lineHeight: 24,
    color: "#000000",
  },

  heading1: {
    fontSize: 24,
    fontWeight: "700" as const,
    marginBottom: 12,
    color: "#000000",
  },

  heading2: {
    fontSize: 20,
    fontWeight: "700" as const,
    marginBottom: 10,
    color: "#000000",
  },

  heading3: {
    fontSize: 18,
    fontWeight: "700" as const,
    marginBottom: 8,
    color: "#000000",
  },

  paragraph: {
    marginBottom: 10,
  },

  strong: {
    fontWeight: "700" as const,
  },

  bullet_list: {
    marginBottom: 10,
    paddingLeft: 8,
  },

  ordered_list: {
    marginBottom: 10,
    paddingLeft: 8,
  },

  list_item: {
    marginBottom: 6,
  },

  bullet_list_icon: {
    color: "#000000",
    fontSize: 14,
  },

  bullet_list_content: {
    flex: 1,
  },

  image: {
    width: 260,
    height: 360,
    resizeMode: "contain" as const,
  },
};

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

  emptyText: {
    fontSize: 14,
    color: "#9FA0A0",
    textAlign: "center",
    marginTop: 40,
  },
});