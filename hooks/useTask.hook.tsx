import { useEffect, useState } from "react";
import { TaskItems } from "../app";
import {
  loadTasksFromLocalStorage,
  saveTasksToLocalStorage,
} from "../utils/storage";
import { LayoutAnimation } from "react-native";
import * as Haptics from "expo-haptics";

const storageKey = "tasks";

export const useTasks = () => {
  const [tasks, setTasks] = useState<TaskItems[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getTasks();
  }, []);

  const sortingTasks = (tasks: TaskItems[]) => {
    return tasks.sort((a, b) => {
      if (a.isCompleted && !b.isCompleted) {
        return 1;
      } else if (!a.isCompleted && b.isCompleted) {
        return -1;
      } else {
        const dateA = a.lastupdatedAt ? new Date(a.lastupdatedAt) : new Date(0);
        const dateB = b.lastupdatedAt ? new Date(b.lastupdatedAt) : new Date(0);
        return dateB.getTime() - dateA.getTime();
      }
    });
  };

  const getTasks = async () => {
    try {
      setIsLoading(true);

      const loadedTasks = await loadTasksFromLocalStorage(storageKey);

      const sortedTasks = sortingTasks(loadedTasks);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setTasks(sortedTasks);
    } catch (error) {
      console.error("Error getting tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (value: string) => {
    if (value.trim() === "") return;

    const newTask: TaskItems = {
      id: Date.now().toString(),
      title: value,
      isCompleted: false,
      completedAt: undefined,
      lastupdatedAt: new Date(),
    };

    const updatedTasks = [newTask, ...tasks];

    await saveTasksToLocalStorage(storageKey, updatedTasks);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTasks(sortingTasks(updatedTasks));
  };

  const handleDeleteTask = async (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);

    await saveTasksToLocalStorage(storageKey, updatedTasks);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTasks(sortingTasks(updatedTasks));
  };

  const handleOnCompleted = async (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? (task.isCompleted
            ? Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success,
              )
            : Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Warning,
              ),
          {
            ...task,
            isCompleted: !task.isCompleted,
            completedAt: !task.isCompleted ? new Date() : undefined,
            lastupdatedAt: new Date(),
          })
        : task,
    );

    await saveTasksToLocalStorage(storageKey, updatedTasks);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTasks(sortingTasks(updatedTasks));
  };

  return {
    tasks,
    handleSubmit,
    handleDeleteTask,
    handleOnCompleted,
    isLoading,
  };
};
