// 模块B

const moduleB = {
  state: {
    text: 'B state'
  },
  mutations: {
    addText (state, txt) {
      // 这里的 `state`对象是模块的局部状态
      state.text += txt
    }
  },
  actions: {
    setText ({ commit }) {
      commit('addText', 'action')
    }
  },
  getters: {
    getBText (state) {
      return state.text + '!'
    }
  }
}

export default moduleB
