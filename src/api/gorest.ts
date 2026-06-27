import { Comment, CommentWithUser, Post, PostWithUser, User } from "../types";

const BASE_URL = "https://gorest.co.in/public/v2";

const DISPLAY_NAMES = [
  "Maya Hassan",
  "Adam Carter",
  "Lina Farouk",
  "Omar Khaled",
  "Nour Saleh",
  "Daniel Reed",
  "Sara Mitchell",
  "Youssef Nabil",
  "Emma Collins",
  "Karim Mansour",
];

const DISPLAY_POSTS = [
  {
    title: "A quiet morning walk before work",
    body: "I started my day with a short walk and a coffee. It honestly made the whole morning feel calmer and more productive.",
  },
  {
    title: "Trying a new café this weekend",
    body: "I found a small café with great reviews, so I’m planning to try it this weekend. I’m hoping the desserts are as good as everyone says.",
  },
  {
    title: "Small habits that actually help",
    body: "Planning the next day before sleeping has been helping me a lot. It makes the morning less stressful and keeps me focused.",
  },
  {
    title: "Working on a new mobile app idea",
    body: "I have been experimenting with a simple social app layout. It is interesting how much difference spacing and clean components can make.",
  },
  {
    title: "A reminder to take breaks",
    body: "Sometimes a short break is exactly what you need to come back with better focus. I’m trying to stop feeling guilty about resting.",
  },
  {
    title: "Weekend plans with friends",
    body: "We are planning a relaxed dinner this weekend. Nothing fancy, just good food, good conversations, and hopefully no last-minute cancellations.",
  },
  {
    title: "Learning something new every day",
    body: "Even small progress counts. Today I learned a new React Native concept, and it made the project feel much easier to understand.",
  },
  {
    title: "Organizing my workspace",
    body: "I finally cleaned my desk and arranged my notes. It sounds simple, but it made studying and coding feel much more comfortable.",
  },
];

const DISPLAY_COMMENTS = [
  {
    name: "Sofia Ahmed",
    body: "I love this. Small routines really can change the whole day.",
  },
  {
    name: "James Wilson",
    body: "This sounds very relatable. I need to try doing this too.",
  },
  {
    name: "Hana Ibrahim",
    body: "The way you explained this is simple and useful.",
  },
  {
    name: "Ryan Brooks",
    body: "Totally agree. Clean design makes apps feel much more professional.",
  },
  {
    name: "Leila Mansour",
    body: "This is such a nice reminder. Rest is productive too.",
  },
];

async function request<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error("Something went wrong while fetching data.");
  }

  return response.json();
}

function pickItem<T>(items: T[], seed: number): T {
  return items[Math.abs(seed) % items.length];
}

function createEmailFromName(name: string) {
  return `${name.toLowerCase().replace(/\s+/g, ".")}@example.com`;
}

function createFallbackUser(userId: number): User {
  const name = pickItem(DISPLAY_NAMES, userId);

  return {
    id: userId,
    name,
    email: createEmailFromName(name),
    gender: "unknown",
    status: "active",
  };
}

function cleanUser(user: User): User {
  const name = pickItem(DISPLAY_NAMES, user.id);

  return {
    ...user,
    name,
    email: createEmailFromName(name),
  };
}

function cleanPost(post: Post): Post {
  const displayPost = pickItem(DISPLAY_POSTS, post.id);

  return {
    ...post,
    title: displayPost.title,
    body: displayPost.body,
  };
}

function createFallbackComments(postId: number): CommentWithUser[] {
  return [0, 1, 2].map((index) => {
    const displayComment = pickItem(DISPLAY_COMMENTS, postId + index);

    return {
      id: postId * 100 + index,
      post_id: postId,
      name: displayComment.name,
      email: createEmailFromName(displayComment.name),
      body: displayComment.body,
      userName: displayComment.name,
    };
  });
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
      let user: User;

      try {
        const apiUser = await getUser(post.user_id);
        user = cleanUser(apiUser);
      } catch {
        user = createFallbackUser(post.user_id);
      }

      return {
        ...cleanPost(post),
        user,
      };
    })
  );

  return postsWithUsers;
}

export async function getPostWithUser(postId: number): Promise<PostWithUser> {
  const post = await request<Post>(`/posts/${postId}`);

  let user: User;

  try {
    const apiUser = await getUser(post.user_id);
    user = cleanUser(apiUser);
  } catch {
    user = createFallbackUser(post.user_id);
  }

  return {
    ...cleanPost(post),
    user,
  };
}

export async function getComments(postId: number): Promise<CommentWithUser[]> {
  try {
    const comments = await request<Comment[]>(`/posts/${postId}/comments`);

    if (comments.length === 0) {
      return createFallbackComments(postId);
    }

    return comments.map((comment, index) => {
      const displayComment = pickItem(DISPLAY_COMMENTS, postId + index);

      return {
        ...comment,
        name: displayComment.name,
        email: createEmailFromName(displayComment.name),
        body: displayComment.body,
        userName: displayComment.name,
      };
    });
  } catch {
    return createFallbackComments(postId);
  }
}