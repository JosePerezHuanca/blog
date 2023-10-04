import { createStore } from 'vuex'

const store=createStore({
  state:{
    token: localStorage.getItem('token')|| null,
    isAdmin: false,
    post: {},
    posts: [],
    currentPage: 1,
    results: 1,
    totalPages: 0
  },
  mutations:{
    setToken(state, tokenParam){
      state.token=tokenParam,
      localStorage.setItem('token', tokenParam)
    },
    deleteToken(state){
      state.token=null,
      localStorage.removeItem('token')
    },
    setIsAdmin(state, isAdminParam){
      state.isAdmin=isAdminParam;
      localStorage.setItem('isAdmin', isAdminParam);
    },
    setPost(state, postParam){
      state.post=postParam;
    },
    setPosts(state, postsParam){
      state.posts=postsParam;
    },
    addPost(state, postParam){
      state.posts.push(postParam);
    },
    removePost(state, idParam){
      state.posts=state.posts.filter(t=>t.id!== idParam);
    },
    setCurrentPage(state, currentPageParam){
      state.currentPage=currentPageParam;
    },
    setTotalPages(state, totalPagesParam){
      state.totalPages=totalPagesParam;
    }
  },
  actions:{
    async signupAction(_,userData){
      const request=await fetch(`${process.env.VUE_APP_API_URL}/signup`,{
        method: 'POST',
        headers:{
          'content-type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      window.location.href='/';
    },
    async signinAction({commit},userData){
      const request=await fetch(`${process.env.VUE_APP_API_URL}/signin`,{
        method: 'POST',
        headers:{
          'content-type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      const response=await request.json();
      if(request.ok){
        commit('setToken',response.token);
        commit('setIsAdmin', response.isAdmin);
        return window.location.href='/';
      }
      window.location.reload();
    },
    async logoutAction({commit}){
      await commit('deleteToken');
    },
    async getPosts({commit}, queryStringParam){
      const request=await fetch(`${process.env.VUE_APP_API_URL}/posts?page=${queryStringParam.page}&results=${queryStringParam.results}`);
      const response=await request.json();
      commit('setPosts', response.posts);
      commit('setTotalPages',response.totalPages);
    },
    async getPost({commit}, payloadParam){
      const request=await fetch(`${process.env.VUE_APP_API_URL}/posts/${payloadParam.creationDate}/${payloadParam.urlSlug}`);
      const response=await request.json();
      commit('setPost', response);
    },
    async createPost({commit},payloadParam){
      const request=await fetch(`${process.env.VUE_APP_API_URL}/posts`,{
        method: 'POST',
        headers:{
          'authorization': `Bearer ${payloadParam.token}`,
          'content-type': 'application/json'
        },
        body: JSON.stringify(payloadParam.postObj)
      });
      if(request.ok){
        const response=await request;
        commit('addPost', response);
        return window.location.href='/';
      }
      window.reload();
    },
    async updatePost({commit}, payloadParam){
      const request=await fetch(`${process.env.VUE_APP_API_URL}/posts/${payloadParam.id}`,{
        method: 'PUT',
        headers:{
          'content-type': 'application/json',
          'Authorization': `Bearer ${payloadParam.token}`
        },
        body: JSON.stringify(payloadParam.postObj)
      });
      //if(request.ok){
        commit('setPost', payloadParam.postObj);
        //return window.location.href='/';
      //}
      //window.reload;
    },
    async deletePost({commit}, payloadParam){
      const request= await fetch(`${process.env.VUE_APP_API_URL}/posts/${payloadParam.id}`,{
        method: 'DELETE',
        headers:{
          'Authorization': `Bearer ${payloadParam.token}`
        }
      });
      if(request.ok){
        commit('removePost',payloadParam.id);
      }
    }
  },
  getters:{
    getToken: state=>state.token,
    getPosts: state=>state.posts,
    getPost: state=>state.post,
    getCurrentPage: state=>state.currentPage,
    getResults: state=>state.results,
    getTotalPages: state=>state.totalPages
  }
});


export default store;