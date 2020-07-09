import React from "react";
import { StyleSheet, View, FlatList, Image } from "react-native";

import { AddTodo } from "../components/AddTodo";
import { Todo } from "../components/Todo";

export const MainScreen = ({ addTodo, deleteTodo, todos, openTodo }) => {
  let content = (
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Todo todo={item} onRemove={deleteTodo} onOpen={openTodo} />
      )}
    />
  );

  if (todos.length === 0) {
    content = (
      <View style={styles.imgWrapp}>
        <Image
          style={styles.img}
          source={require("../../assets/no-items.png")}
          resizeMode="contain"
        />
        {/*<Image
          style={styles.img}
          source={{
            uri:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
          }}
          resizeMode="contain"
        />*/}
      </View>
    );
  }

  return (
    <View>
      <AddTodo onPress={addTodo} />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  imgWrapp: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    height: 300,
  },
  img: {
    width: "100%",
    height: "100%",
  },
});
