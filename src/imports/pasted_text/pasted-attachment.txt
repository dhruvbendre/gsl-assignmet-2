# ROLE

You are a Staff-Level Next.js Engineer, Product Architect, UI/UX Designer, Educational Technologist, and TypeScript Expert.

Your task is to build a complete production-ready STEM learning platform from scratch using Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, and Lucide React.

Do not provide partial implementations.

Provide complete source code, architecture, file structure, TypeScript types, routing, and implementation details.

---

# PROJECT NAME

Learning Adventure

---

# PROJECT VISION

A gamified STEM learning platform for children where students:

1. Watch an onboarding video
2. Learn through structured lessons
3. Complete quizzes
4. Earn XP
5. Track progress
6. Fight a final Boss Battle
7. Earn badges
8. View rankings
9. Compare themselves against others

The experience should feel like:

* Duolingo
* Codedex
* Khan Academy Kids
* Brilliant.org
* Scratch

while maintaining a modern STEM aesthetic.

---

# TECH STACK

Use:

* Next.js App Router
* TypeScript
* Tailwind CSS
* shadcn/ui
* Framer Motion
* Lucide React
* localStorage (MVP persistence)
* canvas-confetti

Install:

```bash
npm install framer-motion lucide-react canvas-confetti
```

---

# INITIAL PROJECT AUDIT

Before implementation:

1. Verify TypeScript
2. Verify Tailwind
3. Verify shadcn/ui
4. Verify App Router

If missing:

Provide installation commands and configuration steps.

Determine:

* components path
* ui path
* styles path

If /components/ui does not exist:

Create it and explain why it should exist.

---

# LANDING PAGE

Create an immersive hero section.

Background:

Teal gradient:

```css
#0F766E
#115E59
#134E4A
```

Headline:

Start your Learning Adventure

Subheadline:

Explore, Build, Experiment, and Learn through immersive STEM experiences.

---

# HERO COMPONENT

Use the supplied Container Scroll Animation component.

Place:

```text
/components/ui/container-scroll-animation.tsx
```

Integrate:

* Framer Motion
* Responsive behavior
* Teal redesign

Replace purple styling with teal.

---

# HERO CTA

Centered button:

Get Started

Requirements:

* shadcn Button
* Rounded Full
* Hover animation
* Scale effect
* Framer Motion

---

# LANDING PAGE VISUALS

Use:

* STEM imagery
* Robotics
* Coding
* Arduino
* Science

Replace placeholder image with a real Unsplash image.

---

# DECORATIVE EFFECTS

Add:

* Floating blurred teal orbs
* Glassmorphism accents
* Modern motion effects

---

# GET STARTED FLOW

When Get Started is clicked:

Navigate:

```text
/intro
```

---

# INTRO VIDEO PAGE

Create:

```text
/app/intro/page.tsx
```

Play automatically:

```html
<video
id="myvid"
src="https://firebasestorage.googleapis.com/v0/b/codedex-io.appspot.com/o/videos%2Fvideo%204.mp4?alt=media&token=97302256-baf5-4c1b-a3e1-759fee838c9c"
controls
autoplay
muted
></video>
```

Requirements:

* Fullscreen
* Responsive
* Teal branding
* Framer Motion transitions

---

# SKIP FUNCTIONALITY

Top-right button:

Skip →

Behavior:

```tsx
router.push("/dashboard")
```

Optional:

3-second countdown before enabling Skip.

---

# VIDEO COMPLETION

When video ends:

```tsx
onEnded={() => router.push("/dashboard")}
```

Navigate:

```text
/dashboard
```

---

# COURSE DASHBOARD

Create:

```text
/app/dashboard/page.tsx
```

This is the primary learning experience.

---

# COURSE

Only one course initially:

Arduino Soil Moisture Detector

Description:

An Arduino Soil Moisture Detector measures soil moisture and is commonly used for:

* Smart Irrigation
* Plant Monitoring
* Automatic Watering Systems

---

# CHAPTER STRUCTURE

Create 10 Chapters:

1. Introduction to Arduino
2. Understanding Soil Moisture
3. Components Overview
4. Arduino Basics
5. Circuit Design
6. Wiring Connections
7. Writing the Code
8. Uploading and Testing
9. Smart Irrigation Logic
10. Final Project Review

---

# DASHBOARD LAYOUT

Desktop:

Left:

* Sidebar Chapters

Center:

* Notes / Lesson Viewer

Right:

* Quiz Panel

Top:

* Progress Header

---

# LESSON DESIGN

Each chapter contains:

* Learning Objective
* Beginner Explanation
* STEM Concept
* Fun Fact
* Mini Activity
* Real-world Example

Audience:

Children aged 10–16.

---

# QUIZ SYSTEM

Per chapter:

* MCQ questions
* Instant feedback
* Correct animation
* Wrong explanation

Use Framer Motion.

---

# XP SYSTEM

Each chapter:

+10 XP

Display total XP.

Persist XP.

---

# PROGRESS TRACKING

10 Chapters

Each chapter:

10%

Use shadcn Progress.

Persist:

* progress
* completed chapters
* quiz scores
* active chapter

Use localStorage.

---

# COURSE COMPLETION

After Chapter 10:

Unlock:

Final Boss Fight

Do NOT immediately complete course.

---

# FINAL BOSS FIGHT

Create:

```text
/app/boss-fight/page.tsx
```

Theme:

Mission Control

STEM Challenge

Final Examination

---

# BOSS FIGHT RULES

No notes.

No lesson viewer.

Only questions.

20 Questions.

Difficulty:

* 8 Easy
* 8 Medium
* 4 Hard

Question types:

* MCQ
* Scenario-based
* Code interpretation

Randomize order.

---

# PASSING REQUIREMENTS

Passing Score:

70%

14/20 required.

---

# BOSS FIGHT UI

Show:

* Current question
* Progress bar
* Timer
* Score

Use Framer Motion.

---

# PASS FLOW

If passed:

Show:

Mission Complete!

Display:

* Score
* XP earned
* Completion date
* Badge earned

Rewards:

Boss Fight Pass:
+100 XP

Perfect Score:
+50 Bonus XP

Course Completion:
+25 XP

---

# BADGE SYSTEM

Badge:

Arduino Soil Guardian

Description:

Completed the Arduino Soil Moisture Detector course and Boss Fight.

Store permanently.

---

# BADGE PAGE

Create:

```text
/profile/badges
```

Display:

* Earned badges
* Locked badges
* Dates earned

---

# FAIL FLOW

If failed:

Show:

Mission Failed

Display:

* Score
* Weak topics
* Recommended chapters

Buttons:

Retry Boss Fight

Return To Course

---

# STUDENT PROFILE

Create:

```text
/profile
```

Display:

* Username
* Avatar
* XP
* Rank
* Badges
* Completion Stats

---

# STATISTICS PAGE

Create:

```text
/profile/stats
```

Display:

* Courses Completed
* Total XP
* Quiz Accuracy
* Boss Fights Passed
* Boss Fights Failed
* Average Score
* Strongest Topics
* Weakest Topics

Generate insights from performance history.

---

# LEADERBOARD

Create:

```text
/leaderboard
```

For MVP:

Create mock students.

Show:

* Rank
* Student
* XP
* Courses Completed
* Badges

---

# COMPARISON SYSTEM

Allow comparison between:

Current User

and

Leaderboard Users

Metrics:

* XP
* Accuracy
* Badges
* Courses Completed

Visual comparison cards.

---

# CELEBRATION SYSTEM

Install:

```bash
npm install canvas-confetti
```

When:

* Course completed
* Badge earned
* Boss fight passed

Launch confetti.

---

# TOASTS

Use shadcn Sonner.

Examples:

🏆 New Badge Earned

🚀 +100 XP

🎯 Boss Fight Passed

🔥 Quiz Streak

---

# DATA ARCHITECTURE

Create:

```text
/data
/types
/lib
/hooks
/components
```

All content should come from data files.

Never hardcode lessons inside components.

---

# TYPES

Create:

```ts
Course
Chapter
Quiz
Question
BossFight
Badge
LeaderboardUser
Progress
UserProfile
Statistics
```

Use strict TypeScript.

---

# FILE STRUCTURE

Generate complete scalable file structure.

Prepare architecture for:

* Multiple Courses
* Multiple Boss Fights
* Firebase
* Supabase
* PostgreSQL
* Teacher Dashboard
* Daily Challenges

---

# RESPONSIVENESS

Desktop:
3-column layout

Tablet:
2-column layout

Mobile:
Stacked layout

No horizontal scrolling.

---

# ACCESSIBILITY

Implement:

* Semantic HTML
* ARIA labels
* Keyboard navigation
* Focus states
* WCAG-compliant contrast

---

# DELIVERABLES

Provide:

1. Complete file tree
2. All installation commands
3. All source code
4. Component code
5. Types
6. Data models
7. Routing
8. LocalStorage persistence
9. Boss Fight engine
10. Badge engine
11. Leaderboard engine
12. Statistics engine
13. Responsive design
14. Framer Motion animations
15. Build verification
16. Production readiness checklist

Do not stop after planning.

Generate all required code and implementation details until the application is fully buildable.
