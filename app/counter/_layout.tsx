import React, { Component } from "react";
import { Link, Stack } from "expo-router";
import { theme } from "../../theme";
import { Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default class CounterLayout extends Component {
  render() {
    return (
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Counter",
            headerRight: () => (
              <Link
                href="/counter/history"
                style={{
                  marginRight: 16,
                  fontWeight: "700",
                  color: theme.disrutiveColor,
                }}
                asChild
              >
                <Pressable hitSlop={20}>
                  <MaterialCommunityIcons
                    name="history"
                    size={24}
                    color={theme.disrutiveColor}
                  />
                </Pressable>
              </Link>
            ),
          }}
        />
      </Stack>
    );
  }
}
