import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../theme";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = {
  title: string;
  isCompleted? : boolean;
};

const ShoppingItemLIst = ({ title, isCompleted }: Props) => {
   const handleOnPress = () => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel", 
        onPress: ()=> console.log("cancelled")
      },
      { text: "Delete", style: "destructive",
        onPress: ()=> console.log("deleted")
       },
    ]);
  };
  return (
    <View style={[styles.itemsContainer, isCompleted && styles.completedItemContainer]}>
      <Text style={[styles.itemText, isCompleted && styles.completedItemText]}>{title}</Text>
      <TouchableOpacity
        onPress={isCompleted ? undefined : handleOnPress}
        activeOpacity={0.8}
      >
        <MaterialIcons name="delete" size={24} color={isCompleted ? theme.colorGray : theme.disrutiveColor} />
      </TouchableOpacity>
  </View>
  )
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
  },
  completedItemContainer: {
    backgroundColor: theme.colorLightGray,
    borderBottomColor: theme.colorLightGray,
  },
  itemText: {
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
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  bottonTex: {
    color: theme.buttonColor,
     fontSize: 14,
     fontWeight: "700",
  },
  completedButton: {
    backgroundColor: theme.colorGray,
  },
});