export const changeCollapsed = (prevState= {
  isCollapsed:false // 定义初始状态
}, action) => {
  const { type } = action;
  switch(type){
    case "change_collapsed":
      let newState = {...prevState};
      newState.isCollapsed = !newState.isCollapsed;
      return newState;
    default:
      return prevState;
  }
}