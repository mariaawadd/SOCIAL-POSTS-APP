import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { getComments, getPostWithUser } from "../../src/api/gorest";
import CommentCard from "../../src/components/CommentCard";
import PostCard from "../../src/components/PostCard";
import { CommentWithUser, PostWithUser } from "../../src/types";

export default function PostDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [post, setPost] = useState<PostWithUser | null>(null);
  const [comments, setComments] = useState<CommentWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPostDetails() {
      try {
        setLoading(true);

        const postId = Number(id);

        const selectedPost = await getPostWithUser(postId);
        const postComments = await getComments(postId);

        setPost(selectedPost);
        setComments(postComments);
      } catch {
        setError("Failed to load post details. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    loadPostDetails();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading post details...</Text>
      </View>
    );
  }

  if (error || !post) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error || "Post not found."}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </Pressable>

      <Text style={styles.screenTitle}>Post Details</Text>

      <PostCard post={post} />

      <Text style={styles.commentsTitle}>Comments</Text>

      {comments.length === 0 ? (
        <Text style={styles.emptyText}>No comments available.</Text>
      ) : (
        comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  content: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: "#2563eb",
    fontWeight: "700",
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 18,
  },
  commentsTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
    marginTop: 10,
    marginBottom: 14,
  },
  emptyText: {
    fontSize: 15,
    color: "#6b7280",
  },
  center: {
    flex: 1,
    backgroundColor: "#f9fafb",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#374151",
  },
  errorText: {
    fontSize: 16,
    color: "#dc2626",
    textAlign: "center",
  },
});