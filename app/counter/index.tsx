import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { theme } from "../../theme";
import { registerForPushNotificationsAsync } from "../../utils/push-notification-async";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { Duration, isBefore, intervalToDuration } from "date-fns";

const timestamp = Date.now() + 10 * 1000; // 10 seconds from now

type CountdownTimerProps = {
  isOverdue: boolean;
  distance: Duration;
};

export default function CounterScreen() {
  const [status, setStatus] = useState<CountdownTimerProps>({
    isOverdue: false,
    distance: {},
  });

  const [secondsElapsed, setSecondsElapsed] = useState(0);

  console.log("Current status:", status);
  const handleRequestNotification = async () => {
    const result = await registerForPushNotificationsAsync();
    console.log("Notification permission result:", result);
  };

  const handleScheduleNotification = async () => {
    const result = await registerForPushNotificationsAsync();
    if (result === "granted") {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "I'm a notification from your app! 📨",
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 5,
        },
      });
    } else {
      Alert.alert(
        "Unable to schedule notification",
        "Enable the notifications permission for Expo Go in settings",
      );
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const isOverdue = isBefore(timestamp, new Date());
      const distance = intervalToDuration(
        isOverdue
          ? { start: timestamp, end: new Date() }
          : { start: new Date(), end: timestamp },
      );

      setStatus({ isOverdue, distance });
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.elapsedText}>{secondsElapsed} seconds elapsed</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleRequestNotification}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Request Notifi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleScheduleNotification}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Schedule Notifi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    gap: 20,
  },
  buttonText: {
    fontSize: 24,
    color: theme.buttonColor,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    backgroundColor: theme.disrutiveColor,
    padding: 10,
    borderRadius: 5,
  },
  elapsedText: {
    fontSize: 18,
    color: theme.colorGray,
    textAlign: "center",
  },
});
