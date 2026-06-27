import { Pressable, StyleSheet, Text, View } from "react-native";

import { PostWithUser } from "../types";
import Avatar from "./Avatar";

type PostCardProps = {
  post: PostWithUser;
  onPress?: () => void;
};

function createUsername(name: string) {
  const username = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.|\.$/g, "");

  return `@${username || "user"}`;
}

export default function PostCard({ post, onPress }: PostCardProps) {
  const username = createUsername(post.user.name);

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
    >
      <View style={styles.header}>
        <Avatar name={post.user.name} size={48} />

        <View style={styles.userInfo}>
          <Text style={styles.userName}>{post.user.name}</Text>
          <Text style={styles.username}>{username}</Text>
        </View>
      </View>

      <Text style={styles.title}>{post.title}</Text>

      <Text style={styles.body} numberOfLines={3}>
        {post.body}
      </Text>

      {onPress && (
        <View style={styles.footer}>
          <Text style={styles.footerText}>View discussion</Text>
          <Text style={styles.footerArrow}>→</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 22,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 2,
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  userInfo: {
    marginLeft: 12,
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
  },
  username: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8,
    lineHeight: 24,
  },
  body: {
    fontSize: 15,
    color: "#4b5563",
    lineHeight: 22,
  },
  footer: {
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2563eb",
  },
  footerArrow: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2563eb",
  },
});