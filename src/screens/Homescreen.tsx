// HomeScreen.tsx

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
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
import { getNotices } from "../api/api";

type Props = NativeStackScreenProps<RootStackParamList, "Homescreen">;

const targetTags = [
  "전체 대상",
  "전 구성원 공통",
  "학부 재학생",
  "신입생, 저학년",
  "재학생 비교과, 글로벌 프로그램",
  "취업, 창업 준비생",
  "대학원생",
  "평생, 전문교육원",
  "그 외",
];

const categoryTags = [
  "전체 중분류",
  "일반",
  "학사",
  "장학/대출",
  "입찰",
  "행사",
  "공과대",
  "AI융합대",
  "항공경영대",
  "그 외 학부",
  "새내기성공센터",
  "드림칼리지디자인",
  "국제교류",
  "첨단분야 부트캠프",
  "산학협력",
  "교수학습센터",
  "대학일자리플러스센터",
  "학과 취업공지",
  "생활관",
  "인권센터",
  "학술정보관",
  "LMS",
  "입학처",
  "박물관",
];

const majorTags = [
  "전체 학과",
  "소프트웨어학과",
  "항공우주공학과",
  "항공전자정보공학부",
  "신소재공학과",
  "스마트드론공학과",
];

type TagType = "default" | "green" | "blue";

type TagChipProps = {
  label: string;
  type?: TagType;
  selected?: boolean;
  onPress?: () => void;
};

type NoticeItem = {
  id: string;
  title: string;
  date?: string;
  audienceGroup?: string;
  category?: string;
  department?: string;
  tags?: string[];
};

function TagChip({
  label,
  type = "default",
  selected = false,
  onPress,
}: TagChipProps) {
  return (
    <TouchableOpacity
      style={[
        styles.tagChip,
        type === "green" && styles.greenChip,
        type === "blue" && styles.blueChip,
        selected && styles.selectedChip,
      ]}
      onPress={onPress}
    >
      <Text style={styles.tagText}>{label}</Text>
    </TouchableOpacity>
  );
}

function NoticeCard({
  item,
  onPress,
}: {
  item: NoticeItem;
  onPress: () => void;
}) {
  const firstTag = item.audienceGroup || item.tags?.[0] || "전체 대상";
  const secondTag = item.category || item.tags?.[1] || "일반";
  const thirdTag = item.department || item.tags?.[2] || "공통";

  return (
    <TouchableOpacity style={styles.noticeCard} onPress={onPress}>
      <Text style={styles.noticeTitle}>{item.title}</Text>

      <Text style={styles.noticeDate}>{item.date || ""}</Text>

      <View style={styles.noticeTagRow}>
        <TagChip label={firstTag} />
        <TagChip label={secondTag} type="green" />
        <TagChip label={thirdTag} type="blue" />
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen({ navigation }: Props) {
  const [searchText, setSearchText] = useState("");

  const [selectedTarget, setSelectedTarget] =
    useState("전체 대상");

  const [selectedCategory, setSelectedCategory] =
    useState("전체 중분류");

  const [selectedMajor, setSelectedMajor] =
    useState("전체 학과");

  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(false);

  const loadNotices = async () => {
    try {
      setLoading(true);

      const data = await getNotices({
        audience:
          selectedTarget === "전체 대상"
            ? undefined
            : selectedTarget,

        category:
          selectedCategory === "전체 중분류"
            ? undefined
            : selectedCategory,

        department:
          selectedMajor === "전체 학과"
            ? undefined
            : selectedMajor,

        page: 1,
        pageSize: 10,
      });

      console.log("공지 목록:", data);

      setNotices(data.items || []);
    } catch (error) {
      console.error("공지 목록 불러오기 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotices();
  }, [selectedTarget, selectedCategory, selectedMajor]);

  const handleSearch = () => {
    const trimmed = searchText.trim();

    if (!trimmed) return;

    navigation.navigate("SearchresultScreen", {
      q: trimmed,
    } as never);
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

        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>⌕</Text>

          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="공지 제목, 태그 검색 ..."
            placeholderTextColor="#9FA0A0"
            style={styles.searchInput}
            autoCapitalize="none"
            autoCorrect={false}
            multiline={false}
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />
        </View>
      </View>

      <ScrollView
        style={styles.contentArea}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>공지 탐색</Text>

          <Text style={styles.filterLabel}>전체 분류</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tagScroll}
          >
            {targetTags.map((tag) => (
              <TagChip
                key={tag}
                label={tag}
                selected={selectedTarget === tag}
                onPress={() =>
                  setSelectedTarget((prev) =>
                    prev === tag ? "전체 대상" : tag
                  )
                }
              />
            ))}
          </ScrollView>

          <Text style={styles.filterLabel}>중분류</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tagScroll}
          >
            {categoryTags.map((tag) => (
              <TagChip
                key={tag}
                label={tag}
                type="green"
                selected={selectedCategory === tag}
                onPress={() =>
                  setSelectedCategory((prev) =>
                    prev === tag
                      ? "전체 중분류"
                      : tag
                  )
                }
              />
            ))}
          </ScrollView>

          <Text style={styles.filterLabel}>학과/전공</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tagScroll}
          >
            {majorTags.map((tag) => (
              <TagChip
                key={tag}
                label={tag}
                type="blue"
                selected={selectedMajor === tag}
                onPress={() =>
                  setSelectedMajor((prev) =>
                    prev === tag
                      ? "전체 학과"
                      : tag
                  )
                }
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.noticeSection}>
          <View style={styles.selectedBox}>
            <Text style={styles.selectedText}>
              선택된 분류
            </Text>

            <Text style={styles.selectedValue}>
              {selectedTarget} / {selectedCategory} /{" "}
              {selectedMajor}
            </Text>
          </View>

          <Text style={styles.noticeSectionTitle}>
            공지 목록
          </Text>

          {loading ? (
            <ActivityIndicator
              size="large"
              color="#002870"
            />
          ) : notices.length === 0 ? (
            <Text style={styles.emptyText}>
              표시할 공지가 없습니다.
            </Text>
          ) : (
            notices.map((item) => (
              <NoticeCard
                key={item.id}
                item={item}
                onPress={() =>
                  navigation.navigate(
                    "NoticeDetailTab",
                    {
                      noticeId: item.id,
                    } as never
                  )
                }
              />
            ))
          )}
        </View>
      </ScrollView>

      <View style={styles.bottomTab}>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>⌂</Text>
          <Text style={styles.activeTabText}>홈</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() =>
            navigation.navigate("ChatbotScreen")
          }
        >
          <Text style={styles.tabIcon}>🗨</Text>
          <Text style={styles.inactiveTabText}>
            챗봇
          </Text>
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
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  noticeText: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "600",
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
  },

  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 18,
  },

  contentArea: {
    flex: 1,
    backgroundColor: "#F2F4F9",
  },

  contentContainer: {
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 30,
  },

  section: {
    marginBottom: 32,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    color: "#000000",
  },

  filterLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#595757",
    marginBottom: 8,
  },

  tagScroll: {
    marginBottom: 14,
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
    marginRight: 8,
  },

  greenChip: {
    backgroundColor: "rgba(61,157,96,0.2)",
    borderColor: "#3D9D60",
  },

  blueChip: {
    backgroundColor: "rgba(0,64,152,0.2)",
    borderColor: "#004098",
  },

  selectedChip: {
    backgroundColor: "#DDE7FF",
  },

  tagText: {
    fontSize: 11,
    color: "#000000",
  },

  noticeSection: {
    gap: 12,
  },

  selectedBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 12,
  },

  selectedText: {
    fontSize: 12,
    color: "#595757",
    marginBottom: 4,
  },

  selectedValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000000",
  },

  noticeSectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000000",
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
    marginTop: 20,
  },
});