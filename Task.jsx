// Task 组件 - 表示单个的待做事宜
Task = React.createClass({
  propTypes: {
    // 这个组件从React的prop中接受task并显示
    // 我们使用propTypes来表示这个属性是必须的
    task: React.PropTypes.object.isRequired
  },
  render() {
    return (
      <li>{this.props.task.text}</li>
    );
  }
});
