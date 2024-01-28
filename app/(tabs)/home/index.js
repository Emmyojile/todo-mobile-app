import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, Ionicons, Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import {
  BottomModal,
  ModalContent,
  ModalTitle,
  SlideAnimation,
} from "react-native-modals";
import axios from "axios";
import moment from "moment";

const index = () => {
  const [todos, setTodos] = useState([]);
  const today = moment().format("MMM Do");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [category, setCategory] = useState("All");
  const [todo, setTodo] = useState("");
  const [pendingTodo, setPendingTodo] = useState([]);
  const [completedTodo, setCompletedTodo] = useState([]);
  const [marked, setMarked] = useState(false);
  const addTodo = async () => {
    try {
      const todoData = {
        title: todo,
        category: category,
      };

      axios
        .post("http://10.0.2.2:5000/todos/65b39eebf52469c6800f0448", todoData)
        .then((response) => {
          console.log("response", response);
        })
        .catch((error) => {
          console.log("error", error);
        });
      setIsModalVisible(false);
      setTodo("");
    } catch (error) {
      console.log("error", error);
    }
  };

  const suggestions = [
    { id: 0, todo: "Buy groceries" },
    { id: 1, todo: "Finish work report" },
    { id: 2, todo: "Go for a run" },
    { id: 3, todo: "Read a book" },
    { id: 4, todo: "Call a friend" },
    { id: 5, todo: "Attend a meeting" },
    { id: 6, todo: "Go For Training" },
  ];
  useEffect(() => {
    getUserTodos();
  }, []);

  const getUserTodos = async () => {
    try {
      const response = await axios.get(
        "http://10.0.2.2:5000/users/65b39eebf52469c6800f0448/todos"
      );
      console.log(response.data.todos);
      setTodos(response.data.todos);

      const fetchedTodos = response.data.todos || [];
      const pendingTodos = fetchedTodos.filter(
        (todo) => todo.status !== "completed"
      );
      const completedTodos = fetchedTodos.filter(
        (todo) => todo.status === "completed"
      );
      setPendingTodo(pendingTodos);
      setCompletedTodo(completedTodos);
    } catch (error) {
      console.log("error", error);
    }
  };
  const markTodoCompleted = async (todoId) => {
    try {
      setMarked(true);
      const response = await axios.patch(
        `http://10.0.2.2:5000/todos/${todoId}/complete`
      );
      console.log(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  console.log("completed", completedTodo);
  console.log("pending", pendingTodo);
  return (
    <>
      <View style={styles.topContainer}>
        <Pressable style={styles.tabs}>
          <Text style={{ color: "white", textAlign: "center" }}>All</Text>
        </Pressable>
        <Pressable style={styles.tabs}>
          <Text style={{ color: "white", textAlign: "center" }}>Work</Text>
        </Pressable>
        <Pressable style={styles.tabs}>
          <Text style={{ color: "white", textAlign: "center" }}>Personal</Text>
        </Pressable>
        <Pressable style={{ marginLeft: "auto" }}>
          <AntDesign
            onPress={() => setIsModalVisible(!isModalVisible)}
            name="pluscircle"
            size={30}
            color="#007fff"
          />
        </Pressable>
      </View>

      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ padding: 10 }}>
          {todos?.length > 0 ? (
            <View>
              {pendingTodo?.length > 0 && <Text>Tasks to Do! {today}</Text>}

              {pendingTodo?.map((item, index) => (
                <Pressable
                  style={{
                    backgroundColor: "#e0e0e0",
                    padding: 10,
                    borderRadius: 7,
                    marginVertical: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Entypo name="circle" size={18} color="black" />
                    <Text style={{ flex: 1 }}>{item?.title}</Text>
                    <Feather name="flag" size={20} color="black" />
                  </View>
                </Pressable>
              ))}

              {completedTodo?.length > 0 && (
                <View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      margin: 10,
                    }}
                  >
                    <Image
                      style={{ width: 100, height: 100 }}
                      source={{
                        uri: "https://cdn-icons-png.flaticon.com/128/6784/6784655.png",
                      }}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                      marginVertical: 10,
                    }}
                  >
                    <Text>Completed Tasks</Text>
                    <MaterialIcons
                      name="arrow-drop-down"
                      size={24}
                      color="black"
                    />
                  </View>

                  {completedTodo?.map((item, index) => (
                    <Pressable
                      style={{
                        backgroundColor: "#e0e0e0",
                        padding: 10,
                        borderRadius: 7,
                        marginVertical: 10,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <Entypo name="circle" size={18} color="black" />
                        <Text
                          style={{
                            flex: 1,
                            textDecorationLine: "line-through",
                            color: "gray",
                          }}
                        >
                          {item?.title}
                        </Text>
                        <Feather name="flag" size={20} color="gray" />
                      </View>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          ) : (
            <View style={styles.addTab}>
              <Image
                style={{ width: 100, height: 100 }}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/2387/2387679.png",
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 15,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                No Tasks for Today! add a task
              </Text>
              <Pressable style={{ marginTop: 15 }}>
                <AntDesign
                  onPress={() => setIsModalVisible(!isModalVisible)}
                  name="pluscircle"
                  size={30}
                  color="#007fff"
                />
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
      <BottomModal
        onBackDropPress={() => setIsModalVisible(!isModalVisible)}
        onHardwareBackPress={() => setIsModalVisible(!isModalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalTitle={<ModalTitle title="Add a Todo" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        visible={isModalVisible}
        onTouchOutside={() => setIsModalVisible(!isModalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 300 }}>
          <View style={styles.inputContainer}>
            <TextInput
              value={todo}
              onChangeText={(text) => setTodo(text)}
              placeholder="Input a new todo"
              style={styles.input}
            />
            <Ionicons onPress={addTodo} name="send" size={24} color="#007FFF" />
          </View>

          <Text>Choose a category</Text>

          <View style={styles.catContainer}>
            <Pressable style={styles.cat} onPress={() => setCategory("Work")}>
              <Text>Work</Text>
            </Pressable>
            <Pressable
              style={styles.cat}
              onPress={() => setCategory("Personal")}
            >
              <Text>Personal</Text>
            </Pressable>
            <Pressable
              style={styles.cat}
              onPress={() => setCategory("Wishlist")}
            >
              <Text>WishList</Text>
            </Pressable>
          </View>

          <Text>Some Suggestions</Text>
          <View style={styles.suggestionContainer}>
            {suggestions?.map((item, index) => (
              <Pressable
                onPress={() => setTodo(item?.todo)}
                key={item.id}
                style={styles.suggestion}
              >
                <Text style={{ textAlign: "center" }}>{item.todo}</Text>
              </Pressable>
            ))}
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default index;

const styles = StyleSheet.create({
  topContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    borderColor: "#7cb9e8",
  },
  tabs: {
    backgroundColor: "#7cb9e8",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  addTab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 130,
    marginLeft: "auto",
    marginRight: "auto",
  },
  inputContainer: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  input: {
    padding: 20,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 5,
    flex: 1,
  },
  catContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
  },
  cat: {
    borderColor: "#E0E0E0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 2,
    borderRadius: 25,
  },
  suggestionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
    marginVertical: 10,
  },
  suggestion: {
    backgroundColor: "#F0F8FF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 25,
  },
});
