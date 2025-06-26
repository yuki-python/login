<template>
  <div class="dashboard">
    <h2>ダッシュボード</h2>
    <div class="button-grid">
      <!-- 固定された5つのボタン -->
      <button
        v-for="(button, index) in buttons"
        :key="index"
        :disabled="!userPermissions.includes(button.permission)"
        @click="handleButtonClick(button.label)"
      >
        {{ button.label }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainDashboard',
  data() {
    return {
      user: JSON.parse(sessionStorage.getItem("user")), // ログイン時のユーザー情報を取得
      buttons: [
        { label: 'レポートを見る', permission: 'view_reports' },
        { label: 'ユーザーを編集', permission: 'edit_users' },
        { label: 'ダッシュボードを見る', permission: 'view_dashboard' },
        { label: 'プロフィール編集', permission: 'edit_profile' },
        { label: '設定を管理', permission: 'manage_settings' },
      ]
    };
  },
  computed: {
    userPermissions() {
      // ユーザーの権限リストを返す
      return this.user.permissions;
    },
  },
  methods: {
    handleButtonClick(label) {
      alert(`${label} ボタンが押されました！`); // ボタンが押された時の動作
    },
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
button:disabled {
  background-color: #d6d6d6;
  cursor: not-allowed;
}
button:hover:not(:disabled) {
  background-color: #0056b3;
}
</style>
