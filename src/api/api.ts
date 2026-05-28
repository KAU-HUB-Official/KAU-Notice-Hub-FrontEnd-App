// src/api/api.ts

const BASE_URL = "http://43.203.208.7";

// health 체크
export async function getHealth() {
  try {
    const response = await fetch(`${BASE_URL}/health`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP 오류: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API 연결 실패:", error);
    throw error;
  }
}

// 공지 목록 가져오기
type NoticeParams = {
  q?: string;
  audience?: string;
  group?: string;
  sourceGroup?: string;
  source?: string;
  category?: string;
  department?: string;
  page?: number;
  pageSize?: number;
};

export async function getNotices(params?: NoticeParams) {
  const query = new URLSearchParams();

  if (params?.q) query.append("q", params.q);
  if (params?.audience) query.append("audience", params.audience);
  if (params?.group) query.append("group", params.group);
  if (params?.sourceGroup) query.append("sourceGroup", params.sourceGroup);
  if (params?.source) query.append("source", params.source);
  if (params?.category) query.append("category", params.category);
  if (params?.department) query.append("department", params.department);

  if (params?.page) {
    query.append("page", params.page.toString());
  }

  if (params?.pageSize) {
    query.append("pageSize", params.pageSize.toString());
  }

  const queryString = query.toString();
  const url = queryString
    ? `${BASE_URL}/api/notices?${queryString}`
    : `${BASE_URL}/api/notices`;

  console.log("공지 목록 요청 URL:", url);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP 오류: ${response.status}`);
  }

  return response.json();
}

// 공지 상세 가져오기
export async function getNoticeDetail(noticeId: string) {
  const url = `${BASE_URL}/api/notices/${encodeURIComponent(noticeId)}`;

  console.log("공지 상세 요청 URL:", url);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP 오류: ${response.status}`);
  }

  return response.json();
}

// 챗봇
type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatRequest = {
  question: string;
  history?: ChatMessage[];
  audienceGroup?: string;
  sourceGroup?: string;
  source?: string;
  category?: string;
  department?: string;
};

export async function sendChat(data: ChatRequest) {
  const response = await fetch(`${BASE_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP 오류: ${response.status}`);
  }

  return response.json();
}