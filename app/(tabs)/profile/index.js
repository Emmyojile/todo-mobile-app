import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart } from "react-native-chart-kit";

const index = () => {
  const [completedTasks, setCompletedTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);

  const fetchTasksData = async () => {
    try {
      const response = await axios.get("http://10.0.2.2:5000/todos/count");
      const { totalCompletedTodos, totalPendingTodos } = response.data;

      setCompletedTasks(totalCompletedTodos);
      setPendingTasks(totalPendingTodos);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchTasksData();
  }, []);
  console.log("comp", completedTasks);
  console.log("pend", pendingTasks);
  return (
    <View style={{ padding: 10, flex: 1, backgroundColor: "white" }}>
      <View style={{flexDirection:"row", alignItems:"center",gap:10}}>
        <Image
          style={{ width: 60, height: 60, borderRadius: 30 }}
          source={{
            uri: "https://lh3.googleusercontent.com/ogw/ANLem4Zmk7fohWyH7kB6YArqFy0WMfXnFtuX3PX3LSBf=s64-c-mo",
          }}
        />
        <View>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            Kepp Plans for 15 Days
          </Text>
          <Text style={{ fontSize: 15, color: "gray", marginTop: 4 }}>
            Select Categories
          </Text>
        </View>
      </View>

      <View style={{marginVertical:12}}>
        <Text>Tasks Overview</Text>
        <View style={{ flexDirection: "row", alignItems: "center",marginVertical:10, gap:6 }}>
          <View style={{ padding: 10, backgroundColor: "#89cff0" ,padding: 10,borderRadius:8,flex:1,justifyContent:"center",alignItems:"center" }}>
          <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}>
            {completedTasks} 
          </Text>
          <Text style={{marginTop:4}}>
            Completed tasks
          </Text>
          </View>

          <View style={{ padding: 10, backgroundColor: "#89cff0" ,padding: 10,borderRadius:8,flex:1,justifyContent:"center",alignItems:"center" }}>
          <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}>
            {pendingTasks} 
          </Text>
          <Text style={{marginTop:4}}>
            pending tasks
          </Text>
          </View>
        </View>

        <LineChart
        data={{
          labels: ["Pending Tasks", "Completed Tasks"],
          datasets: [
            {
              data: [pendingTasks, completedTasks],
            },
          ],
        }}
        width={Dimensions.get("window").width - 20} // from react-native
        height={220}
        // yAxisLabel="$"
        // yAxisSuffix="k"
        yAxisInterval={2} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          borderRadius: 16,
        }}
      />
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
