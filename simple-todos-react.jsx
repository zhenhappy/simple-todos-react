// 前后端都会执行的代码块
// 定义一个集合来支撑我们的任务列表
Tasks = new Mongo.Collection("tasks");

if(Meteor.isClient){
  // 仅在前端执行的代码块

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

  Meteor.subscribe("tasks");

  Meteor.startup(function () {
    // 在页面加载完成之后，使用 Meteor.startup 来渲染 React 组件
    React.render(<App />, document.getElementById("render-target"));
  });
}

if(Meteor.isServer){
  // 仅在后端执行的代码块
  Meteor.publish("tasks", function () {
    return Tasks.find({
      $or: [
        { private: {$ne: true} },
        { owner: this.userId }
      ]
    });
  });
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
    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // 如果任务是私有状态，确保只有拥有者可以删除
      throw new Meteor.Error("not-authorized");
    }
    Tasks.remove(taskId);
  },

  setChecked(taskId, setChecked) {
    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // 如果任务是私有的，确保只有任务拥有者可以完成此项任务
      throw new Meteor.Error("not-authorized");
    }
    Tasks.update(taskId, { $set: { checked: setChecked} });
  },

  setPrivate(taskId, setToPrivate) {
    const task = Tasks.findOne(taskId);

    // 确保只有任务所有者可以将任务设置为私有状态
    if (task.owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Tasks.update(taskId, { $set: { private: setToPrivate } });
  }
});
