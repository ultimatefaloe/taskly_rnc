import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "../theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TaskItems } from "../app";
import Feather from "@expo/vector-icons/Feather";

type Props = {
  data: TaskItems;
  onDelete: () => void;
  onCompleted?: () => void;
  isCompleted?: boolean;
};

const ShoppingItemLIst = ({
  data,
  onDelete,
  isCompleted,
  onCompleted,
}: Props) => {
  const handleOnPress = () => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      {
        text: "Cancel",
        style: "cancel",
        onPress: () => console.log("cancelled"),
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => onDelete(),
      },
    ]);
  };
  return (
    <Pressable
      style={[
        styles.itemsContainer,
        isCompleted && styles.completedItemContainer,
      ]}
      onPress={onCompleted}
    >
      <View style={styles.row}>
        <Feather
          name={isCompleted ? "check-circle" : "circle"}
          size={24}
          color="black"
        />
        <View style={styles.itemContainer}>
          <Text
            numberOfLines={1}
            style={[styles.itemText, isCompleted && styles.completedItemText]}
          >
            {data.title}
          </Text>
          <Text
            style={[
              styles.bottonText,
              isCompleted && styles.completedButtonText,
            ]}
          >
            {isCompleted && data.completedAt != undefined
              ? `Completed at ${new Date(
                  data.completedAt,
                ).toLocaleDateString()}`
              : "Mark as Completed"}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={isCompleted ? undefined : handleOnPress}
        activeOpacity={0.8}
        // style={styles.row}
      >
        <MaterialIcons
          name="delete"
          size={24}
          color={isCompleted ? theme.colorGray : theme.disrutiveColor}
        />
      </TouchableOpacity>
    </Pressable>
  );
};

export default ShoppingItemLIst;

const styles = StyleSheet.create({
  itemsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 16,
    backgroundColor: theme.bgColor,
    borderColor: theme.colorGray,
    borderBottomWidth: 1,
    paddingRight: 28,
  },
  itemContainer: {
    flex: 1,
    justifyContent: "center",
  },
  completedItemContainer: {
    backgroundColor: theme.colorLightGray,
    borderBottomColor: theme.colorLightGray,
  },
  itemText: {
    flex: 1,
    color: theme.colorGray,
    fontSize: 16,
    fontWeight: "700",
  },
  completedItemText: {
    textDecorationLine: "line-through",
    color: theme.colorGray,
  },
  button: {
    backgroundColor: theme.buttonbgColor,
    color: theme.colorLightGray,
    // paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  bottonText: {
    // color: theme.disrutiveColor,
    fontSize: 8,
    fontWeight: "light",
  },
  completedButtonText: {
    color: theme.colorblue,
  },
  completedButton: {
    backgroundColor: theme.colorGray,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
