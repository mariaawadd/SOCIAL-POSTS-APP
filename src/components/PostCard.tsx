import { Pressable, StyleSheet, Text, View } from "react-native";

import { PostWithUser } from "../types";
import Avatar from "./Avatar";

type PostCardProps = {
  post: PostWithUser;
  onPress?: () => void;
};

export default function PostCard({ post, onPress }: PostCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Avatar name={post.user.name} />

        <View style={styles.userInfo}>
          <Text style={styles.userName}>{post.user.name}</Text>
          <Text style={styles.userEmail}>{post.user.email}</Text>
        </View>
      </View>

      <Text style={styles.title}>{post.title}</Text>

      <Text style={styles.body} numberOfLines={3}>
        {post.body}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  userInfo: {
    marginLeft: 12,
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  userEmail: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 2,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  body: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 21,
  },
});