import { Tabs } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import { theme } from "../theme";

export default function RootLayout() {
  return (
    <Tabs screenOptions={{
      headerStyle: {
        backgroundColor: theme.bgColor,
      },
      headerTitleStyle: {
        fontWeight: "700",
      },
      tabBarActiveTintColor: theme.disrutiveColor,
    }}>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Taskly",
          tabBarIcon: ({ color, size }) => <Feather name="list" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="counter"
        options={{
          headerTitle: "Counter",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="clock-circle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="idea"
        options={{
          headerTitle: "Ideas",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="lightbulb" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
1;
