import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import {
  BottomModal,
  ModalContent,
  ModalTitle,
  SlideAnimation,
} from "react-native-modals";

const index = () => {
  const todos = [];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [todo, setTodo] = useState("");

  const suggestions = [
    { id: 0, todo: "Buy groceries" },
    { id: 1, todo: "Finish work report" },
    { id: 2, todo: "Go for a run" },
    { id: 3, todo: "Read a book" },
    { id: 4, todo: "Call a friend" },
    { id: 5, todo: "Attend a meeting" },
    { id: 6, todo: "Go For Training" },
  ];

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
            <View></View>
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
        swipeDirection={["down", "up"]}
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
        <ModalContent style={{ width: "100%", height: 200 }}>
          <View style={styles.inputContainer}>
            <TextInput
              value={todo}
              onChangeText={(text) => setTodo(text)}
              placeholder="Input a new todo"
              style={styles.input}
            />
            <Ionicons name="send" size={24} color="#007FFF" />
          </View>

          <Text>Choose a category</Text>

          <View style={styles.catContainer}>
            <Pressable style={styles.cat}>
              <Text>Work</Text>
            </Pressable>
            <Pressable style={styles.cat}>
              <Text>Personal</Text>
            </Pressable>
            <Pressable style={styles.cat}>
              <Text>WishList</Text>
            </Pressable>
          </View>

          <Text>Some Suggestions</Text>
          <View style={styles.suggestionContainer}>
            {suggestions?.map((item, index) => (
              <Pressable key={item.id} style={styles.suggestion}>
                <Text style={{textAlign:"center"}}>{item.todo}</Text>
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
  suggestion:{
    backgroundColor: "#F0F8FF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 25,
  }
});
