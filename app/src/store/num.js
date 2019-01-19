export default{
    state: {
        num: 0
    },
    getters: {
        getNum(state){
            return state.num
        }
    },
    mutations: {
        addNum(state, num){
            state.num += num;
        },
        changeNum(state, num){
            state.num = num;
        }
    },
    actions: {
        addNumByAct({commit}, num){
            commit("addNum", num)
        },
        changeNumByAct({commit}, num){
            commit("changeNum", num)
        }
    }
}