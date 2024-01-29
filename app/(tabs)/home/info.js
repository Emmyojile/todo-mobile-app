import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  AntDesign,
  Ionicons,
  Feather,
  Entypo,
  SimpleLineIcons,
} from "@expo/vector-icons";

const info = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Ionicons
          onPress={() => router.replace("/home")}
          name="arrow-back"
          size={24}
          color="black"
        />
        <Entypo name="dots-three-vertical" size={24} color="black" />
      </View>

      <View style={{ marginTop: 5 }}>
        <Text style={{ fontSize: 15, fontWeight: "600" }}>
          Category - {params?.category}
        </Text>
      </View>

      <Text style={{ marginTop: 20, fontSize: 17, fontWeight: "600" }}>
        {" "}
        {params?.title}
      </Text>

      <View style={{ marginTop: 50 }} />

      <Pressable style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <AntDesign name="plus" size={24} color="#7cb9e8" />
        <Text style={{ color: "#7cb9e8", fontSize: 16, fontWeight: "500" }}>
          Add a Subtask
        </Text>
      </Pressable>

      <View style={{ marginTop: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <AntDesign name="calendar" size={24} color="gray" />
            <Text>Due Date</Text>
          </View>

          <Pressable
            style={{ backgroundColor: "#f0f0f0", padding: 7, borderRadius: 6 }}
          >
            <Text>{params?.dueDate}</Text>
          </Pressable>
        </View>
      </View>

      <View style={{ marginTop: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <Ionicons name="time-sharp" size={24} color="gray" />
            <Text>Time and Reminder</Text>
          </View>

          <Pressable
            style={{ backgroundColor: "#f0f0f0", padding: 7, borderRadius: 6 }}
          >
            <Text>No</Text>
          </Pressable>
        </View>
      </View>

      <View style={{ marginTop: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <Feather name="repeat" size={24} color="gray" />
            <Text>Repeat Task</Text>
          </View>

          <Pressable
            style={{ backgroundColor: "#f0f0f0", padding: 7, borderRadius: 6 }}
          >
            <Text>No</Text>
          </Pressable>
        </View>
      </View>

      <View style={{ marginTop: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <SimpleLineIcons name="note" size={24} color="gray" />
            <Text>Notes</Text>
          </View>

          <Pressable
            style={{ backgroundColor: "#f0f0f0", padding: 7, borderRadius: 6 }}
          >
            <Text>Not Added</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default info;

const styles = StyleSheet.create({});
