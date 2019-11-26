import  login from '../../api/login';
import Cookies from 'js-cookie';

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    uid: undefined,
    auth_type: '',
    token: Cookies.get('access_token'),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    },
    menus:[]
  },
  mutations: {
    SET_AUTH_TYPE: (state, type) => {
      state.auth_type = type;
    },
    SET_CODE: (state, code) => {
      state.code = code;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_UID: (state, uid) => {
      state.uid = uid;
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction;
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting;
    },
    SET_STATUS: (state, status) => {
      state.status = status;
    },
    SET_NAME: (state, name) => {
      state.name = name;
      state.user = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    LOGIN_SUCCESS: () => {
      console.log('login success')
    },
    LOGOUT_USER: state => {
      state.user = '';
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    }
  },
  actions: {
    // 登录
    LoginByUsername({ commit }, param) {
      return new Promise((resolve, reject) => {
        //客户端公钥
        commit('SET_TOKEN', "Basic Y2xpZW50X2lkXzEyMzQ1Njc4OTA6Y2xpZW50X3NlY3JldF8xMjM0NTY3ODkw");
        login.logon(param).then(response => {
          const result = response.data;
          console.log("登陆信息：",JSON.stringify(response.data));
          if (result.code === 0) {
            //登录成功后将token存储在cookie之中,这样下次打开页面或者刷新页面的时候能记住用户的登录状态，不用再去登录页面重新登录了
            let bearerToken = result.data.token_type + " " + result.data.access_token;
            Cookies.set('access_token', bearerToken);
            commit('SET_TOKEN', bearerToken);
            commit('SET_NAME', param.username);
            resolve();
          }else{
            reject(result.message);
          }
        }).catch(error => {
          reject(error);
        });
      });
    },

    GetMenus({ commit }, param){
      return new Promise((resolve, reject) => {
        login.getMenus(param).then(response => {
          const result = response.data.data;
          //console.log("菜单数据：", JSON.stringify(result));
          commit('SET_MENUS', result);
          resolve(result);
        }).catch(error => {
          reject(error);
        });
      });
    },
    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        login.getUserinfo(state.token).then(response => {
          const data = response.data.data;
          commit('SET_ROLES', data.roles);
          commit('SET_NAME', data.name);
          commit('SET_AVATAR', data.avatar);
          commit('SET_UID', data.id);
          commit('SET_INTRODUCTION', data.info);
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 第三方验证登录
    LoginByThirdparty({ commit, state }, code) {
      return new Promise((resolve, reject) => {
        commit('SET_CODE', code);
        loginByThirdparty(state.status, state.email, state.code, state.auth_type).then(response => {
          commit('SET_TOKEN', response.data.token);
          Cookies.set('access_token', response.data.token);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        login.logout(state.token).then(() => {
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          Cookies.remove('access_token');
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        Cookies.remove('access_token');
        alert("has logout");
        resolve();
      });
    },

    // 动态修改权限
    ChangeRole({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_ROLES', [role]);
        commit('SET_TOKEN', role);
        Cookies.set('access_token', role);
        resolve();
      })
    }
  },
  getters:{
    token: state => state.token,
    avatar: state => state.avatar,
    name: state => state.name,
    uid: state => state.uid,
    introduction: state => state.introduction,
    auth_type: state => state.auth_type,
    status: state => state.status,
    roles: state => state.roles,
    setting: state => state.setting,
    menus: state => state.menus
  }
};

export default user;
