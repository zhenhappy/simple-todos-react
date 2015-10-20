if(Meteor.isClient){
  //仅在前端执行的代码块
  Meteor.startup(function () {
    // 在页面加载完成之后，使用 Meteor.startup 来渲染 React 组件
    React.render(<App />, document.getElementById("render-target"));
  });
}else if(Meteor.isServer){
  //仅在后端执行的代码块
}else{
  //前后端都会执行的代码块
  console.log("Hello,Meteor!");
}