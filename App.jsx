// 不要在App前面添加 var
// App component - represents the whole app
App = React.createClass({

  // 这个mixin使得getMeteorData方法可以使用
  mixins: [ReactMeteorData],

  // 从Tasks集合中获取数据并添加到this.data中
  getMeteorData() {
    return {
      tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch()
    }
  },

  renderTasks() {
    // 从this.data中获取数据
    return this.data.tasks.map((task) => {
      return <Task key={task._id} task={task} />;
    });
  },

  // 监听表单的回车事件
  handleSubmit(event) {
    // 取消事件的默认动作
    event.preventDefault();

    // 通过React的ref属性找到输入框的值
    var text = React.findDOMNode(this.refs.textInput).value.trim();
    console.log(text);

    // 插入到数据库
    Tasks.insert({
      text: text,
      createdAt: new Date() // 当前时间
    });

    // 复原表单
    React.findDOMNode(this.refs.textInput).value = "";
  },

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
          <form className="new-task" onSubmit={this.handleSubmit} >
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new tasks" />
          </form>
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
});


