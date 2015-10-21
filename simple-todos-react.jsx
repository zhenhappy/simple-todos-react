// 前后端都会执行的代码块
// 定义一个集合来支撑我们的任务列表
Tasks = new Mongo.Collection("tasks");

if(Meteor.isClient){
  // 仅在前端执行的代码块

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

  Meteor.startup(function () {
    // 在页面加载完成之后，使用 Meteor.startup 来渲染 React 组件
    React.render(<App />, document.getElementById("render-target"));
  });
}

if(Meteor.isServer){
  // 仅在后端执行的代码块
}

Meteor.methods({
  addTask(text) {
    // 在插入之前确保用户已经登陆
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Tasks.insert({
      text: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },

  removeTask(taskId) {
    Tasks.remove(taskId);
  },

  setChecked(taskId, setChecked) {
    Tasks.update(taskId, { $set: { checked: setChecked} });
  }
});
