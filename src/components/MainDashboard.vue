<template>
  <div v-if="user">
    <h2>ダッシュボード</h2>
    <div class="button-grid">
      <button
        v-for="(button, index) in buttons"
        :key="index"
        @click="handleButtonClick(button.label)"
      >
        {{ button.label }}
      </button>
    </div>
  </div>
  <div v-else>
    <p>ログインが必要です。<a @click="redirectToLogin">ログイン画面へ</a></p>
  </div>
</template>

<script>
export default {
  name: 'MainDashboard',
  data() {
    return {
      user: JSON.parse(sessionStorage.getItem('user')) || null, // セッションからユーザー情報を取得
      buttons: [
        { label: 'レポートを見る' },
        { label: 'ユーザーを編集' },
        { label: 'ダッシュボードを見る' },
        { label: 'プロフィール編集' },
        { label: '設定を管理' },
      ],
    };
  },
  methods: {
    handleButtonClick(label) {
      console.log(`${label} ボタンが押されました！`);
    },
    redirectToLogin() {
      this.$router.push('/'); // ログイン画面へリダイレクト
    },
  },
  mounted() {
    if (!this.user) {
      this.redirectToLogin(); // ユーザーがログインしていなければリダイレクト
    }
  },
};
</script>

<style>
.dashboard {
  text-align: center;
  margin-top: 20px;
}
.button-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 20px;
}
button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
