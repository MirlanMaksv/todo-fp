import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, message } from 'antd';

import TodoList from 'components/TodoList';
import TodoForm from 'components/TodoForm';
import RoutineSelectForm from 'components/RoutineSelectForm';
import { AddButton, NewButton } from 'components/Buttons';
import Header from '../Header';

export default class Content extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    deleteTodo: PropTypes.func.isRequired,
  };

  state = { todoFormHidden: true, routineFormHidden: true };

  onTodoFormShow = () => {
    this.setState({ todoFormHidden: false, routineFormHidden: true });
  };

  onTodoFormHide = () => {
    this.setState({ todoFormHidden: true });
  };

  onRoutineFormShow = () => {
    this.setState({ routineFormHidden: false, todoFormHidden: true });
  };

  onRoutineFormHide = () => {
    this.setState({ routineFormHidden: true });
  };

  onEditClick = todo => {
    this.setState({ todo, todoFormHidden: false });
  };

  onRemoveClick = id => {
    this.props.deleteTodo(id);
    message.success('Successfully deleted');
  };

  renderActions = () => {
    return (
      <Button.Group>
        <AddButton onClick={this.onRoutineFormShow}>Add Routine</AddButton>
        <NewButton onClick={this.onTodoFormShow}>New Todo</NewButton>
      </Button.Group>
    );
  };

  getFormProps = () => {
    const props = { onHide: this.onTodoFormHide };
    let { todo } = this.state;
    if (todo) {
      props.key = todo.id;
      props.todo = todo;
    }
    return props;
  };

  render() {
    const { todos, title } = this.props;
    const { todoFormHidden, routineFormHidden } = this.state;
    const formProps = this.getFormProps();

    const headerActions = this.renderActions();

    return (
      <div className='content'>
        <Header title={title} actions={headerActions} />

        {!todoFormHidden && <TodoForm {...formProps} />}

        {!routineFormHidden && (
          <RoutineSelectForm onHide={this.onRoutineFormHide} />
        )}

        <TodoList
          todos={todos}
          onEditClick={this.onEditClick}
          onRemoveClick={this.onRemoveClick}
        />
      </div>
    );
  }
}
