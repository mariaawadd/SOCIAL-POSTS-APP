import { StyleSheet, Text, View } from "react-native";

import { CommentWithUser } from "../types";
import Avatar from "./Avatar";

type CommentCardProps = {
  comment: CommentWithUser;
};

export default function CommentCard({ comment }: CommentCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Avatar name={comment.userName} size={38} />

        <View style={styles.userInfo}>
          <Text style={styles.userName}>{comment.userName}</Text>
          <Text style={styles.userEmail}>{comment.email}</Text>
        </View>
      </View>

      <Text style={styles.body}>{comment.body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  userInfo: {
    marginLeft: 10,
    flex: 1,
  },
  userName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  userEmail: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
  body: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
  },
});