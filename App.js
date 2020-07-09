import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";

import { Navbar } from "./src/components/Navbar";
import { MainScreen } from "./src/screens/MainScreen";
import { TodoScreen } from "./src/screens/TodoScreen";

export default function App() {
  const [todoId, setTodoId] = useState(null);
  const [todos, setTodos] = useState([
    // { id: "1", title: "to do somesing with it" },
  ]);

  const addTodo = (title) => {
    const newTodo = {
      id: Date.now().toString(),
      title,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const deleteTodo = (id) => {
    const todo = todos.find((t) => t.id === id);
    Alert.alert(
      "Remove todo",
      `Are you sure than you want delete "${todo.title}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          onPress: () => {
            setTodoId(null);
            setTodos((prev) => prev.filter((todo) => todo.id !== id));
          },
        },
      ],
      { cancelable: false }
    );
  };

  const updateTodo = (id, title) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          todo.title = title;
        }
        return todo;
      })
    );
  };

  let content = (
    <MainScreen
      addTodo={addTodo}
      deleteTodo={deleteTodo}
      todos={todos}
      openTodo={setTodoId}
    />
  );

  if (todoId) {
    const selectedTodo = todos.find((todo) => todo.id === todoId);
    content = (
      <TodoScreen
        onRemove={deleteTodo}
        goBack={() => setTodoId(null)}
        todo={selectedTodo}
        onSave={updateTodo}
      />
    );
  }

  return (
    <View>
      <Navbar title="Work on today" />
      <View style={styles.container}>{content}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
});
