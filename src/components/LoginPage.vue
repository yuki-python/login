<template>
  <div>
    <h2>ログイン画面</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">email:</label>
        <input type="text" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">パスワード:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div>
        <button type="submit" :disabled="isLoading">
          {{ isLoading ? '' : 'ログイン' }}
          <span v-if="isLoading" class="spinner"></span>
        </button>
      </div>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import { signIn } from '../services/authService';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      message: '',
      isLoading: false, // 処理中フラグ
    };
  },
  methods: {
    async handleLogin() {
      this.isLoading = true; // 処理中フラグを有効化
      this.message = '';
      try {
        const user = await signIn(this.email, this.password);
        console.log('Logged in successfully!', user);
        sessionStorage.setItem('user', JSON.stringify(user));
        this.$router.push('/dashboard');
      } catch (error) {
        console.error('Login failed:', error);
        this.message = 'ログインに失敗しました: ' + error.message;
      } finally {
        this.isLoading = false; // 処理中フラグを無効化
      }
    },
  },
};
</script>

<style>
.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-left: 8px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
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
