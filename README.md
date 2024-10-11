## Sajit Khadka Blog

This repo is a implementation of Sajit Khadka's Blog.

### Tech stack

- Next.js
- Tailwind
- Shadncn
- PostgreSQL

### Database Schema

- **Blog Posts Table**:
  - `id` :
  - `title` :
  - `description` :
  - `created_at` :
  - `updated_at` :
  - `author_id` :
- **Tags Table**:
  - `id` :
  - `name` :
- **BlogPostTags Table**:
  - `blog_post_id` :
  - `tag_id` :
- **Comments Table**:
  - `id` :
  - `blog_post_id` :
  - `user_id` :
  - `content` :
  - `created_at` :
  - `parent_comment_id` :
  - `upvotes` :
  - `downvotes` :
- **Users Table**:
  - `id` :
  - `username` :
  - `email` :
  - `password_hash` :
  - `role` :
