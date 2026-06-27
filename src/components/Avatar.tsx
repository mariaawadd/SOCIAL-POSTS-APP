import { StyleSheet, Text, View } from "react-native";

type AvatarProps = {
  name: string;
  size?: number;
};

export default function Avatar({ name, size = 44 }: AvatarProps) {
  const firstLetter = name.trim().charAt(0).toUpperCase();

  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    >
      <Text style={[styles.letter, { fontSize: size * 0.45 }]}>
        {firstLetter || "?"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
  },
  letter: {
    color: "white",
    fontWeight: "700",
  },
});