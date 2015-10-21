// Task 组件 - 表示单个的待做事宜
Task = React.createClass({
  propTypes: {
    // 这个组件从React的prop中接受task并显示
    // 我们使用propTypes来表示这个属性是必须的
    task: React.PropTypes.object.isRequired,
    showPrivateButton: React.PropTypes.bool.isRequired
  },

  toggleChecked() {
    // 当按下按钮时，设定确认值为当前的相反值
    Meteor.call("setChecked", this.props.task._id, ! this.props.task.checked);
  },

  deleteThisTask() {
    // 当按下删除按钮时, 删除指定的任务
    Meteor.call("removeTask", this.props.task._id);
  },

  togglePrivate() {
    Meteor.call("setPrivate", this.props.task._id, ! this.props.task.private);
  },

  render() {
    // 添加下面一行的内容
    // 当任务被完成的时候给它们一个不同的class
    // 这样，通过CSS中的设置后，它们会看起来更好一些。
    // 当我们需要的时候可以给“确认框”添加”私有“样式
    const taskClassName = (this.props.task.checked ? "checked" : "") + " " +
          (this.props.task.private ? "private" : "");

    return (
      <li className={taskClassName}>
        <button className="delete" onClick={this.deleteThisTask}>
          &times;
        </button>

        <input
          type="checkbox"
          readOnly={true}
          checked={this.props.task.checked}
          onClick={this.toggleChecked} />

        { this.props.showPrivateButton ? (
          <button className="toggle-private" onClick={this.togglePrivate}>
            { this.props.task.private ? "Private" : "Public" }
          </button>
        ) : ''}

        <span className="text">
          <strong>{this.props.task.username}</strong> : {this.props.task.text}
        </span>
      </li>
    );
  }
});
