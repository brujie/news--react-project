export const changeLoading = (prevState= {
  isLoading:false // 定义初始状态
}, action) => {
  const { type, payload } = action;
  // console.log(payload) //使用自定义传参
  switch(type){
    case "change_loading":
      let newState = {...prevState};
      newState.isLoading = payload
      return newState;
    default:
      return prevState;
  }
}