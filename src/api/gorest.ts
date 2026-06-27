import { Comment, CommentWithUser, Post, PostWithUser, User } from "../types";

const BASE_URL = "https://gorest.co.in/public/v2";

async function request<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error("Something went wrong while fetching data.");
  }

  return response.json();
}

export async function getUser(userId: number): Promise<User> {
  return request<User>(`/users/${userId}`);
}

export async function getPosts(): Promise<Post[]> {
  return request<Post[]>("/posts");
}

export async function getPostsWithUsers(): Promise<PostWithUser[]> {
  const posts = await getPosts();

  const postsWithUsers = await Promise.all(
    posts.map(async (post) => {
      const user = await getUser(post.user_id);

      return {
        ...post,
        user,
      };
    })
  );

  return postsWithUsers;
}

export async function getPostWithUser(postId: number): Promise<PostWithUser> {
  const post = await request<Post>(`/posts/${postId}`);
  const user = await getUser(post.user_id);

  return {
    ...post,
    user,
  };
}

export async function getComments(postId: number): Promise<CommentWithUser[]> {
  const comments = await request<Comment[]>(`/posts/${postId}/comments`);

  return comments.map((comment) => ({
    ...comment,
    userName: comment.name,
  }));
}