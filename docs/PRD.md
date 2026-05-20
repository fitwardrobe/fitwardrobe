# Product Requirements Document (PRD)

## Wardrobe AI v2.2 — Stable Production Specification

**Document Version**: 2.2  
**Status**: Stable Production (v2.2)  
**Target Launch**: LIVE (Feb 2026)

---

## 1. Executive Summary

**Wardrobe AI** is a cross-platform application (PWA + Native Android, future iOS) hosted at **fitwardrobe.me**. It serves as an AI-powered personal stylist, helping users build a digital wardrobe through natural conversation, understand what suits them with explainable reasoning, and generate occasion-specific outfits from their existing clothes using a **Hybrid AI Architecture** (Gemini 2.5 Flash Lite for Vision, Groq/Llama 3.1 8B for Conversation & Reasoning).

### Core Value Proposition

- **Chat-First Interface**: Natural conversation with an AI stylist
- **Unified AI Router**: Intelligent routing between Gemini (Vision) and Groq (Chat/Outfits)
- **Secure AI Proxy**: Supabase Edge Function with JWT verification and rate limiting
- **Local-First Privacy**: All data stays on user's device
- **Cross-Platform**: Vercel Web App for universal access, native Android APK for mobile
- **Vercel & PostHog Analytics**: Real-time privacy-preserving traffic monitoring
- **Hybrid Routing**: BrowserRouter (Web) / HashRouter (Native) for seamless navigation
- **Transparent AI**: Every recommendation includes reasoning
- **User Control**: No silent writes; all actions require confirmation

---

## 2. Product Principles (Non-Negotiable)

| Principle           | Description                                  |
| ------------------- | -------------------------------------------- |
| ✅ User Control     | User controls all data and decisions         |
| ✅ Transparency     | AI reasoning is always visible               |
| ✅ Editability      | Full editing of wardrobe and preferences     |
| ✅ Privacy-First    | Local storage, export/import for portability |
| ✅ No Silent Writes | AI never acts without explicit confirmation  |

---

## 3. Platform-Specific UI Strategy

### 3.1 Mobile UI (PWA + Native Android)

- Full-screen chat layout (ChatGPT/Claude-style)
- Bottom-fixed input bar with text, voice, image upload, camera
- Bottom drawer navigation for Wardrobe, Outfits, Profile, Suggestions

**Design Inspiration**: ChatGPT mobile, Claude mobile, WhatsApp

### 3.1.1 Platform-Specific Features

| Feature      | PWA                       | Android APK              |
| ------------ | ------------------------- | ------------------------ |
| Camera       | File input + getUserMedia | Native Camera API        |
| Storage      | IndexedDB                 | Filesystem + Preferences |
| Offline      | Service Worker            | Built-in                 |
| Installation | Add to Home Screen        | Direct APK               |
| Performance  | Good                      | Excellent                |
| Updates      | Automatic                 | Manual download          |

### 3.2 Desktop UI (Dashboard)

- Multi-panel layout (3-column recommended)
- Left: Wardrobe grid with filters
- Center: Chat interface
- Right: Outfit preview/details

**Design Inspiration**: Notion, Figma, VSCode

### 3.3 Responsive Breakpoints

| Screen Size    | Layout Mode            | Primary Interaction    |
| -------------- | ---------------------- | ---------------------- |
| < 768px        | Single column (Mobile) | Chat-first, drawer nav |
| 768px - 1024px | 2-column (Tablet)      | Chat + sidebar         |
| > 1024px       | 3-column (Desktop)     | Multi-panel dashboard  |

---

## 4. AI Architecture (Hybrid Engine)

### 4.1 Role-Based Intelligence (Gemini + Groq)

To maximize performance, cost-efficiency, and speed, the system uses a hybrid router (`aiRouter.ts`):

**Role A: Vision Analysis (Image → Attributes)**

- **Provider**: Google Gemini 2.5 Flash Lite
- **Input**: User-uploaded clothing image (base64)
- **Output**: Structured JSON (category, colors, pattern, formality, etc.)
- **Execution**: Optimized for multimodal latent classification.

**Role B: Conversational Advisor (Conversation → Text)**

- **Provider**: Groq (Llama 3.1 8B Instant)
- **Input**: User styling questions, advice requests
- **Output**: Natural language guidance with stylistic reasoning.
- **Trigger**: Automatic intent detection via Router.

**Role C: Outfit Builder (Context → Structured Outfit)**

- **Provider**: Groq (Llama 3.1 8B Instant)
- **Input**: Occasion, Wardrobe Items, User Profile
- **Output**: Strict JSON containing item IDs and per-item styling logic.
- **Trigger**: Detected outfit creation intent (e.g., "Build me an outfit").

### 4.2 Dual-Layer Rate Limiting

- **Client-Side Throttling**: `rateLimiter.ts` manages outbound traffic to ensure stability and user experience.
  - `COOLDOWN_MS = 2000`: Minimum enforced delay between consecutive requests to prevent API hammering.
  - `MAX_QUEUE_SIZE = 5`: A client-side FIFO buffer for rapid requests. If the queue is full, subsequent requests are dropped with a visual notification rather than blocking the UI. Queued items are dispatched sequentially, so the 5th queued item will be delayed by ~10 seconds.
- **Backend Enforcement**: Supabase Edge Function (`check_and_increment_usage` RPC) enforces strict daily quotas.
  - `DAILY_QUOTA = 60` total API requests per user per day.
  - `OUTFIT_QUOTA = 20` specific outfit generations per user per day.
  - **Interaction Logic**: `OUTFIT_QUOTA` is a separate tracker that does not decrement the general `DAILY_QUOTA`.
  - **Metrics Alignment**: Limits are set to support core growth targets (e.g., 50+ items added during onboarding).
- **Quota Feedback & UX**:
  - **80% Usage**: A persistent information banner appears at the top of the chat interface. **Copy**: "You have reached 80% of your daily AI limit. Your progress is safe."
  - **100% Usage**: A blocking modal overlay disables the input area. **Copy**: "Daily limit reached. Your wardrobe and styles are still accessible in read-only mode. Limits reset in [X] hours." **CTA**: "Learn about Plans" (pointing to a /plans informational page).
  - **RPC Response Spec**:
    ```json
    {
      "status": "ok" | "quota_exhausted" | "over_limit",
      "remaining_requests": number,
      "remaining_outfits": number,
      "reset_at": "ISO-8601-Timestamp"
    }
    ```

---

## 5. Authentication & User Management

### 5.1 Strategy: Local-First + Identity

- **Provider**: Supabase Auth (Free Tier)
- **Methods**:
  - Primary: Email Magic Link (No passwords)
  - Secondary: Google OAuth
- **Data Privacy Model**:
  - **Supabase**: Stores User ID, Email, Auth metadata ONLY.
  - **Edge Function**: Verifies JWT token on every AI request to prevent abuse.
  - **Local Device (IndexedDB)**: Stores Wardrobe items, Images, Preferences.
  - **Linkage**: Local data is associated with User ID for potential future sync, but NOT synced in MVP.

### 5.2 User Flows

- **Sign Up/Login**: Magic Link email or Google OAuth.
- **Session**: 30-day persistence.
- **Storage Strategy**: Local data (Wardrobe, Outfits) is stored in IndexedDB with a `user_id` prefix (e.g., `wardrobe:{userId}`).
- **Login Behavior**: On re-login to the same account, local data is automatically restored. Logging in with a *different* account sandboxes the data under the new ID.
- **Anonymous Merge Flow**: If data exists in the local sandbox before the initial login, the user is presented with a **Conflict Resolution Prompt**:
  - **Option 1: Merge into Account**: Local items are uploaded to the new profile (last-modified timestamp used for auto-merging duplicates).
  - **Option 2: Replace Account Data**: Local device becomes the source of truth; server-side items for that user are archived.
  - **Option 3: Keep Both (Rename)**: Local items are namespaced (e.g., "Sweater (Local)") and appended to the server list.
  - **Option 4: Continue as Guest**: Authenticated session is aborted; user remains in the local sandbox.
- **Logout**: `supabase.auth.signOut()`. Clears active session and `user_id` from memory but RETAINS all local device data (Privacy-First).
- **Account Deletion**: Deletes the server-side auth record. Following auth deletion, the app triggers a mandatory **"Purge All Data" prompt**.
  - **User Choice**: Users must opt-in to purge local IndexedDB data.
  - **Decline Behavior**: If the user declines, local wardrobe data is preserved but disconnected from the identity service (becoming anonymous local data).
  - **Sequence**: Auth record is deleted FIRST to ensure the identity is severed even if the local purge is interrupted.

---

### Page Hierarchy

| Page            | Purpose                            | User Time |
| --------------- | ---------------------------------- | --------- |
| **Home / Chat** | AI conversation (default landing)  | 70%       |
| **Wardrobe**    | Item grid, filters, management     | 15%       |
| **Outfits**     | Saved outfit combinations          | 5%        |
| **Profile**     | User attributes, style preferences | 5%        |
| **Suggestions** | Insights, gaps, recommendations    | 3%        |
| **Settings**    | Export, import, data management    | 2%        |

### Chat Capabilities

Users can via chat:

- **Add clothing**: Upload image → AI suggests → User confirms
- **Generate outfits**: "I need an outfit for a birthday party tonight"
- **Ask questions**: "What colors suit my skin tone?"
- **Query wardrobe**: "Show me all my blue shirts"

---

## 5. Core Features

### 5.1 Wardrobe Management

**Grid View**:

- Image-first cards with lazy loading
- Filters: Category, Color, Season, Formality, Tags
- Search by name or attributes
- Hard cap: **100 items** (MVP)

**Default Categories**:

- Tops, Bottoms, Outerwear, Footwear, Accessories
- User can create custom categories (max 2 nesting levels)

**Item Detail Fields**:

- Image (compressed <100KB, max 800px width)
- Name, Category, Colors, Pattern
- Formality (1-5 scale)
- Season suitability
- Purchase info (optional), Notes, Tags
- Usage count

### 5.2 Outfit Generation

**Input Methods**:

- Via Chat: Natural language occasion description
- Via Wardrobe: Select anchor items → "Build outfit around this"

**Output Format**:

- Visual: Grid of item images with names
- Reasoning: Structured explanations (max 120 chars per item)
- Must reference: body type, skin tone, occasion, or preferences
- Alternatives: 1-2 optional variations

**Feedback Loop**:

- 👍/👎 buttons after each outfit
- Optional reason dropdown
- Feedback adjusts future suggestions

### 5.3 User Profile

**Physical Attributes** (optional):

- Skin tone (visual selector)
- Body type (illustrated guide)
- Height, Fit preference, Size references

**Style Preferences** (Spotify-style):

- Vibes: Minimalist, Streetwear, Classic, etc.
- Favorite/Avoided colors
- Comfort priorities

**Contextual Info** (optional):

- Age range, Gender expression
- Climate, Lifestyle notes

### 5.4 Suggestions Page

- **Style Insights**: Color harmony, silhouettes, usage analytics
- **Wardrobe Gaps**: "You lack formal footwear"
- **Wishlist**: Save AI-suggested purchases for later
- Every suggestion explains "why" (no mystery recommendations)

### 5.5 Export/Import (Day One Feature)

**Export**:

- Single JSON file with base64 images
- Includes items, outfits, preferences, chat history (optional)
- Size: ~5-10MB for 50 items

**Import**:

- Validates structure before import
- Options: Replace all or Merge
- Shows preview before confirming

---

## 6. Success Metrics (MVP)

### Activation Metrics

| Metric                | Target | Window        |
| --------------------- | ------ | ------------- |
| Users adding ≥3 items | ≥70%   | First session |
| Time to first outfit  | <5 min | First session |
| Profile completion    | ≥50%   | First week    |

### Engagement Metrics

| Metric                      | Target | Window     |
| --------------------------- | ------ | ---------- |
| Users generating ≥2 outfits | ≥40%   | First week |
| Outfits with feedback       | ≥60%   | Per outfit |
| Return users (2+ sessions)  | ≥30%   | First week |

### Technical Metrics

| Metric                        | Target     |
| ----------------------------- | ---------- |
| Outfit generation time (p95)  | <2 seconds |
| Image upload error rate       | <3%        |
| App crash rate                | <1%        |
| APK install completion rate   | >80%       |
| Cross-platform import success | >95%       |
| PWA "Add to Home Screen"      | >20%       |

### Failure Criteria (Kill/Pivot)

| Condition                | Action                 |
| ------------------------ | ---------------------- |
| <30% add even 1 item     | Redesign onboarding    |
| <10% generate 2nd outfit | Retention problem      |
| 10% critical error rate  | Technical fix required |

---

## 7. MVP Scope Lock

### ✅ INCLUDED (Non-Negotiable)

- [x] Chat-first UI (mobile + desktop)
- [x] Image upload + compression
- [x] AI-assisted item addition (Gemini Vision)
- [x] Manual wardrobe management
- [x] Editable user profile
- [x] AI outfit generation (Groq Llama 3.1 8B Instant)
- [x] Outfit feedback loop (👍/👎)
- [x] Export/import functionality (Cross-platform)
- [x] User Authentication (Supabase: Google OAuth & Magic Link)
- [x] Local-first Data Architecture with Auth Linkage
- [x] PWA with Vercel Production Performance
- [x] Native Android app (Small footprint APK < 5MB)
- [x] Hybrid Routing (BrowserRouter/HashRouter)
- [x] Mobile Deep Link Handler (me.fitwardrobe.app)
- [x] Vercel Web Analytics & PostHog Integration
- [x] Production Log Sanitization (Private Auth logs removed)
- [x] Secure AI Proxy (Supabase Edge Function)
- [x] JWT Auth Hardening for API
- [x] Empty Wardrobe Guard (Frontend + Backend)
- [x] Backend Rate Limiting (RPC)

### ❌ EXCLUDED (Post-MVP)

- Cross-device sync (Cloud storage)
- Social sharing / public profiles
- Shopping integration
- iOS Native App (deferred to Phase 6, PWA works on iOS)
- Google Play Store submission (sideloading for MVP)
- Calendar integration
- Weather API integration
- AR try-on

---

## 8. Timeline

| Phase   | Duration | Goal                                            |
| ------- | -------- | ----------------------------------------------- |
| Week 0  | 7 days   | AI eval, Capacitor setup                        |
| Phase 1 | 2 weeks  | Platform abstraction, storage                   |
| Phase 2 | 2 weeks  | Chat, AI integration                            |
| Phase 3 | 2 weeks  | Wardrobe management                             |
| Phase 4 | 1 week   | Supporting pages                                |
| Phase 5 | 3 weeks  | Auth + native + deployment                      |
| Phase 6 | 1 week   | Production Readiness (Completed)                |
| Phase 7 | 1 week   | Security Hardening & Guard Features (Completed) |

**Total**: 11 weeks + 2 week buffer = 13 weeks

---

## 9. Risks & Mitigations

| Risk                           | Mitigation                                  |
| ------------------------------ | ------------------------------------------- |
| AI provider pricing changes    | Provider swap capability (4-6 hours)        |
| Storage limits vary by browser | Conservative limits, export as safety valve |
| Users expect cross-device sync | Clear messaging about local-first           |
| Outfit suggestions generic     | Extensive user testing, feedback loop       |
| Feature creep                  | Strict scope lock, weekly reviews           |

---

## 10. Phase 2 Considerations

Only proceed if MVP hits success metrics:

1. **Cloud Sync** - If multi-device usage observed
2. **Desktop Outfit Builder** - If desktop usage >40%
3. **Outfit Calendar** - If users generate many outfits
4. **Shopping Suggestions** - If wishlist heavily used

---

**Document Owner**: FitWardrobe Team  
**Last Updated**: 2026-03-26 (Stable v2.2)
