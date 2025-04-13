<template>
  <v-app class="app-background">
    <div class="comment-wrapper">
      <v-container>
        <!-- 댓글 개수 표시 -->
        <div class="comment-count">댓글 {{ comments.length }}</div>

        <!-- 댓글 목록 -->
        <v-card v-for="comment in comments" :key="comment.id" class="mb-2">
          <div class="comment-container">
            <v-avatar size="40" class="mr-3">
              <v-img :src="comment.user.profileImage" alt="프로필 이미지" aspect-ratio="1" />
            </v-avatar>
            <div class="comment-info-container">
              <div class="comment-name">{{ comment.user.name }}</div>
              <div class="comment-content">{{ comment.content }}</div>
              <div class="comment-date">{{ formatDate(comment.createdAt) }}</div>
            </div>

            <!-- FAB Speed Dial -->
            <v-fab
              icon
              location="top right"
              :absolute="false"
              size="small"
              class="comment-fab"
            >
              <v-icon>{{ comment.openDial ? 'mdi-close' : 'mdi-dots-vertical' }}</v-icon>

              <v-speed-dial
                v-model="comment.openDial"
                location="left center"
                transition="slide-y-transition"
                activator="parent"
              >
                <v-btn icon color="primary" @click="editComment(comment)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon color="error" @click="deleteComment(comment)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
                <v-btn icon color="info">
                  <v-icon>mdi-information</v-icon>
                </v-btn>
                <v-btn icon color="success">
                  <v-icon>mdi-thumb-up</v-icon>
                </v-btn>
              </v-speed-dial>
            </v-fab>
          </div>
        </v-card>
        <hr class="comment-divider" />

        <!-- 댓글 입력 영역 -->
        <v-card>
          <div class="comment-input-container">
            <v-avatar size="40" class="mr-3">
              <v-img :src="currentUser.profileImage" alt="프로필 이미지" aspect-ratio="1" />
            </v-avatar>

            <div class="comment-input-wrapper">
              <div class="textarea-header">{{ currentUser.name }}</div>
              <textarea
                class="native-textarea"
                placeholder="내용을 입력해주세요."
              ></textarea>
            </div>
          </div>

          <v-card-actions>
            <v-btn class="custom-submit-button">등록</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </div>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";

interface Comment {
  id: number;
  user: {
    id: string;
    name: string;
    profileImage: string;
  };
  content: string;
  createdAt: string;
  showMenu: boolean;
  openDial: boolean;
}

export default defineComponent({
  name: "CommentComponent",
  setup() {
    const comments = ref<Comment[]>([
      {
        id: 1,
        user: {
          id: "user1",
          name: "연정",
          profileImage: "https://picsum.photos/id/1027/40/40",
        },
        content: "기타치고 노래하는 싱어송라이터 연정입니다~",
        createdAt: "2025-03-06T15:20:00",
        showMenu: false,
        openDial: false,
      },
      {
        id: 2,
        user: {
          id: "user2",
          name: "한로로",
          profileImage: "https://picsum.photos/id/1028/40/40",
        },
        content: "사용하고 있는 게임 닉네임은 '체리겉두'이다. 닉네임의 의미는 그냥 '체리공주'이기 때문",
        createdAt: "2025-03-06T15:20:00",
        showMenu: false,
        openDial: false,
      },
      {
        id: 3,
        user: {
          id: "user3",
          name: "해린",
          profileImage: "https://picsum.photos/id/1029/40/40",
        },
        content: "돈카스요~",
        createdAt: "2025-03-06T15:20:00",
        showMenu: false,
        openDial: false,
      },
    ]);

    const currentUser = ref({
      id: "user1",
      name: "연정",
      profileImage: "https://picsum.photos/id/1027/40/40",
    });

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${year}.${month}.${day} ${hours}:${minutes}`;
    };

    const toggleMenu = (targetComment: Comment) => {
      comments.value.forEach((comment) => {
        comment.openDial = comment.id === targetComment.id ? !comment.openDial : false;
      });
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const clickedInsideMenu = target.closest(".comment-menu") || target.closest(".comment-fab");
      if (!clickedInsideMenu) {
        comments.value.forEach((comment) => {
          comment.openDial = false;
        });
      }
    };

    onMounted(() => {
      document.addEventListener("click", handleClickOutside);
    });

    onBeforeUnmount(() => {
      document.removeEventListener("click", handleClickOutside);
    });

    const editComment = (comment: Comment) => {
      console.log("수정 기능 실행", comment);
      comment.openDial = false;
    };

    const deleteComment = (comment: Comment) => {
      console.log("삭제 기능 실행", comment);
      comment.openDial = false;
    };

    return {
      comments,
      currentUser,
      formatDate,
      toggleMenu,
      editComment,
      deleteComment,
    };
  },
});
</script>

<style scoped>
.app-background {
  background-color: #001f4d;
  min-height: 100vh;
  padding: 32px 0;
}

.comment-wrapper {
  background-color: white;
  max-width: 1000px;
  margin: 0 auto;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.comment-count {
  font-size: 1rem;
  font-weight: 600;
  color: #666;
  margin-bottom: 1rem;
}

.v-card {
  background-color: #fff !important;
  border: none !important;
  border-radius: 8px;
  box-shadow: none;
}

.comment-container {
  display: flex;
  align-items: flex-start;
  padding: 30px 30px 0 30px; /* top, right, bottom, left */
  position: relative;
  border-top: 1px solid #ddd;
}

.comment-info-container {
  flex: 1;
  padding-bottom: 8px;
  border-bottom: none !important;
  margin-right: 60px; /* FAB 공간 확보 */
}

.comment-name {
  font-weight: 700;
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 4px;
}

.comment-content {
  font-size: 0.95rem;
  color: #222;
  margin-bottom: 6px;
}

.comment-date {
  font-size: 0.8rem;
  color: #888;
  margin-top: 16px;
  margin-bottom: 0;
}

.comment-fab {
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  z-index: 10;
  box-shadow: none;
}

.comment-divider {
  border: none;
  border-top: 2px solid #929191;
  margin: 16px 0;
}

.comment-input-container {
  display: flex;
  align-items: flex-start;
  padding: 16px;
  padding-bottom: 0;
  width: 100%;
}

.comment-input-wrapper {
  flex: 1;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white;
  padding: 12px 16px;
}

.textarea-header {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 8px;
  color: #222;
}

.native-textarea {
  width: 100%;
  min-height: 80px;
  border: none;
  outline: none;
  resize: none;
  font-size: 1rem;
  color: #222;
  background-color: transparent;
  padding: 0;
  margin: 0;
  line-height: 1.5;
  font-family: inherit;
}

.v-card-actions {
  justify-content: flex-end;
  padding: 16px;
  padding-top: 12px;
}

.custom-submit-button {
  background-color: #0066ff !important;
  color: white !important;
  font-weight: bold;
  font-size: 0.9rem;
  border-radius: 8px;
  padding: 6px 16px;
  text-transform: none;
  box-shadow: none;
  min-width: 80px;
  border: none;
}

.custom-submit-button:hover {
  background-color: #0052cc !important;
}
</style>
