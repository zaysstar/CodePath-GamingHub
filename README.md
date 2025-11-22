# GamingHub (HobbyHub Final Project)

**GamingHub** is a React web application designed as a community forum for video game enthusiasts. Users can create "quests" (posts) to share strategies, ask questions, or post reviews. The app features a robust "XP" (upvote) system, real-time commenting, and category filtering, all powered by a Firebase backend.

## Time Spent

Total time spent: **15** hours

## Features

The following **required** functionality is completed:

- [x] **Web app includes a create form that allows the user to create posts**
  - [x] Form requires users to add a post title
  - [x] Forms include the option for users to add textual content and an external image URL
- [x] **Web app includes a home feed displaying previously created posts**
  - [x] By default, each post shows the creation time, title, and upvotes count
- [x] **Clicking on a post directs the user to a new page for the selected post**
- [x] **Users can sort posts by either creation time or upvotes count**
- [x] **Users can search for posts by title**
- [x] **The app includes a separate post page for each created post**
  - [x] Displays content, image, and comments
- [x] **Users can leave comments underneath a post on the post page**
- [x] **Each post includes an upvote button**
  - [x] Each click increases the post's upvotes count by one
- [x] **A post that a user previously created can be edited or deleted**
  - [x] After creating a post, users can go back and edit it
  - [x] A previously created post can be deleted from its post page

The following **stretch** features are implemented:

- [x] **Pseudo-Authentication / Secret Key:**
  - Users set a "Secret Key" when creating a post. This key is required to Edit or Delete that specific post later.
- [x] **Flags / Categories:**
  - Users can tag posts as "Guide," "Opinion," "Question," or "Fluff."
  - Users can filter the home feed by these flags.
- [x] **Video Support:**
  - If a user pastes a YouTube URL into the image field, the app automatically renders an embedded video player.
- [x] **Loading States:**
  - A custom loading spinner animation is displayed while data is being fetched.
- [x] **Interface Customization:**
  - The UI is styled with a distinct "Dark Mode / Neon" gaming aesthetic.

## Video Walkthrough

Here's a walkthrough of implemented user stories:

![](YOUR_GIF_URL_HERE)

## Notes

One challenge encountered was handling the "Secret Key" logic without full user authentication. I solved this by storing the key directly on the post document in Firebase and checking the user's input against that stored string before allowing Update/Delete operations.

## License

Copyright [2025] [Izayah Rahming]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.