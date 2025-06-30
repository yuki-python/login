import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: process.env.VUE_APP_USER_POOL_ID,
  ClientId: process.env.VUE_APP_CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);

export const signUp = (email, password) => {
  return new Promise((resolve, reject) => {
    const attributeList = [];
    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

export const signIn = (email, password) => {
  return new Promise((resolve, reject) => {
    // 認証情報を生成
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    // リクエストデータをログに出力
    console.log('Authentication Request:', {
      Username: email,
      Password: password,
      PoolData: poolData,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        console.log('Login successful:', result); // 成功時のレスポンス
        resolve(result);
      },
      onFailure: (err) => {
        console.error('Login failed:', err); // 失敗時のエラー
        reject(err);
      },
      // 新しいパスワードが必要な場合（Optional: 必要に応じてカスタマイズ）
      newPasswordRequired: (userAttributes) => {
        console.log('New password required:', userAttributes);
      },
    });
  });
};
