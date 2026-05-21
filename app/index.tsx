import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { theme } from "../theme";
import ShoppingItemLIst from "../components/ShoppingItemLIst";
import { useState } from "react";

type TaskItems = {
  id: string;
  title: string;
  isCompleted: boolean;
};

const taskList: TaskItems[] = [
  { id: "1", title: "Working on Taskly", isCompleted: false },
  { id: "2", title: "Buy groceries", isCompleted: false },
  { id: "3", title: "Walk the dog", isCompleted: true },
  { id: "4", title: "Read a book", isCompleted: true },
  { id: "5", title: "Call mom", isCompleted: false },
  { id: "6", title: "Call mom", isCompleted: false },
  { id: "7", title: "Call mom", isCompleted: false },
  { id: "8", title: "Call mom", isCompleted: false },
  { id: "9", title: "Call mom", isCompleted: false },
  { id: "10", title: "Call mom", isCompleted: false },
  { id: "11", title: "Call mom", isCompleted: false },
  { id: "12", title: "Call mom", isCompleted: false },
  { id: "13", title: "Call mom", isCompleted: false },
  { id: "14", title: "Call mom", isCompleted: false },
  { id: "15", title: "Call mom", isCompleted: false },
  { id: "16", title: "Call mom", isCompleted: false },
  { id: "17", title: "Call mom", isCompleted: false },
];

export default function App() {
  const [tasks, setTasks] = useState<TaskItems[]>([]);
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (value.trim() === "") return;
    const newTask: TaskItems = {
      id: Date.now().toString(),
      title: value,
      isCompleted: false,
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
    setValue("");
  };

  return (
    <FlatList
      data={tasks}
      stickyHeaderIndices={[0]}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ShoppingItemLIst title={item.title} isCompleted={item.isCompleted} />
      )}
      ListEmptyComponent={
        <View style={styles.emptyList}>
          <Text style={styles.emptyText}>Your Task List Is Empty</Text>
        </View>
      }
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <View style={styles.stickyHeader}>
          <TextInput
            placeholder="Add a new task..."
            style={styles.input}
            value={value}
            onChangeText={setValue}
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
          />
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgColor,
  },

  stickyHeader: {
    paddingTop: 2, // space above sticky input
    // backgroundColor: theme.bgColor,
  },

  input: {
    backgroundColor: theme.bgColor,
    borderColor: theme.colorGray,
    borderWidth: 1,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 100,
  },
  emptyList: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
  emptyText: {
    color: theme.colorGray,
    fontWeight: "700",
    fontSize: 16
  },
});
