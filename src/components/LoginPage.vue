<template>
  <div>
    <h2>ログイン画面</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">ユーザー名:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">パスワード:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">ログイン</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import users from '../dummyData.json'; // ユーザー一覧データをインポート

export default {
  name: 'LoginPage',
  data() {
    return {
      username: "",
      password: "",
      message: "",
    };
  },
  methods: {
    login() {
      const user = users.find((u) => u.id === this.username && u.password === this.password);

      if (user) {
        console.log("ログイン成功！", user);
        sessionStorage.setItem("user", JSON.stringify(user)); // ユーザー情報を保存
        this.$router.push('/dashboard');
      } else {
        this.message = "ユーザー名またはパスワードが間違っています。";
      }
    },
  },
};
</script>

<style>
/* スタイルはそのままで問題なし */
</style>
