import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const register = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();
  return (
    <SafeAreaView style={styles.loginContianer}>
      <View style={{ marginTop: 80 }}>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "#0066b2" }}>
          TODO_LIST TRACKER
        </Text>
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 20 }}>
            Login in to your Account
          </Text>
        </View>
        <View style={{ marginTop: 70 }}>
          <View style={styles.inputContainer}>
            <MaterialIcons name="email" size={24} color="black" />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: email ? 17 : 17,
              }}
              placeholder="enter your email"
            />
          </View>
          <View style={styles.inputContainer}>
            <AntDesign name="lock1" size={24} color="gray" />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: email ? 17 : 17,
              }}
              placeholder="enter your password"
            />
          </View>

          <View style={{ marginTop: 60 }} />

          <Pressable style={styles.loginBtnContainer}>
            <Text style={styles.loginBtn}>Register</Text>
          </Pressable>

          <Pressable
            onPress={() => router.replace("/login")}
            style={{ marginTop: 15 }}
          >
            <Text style={{ textAlign: "center", fontSize: 15, color: "gray" }}>
              Already have an account? Sign in
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default register;

const styles = StyleSheet.create({
  loginContianer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#E0E0E0",
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 30,
    paddingLeft: 10,
  },
  loginBtnContainer: {
    width: 200,
    backgroundColor: "#6699CC",
    padding: 15,
    borderRadius: 6,
    marginLeft: "auto",
    marginRight: "auto",
  },
  loginBtn: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
