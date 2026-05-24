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
import { useTasks } from "../hooks/useTask.hook";
import AntDesign from "@expo/vector-icons/AntDesign";

export type TaskItems = {
  id: string;
  title: string;
  isCompleted: boolean;
  completedAt?: Date;
  lastupdatedAt?: Date;
};

export default function App() {
  const [value, setValue] = useState("");
  const {
    tasks,
    handleDeleteTask,
    handleOnCompleted,
    handleSubmit,
    isLoading,
  } = useTasks();

  if (isLoading) {
    return (
      <View style={styles.emptyList}>
        <AntDesign name="loading" size={24} color="blue" />
      </View>
    );
  }

  return (
    <FlatList
      style={{ flex: 1 }}
      data={tasks}
      stickyHeaderIndices={[0]}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ShoppingItemLIst
          data={item}
          isCompleted={item.isCompleted}
          onDelete={() => handleDeleteTask(item.id)}
          onCompleted={() => handleOnCompleted(item.id)}
        />
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
            onSubmitEditing={() => {
              handleSubmit(value);
              setValue("");
            }}
          />
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
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
    fontSize: 16,
  },
});
