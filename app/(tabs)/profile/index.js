import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const index = () => {
  const [completedTasks, setCompletedTasks] = useState(0)
  const [pendingTasks, setPendingTasks] = useState(0)

  const fetchTasksData = () => {
    try {
      const response = axios.get('http://10.0.2.2:5000/todos/count')
      const {totalCompletedTodos,totalPendingTodos} = response.data;
      
      setCompletedTasks(totalCompletedTodos)
      setPendingTasks(totalPendingTodos)
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
 fetchTasksData();
  },[]);
  console.log("comp", completedTasks);
  console.log("pend", pendingTasks);
  return (
    <View>
      <Text>index</Text>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})