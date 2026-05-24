import AsyncStorage from "@react-native-async-storage/async-storage";
import { TaskItems } from "../app";

export const saveTasksToLocalStorage = async (key: string, tasks: TaskItems[]) => {
  try {
    const serializedTasks = JSON.stringify(tasks);
    await AsyncStorage.setItem(key, serializedTasks);
  } catch (error) {
    console.error("Error saving tasks to localStorage:", error);
  }
}

export const loadTasksFromLocalStorage = async (key: string): Promise<TaskItems[]> => {
  try {
    const serializedTasks = await AsyncStorage.getItem(key);
    if (serializedTasks === null) {
      return [];
    }
    return JSON.parse(serializedTasks);
  } catch (error) {
    console.error("Error loading tasks from localStorage:", error);
    return [];
  }
}