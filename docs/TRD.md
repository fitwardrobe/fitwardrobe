# Technical Requirements Document (TRD)

## Wardrobe AI v2.4 — Stable Technical Specification

**Document Version**: 2.4
**Status**: Stable Production (v2.4)
**Stack**: React, Vite, TypeScript, TailwindCSS, IndexedDB, Capacitor 8, Supabase Edge Functions

---

## 1. System Architecture

### 1.1 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (PWA)                             │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐            │
│  │  Chat   │  │Wardrobe │  │ Outfits │  │ Profile │            │
│  │   UI    │  │  Grid   │  │  Cards  │  │  Editor │            │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘            │
│       │            │            │            │                  │
│  ┌────┴────────────┴────────────┴────────────┴────┐            │
│  │              React Context State               │            │
│  └────┬────────────────────────────┬──────────────┘            │
│       │                            │                            │
│  ┌────┴────┐                 ┌─────┴─────┐                     │
│  │   AI    │                 │  Storage  │                     │
│  │ Service │                 │  Service  │                     │
│  └────┬────┘                 └─────┬─────┘                     │
│       │                            │                            │
├───────┼────────────────────────────┼────────────────────────────┤
│       ▼                            ▼                            │
│  ┌─────────┐                 ┌───────────────────┐             │
│  │ AI API  │                 │ IndexedDB/LocalSt │             │
│  │ (Gemini)│                 │ (Browser Storage) │             │
│  └─────────┘                 └───────────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Technology Stack

| Layer          | Technology              | Version | Purpose                            |
| -------------- | ----------------------- | ------- | ---------------------------------- |
| UI Framework   | React                   | 18.2+   | Component-based UI                 |
| Build Tool     | Vite                    | 5.1+    | Fast dev/build                     |
| Language       | TypeScript              | 5.2+    | Type safety                        |
| Styling        | TailwindCSS             | 3.4+    | Utility-first CSS                  |
| Routing        | React Router            | 6.x     | Client-side routing                |
| Storage        | idb                     | 8.x     | IndexedDB wrapper                  |
| AI Provider    | Google Gemini           | 1.5+    | Vision & chat                      |
| Testing        | Vitest                  | 1.3+    | Unit testing                       |
| E2E Testing    | Playwright              | TBD     | Browser testing                    |
| Native Runtime | Capacitor               | 8.x     | Native wrapper                     |
| Camera         | @capacitor/camera       | 8.x     | Photo capture                      |
| Storage        | @capacitor/preferences  | 8.x     | Key-value storage                  |
| Filesystem     | @capacitor/filesystem   | 8.x     | File management                    |
| Deep Linking   | @capacitor/app          | 8.x     | me.fitwardrobe.app://auth/callback |
| Analytics      | Vercel + PostHog        | Latest  | Privacy-preserving Usage Analytics |
| Build Tool     | Android Studio + Gradle | Latest  | APK compilation                    |

---

## 1.3 Compliance & Constraints (Agent Rules)

| Category          | Rule               | Implementation                                                                                            |
| :---------------- | :----------------- | :-------------------------------------------------------------------------------------------------------- |
| **Allowed Tools** | Strict Allowlist   | `vite`, `react`, `tailwindcss`, `vitest`, `idb`, `@supabase/supabase-js`, `capacitor` (Android Exception) |
| **Data Privacy**  | Local-First Only   | **NO** Supabase Database writes allowed. Auth = Identity Only.                                            |
| **Secrets**       | Env Var Only       | All secrets via `import.meta.env`. No hardcoded strings.                                                  |
| **Offline**       | 100% Functionality | PWA & Android must work fully offline (except AI features).                                               |

---

## 2. AI Architecture

### 2.1 Hybrid Router Strategy (`aiRouter.ts`)

The system routes requests based on task type to optimize for cost and latency:

| Task Type           | Provider   | Model                   | Latency Target |
| :------------------ | :--------- | :---------------------- | :------------- |
| **Vision Analysis** | **Gemini** | `gemini-2.5-flash-lite` | < 2s           |
| **Chat Assistant**  | **Groq**   | `llama-3.1-8b-instant`  | < 800ms        |
| **Outfit Builder**  | **Groq**   | `llama-3.1-8b-instant`  | < 1.5s         |

### 2.2 Secure AI Proxy (Edge Function)

All AI requests are routed through a hardened Supabase Edge Function (`ai-proxy/index.ts`).

**Key Features:**

- **JWT Verification**: Validates `Authorization: Bearer <token>` from Supabase Auth.
- **Service Role Bypass**: Uses `SUPABASE_SERVICE_ROLE_KEY` to increment secure counters.
- **Backend Rate Limiting**: Calls `check_and_increment_usage` RPC to enforce daily quotas.
- **Payload Validation**: Max 1MB payload, rigorous JSON parsing.

### 2.3 Empty Wardrobe Guard

To prevent wasted AI costs and improve UX:

1.  **Frontend Guard**: `useChat.ts` checks `wardrobe.length`. If 0, blocks request immediately.
2.  **Backend Guard**: Edge Function checks `wardrobe_count` payload AND verifies against DB `clothing_items` count.
3.  **UI Feedback**: Returns `status: 'blocked_empty_wardrobe'` which triggers `<EmptyWardrobeState />` component.

### 2.4 API Integration Pattern

**Client Side (`aiProxyService.ts`)**:

```typescript
// services/aiProxyService.ts
export async function callAIProxy({ provider, action, payload }) {
  const { data, error } = await supabase.functions.invoke("ai-proxy", {
    body: { provider, action, payload },
  });
  // ... error handling
  return data;
}
```

**Route Handler (`groqService.ts`)**:

```typescript
const systemPrompt = buildChatSystemPrompt(wardrobeItems);
// Check local rate limit first
// ...
const data = await callAIProxy({
  provider: "groq",
  action: "chat",
  payload: {
    model: "llama-3.1-8b-instant",
    messages: groqMessages,
    wardrobe_count: wardrobeItems.length,
  },
});
```

---

## 3. Authentication Architecture (Supabase + Vite)

### 3.1 Setup (Adapted for Vite SPA)

Since we are using Vite (SPA) and not Next.js SSR, we rely on the standard `createClient` from `@supabase/supabase-js` and handle auth state via React Context.

**Domain**: `fitwardrobe.me` (App) / `fitwardrobe.me` (Landing)
**Dependencies**: `@supabase/supabase-js`

### 3.2 Routing Strategy (Hybrid Architecture)

To solve the conflict between Web SPA clean URLs and Native APK stability, the system uses a dual-router strategy:

- **BrowserRouter**: Enabled for Web deployments. Works with Vercel rewrites to handle URL refreshes and clean paths (`/auth/callback`).
- **HashRouter**: Enabled for Native Android/APK via Capacitor. Ensures internal navigation doesn't conflict with local filesystem paths or platform-level URL handling.

### 3.3 Client Implementation

**File**: `src/services/supabaseClient.ts`

```typescript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

**State Management**:

- `AuthContext`: Wraps app, provides `user`, `session`, `loading`.
- `AuthProvider`: Listens to `supabase.auth.onAuthStateChange`.

### 3.4 Data Linkage (Local-First)

- **Login**:
  1. Authenticate with Supabase.
  2. Retrieve `user.id` (UUID).
  3. Store `user_id` in `localStorage` (or Secure Storage on Native).
  4. Update IndexedDB/Preferences metadata to associate local wardrobe with this `user_id`.
- **Logout**:
  1. `supabase.auth.signOut()`.
  2. Clear `user_id`.
  3. **DO NOT** delete local data (User privacy guarantee).

### 3.5 Deep Linking & Redirects

- **Web Redirect**: `https://fitwardrobe.me/auth/callback`
- **Native Redirect**: `me.fitwardrobe.app://auth/callback`
- **Flow**: Magic Link click -> Platform Detection -> Opens App or PWA.

---

## 4. Data Models

### 4.1 ClothingItem

```typescript
interface ClothingItem {
  id: string; // UUID
  name: string;
  category: string;
  subcategory?: string;
  colors: string[];
  pattern: string;
  formality: number; // 1-5 scale
  seasons: string[];
  imageUrl: string; // base64 or blob URL
  imageSize: number; // in bytes
  material: string;
  purchaseInfo?: {
    store?: string;
    price?: number;
    date?: string;
  };
  metadata: {
    addedDate: string;
    timesWorn: number;
    usedInOutfits: number;
  };
  aiDetected: boolean;
  aiConfidence?: number;
  tags: string[];
}
```

### 4.2 Outfit

```typescript
interface Outfit {
  id: string;
  name?: string;
  items: string[]; // ClothingItem IDs
  occasion: string;
  vibe: string;
  reasoning: {
    [item_id: string]: {
      name: string;
      why: string; // max 120 chars
    };
  };
  alternatives?: Outfit[];
  feedback?: {
    rating: "thumbs_up" | "thumbs_down";
    reason?: string;
    items_flagged?: string[];
  };
  created_at: string;
  is_favorite: boolean;
}
```

### 4.3 UserProfile

```typescript
interface UserProfile {
  skin_tone?:
    | "very_fair"
    | "fair"
    | "light"
    | "medium"
    | "tan"
    | "deep"
    | "very_deep";
  body_type?:
    | "rectangle"
    | "triangle"
    | "inverted_triangle"
    | "hourglass"
    | "oval";
  height_cm?: number;
  fit_preference?: 1 | 2 | 3 | 4 | 5;
  style_tags?: string[];
  favorite_colors?: string[];
  avoided_colors?: string[];
  age_range?: "18-25" | "26-35" | "36-45" | "46-55" | "56+";
  gender_expression?: string;
  climate?: string;
}
```

---

## 5. Storage Architecture

### 5.1 Storage Distribution

| Data Type      | PWA Storage        | Native Storage                               | Size        | Cap |
| -------------- | ------------------ | -------------------------------------------- | ----------- | --- |
| User Profile   | IndexedDB          | Preferences                                  | ~5-10KB     | 1   |
| Clothing Items | IndexedDB (base64) | Preferences (metadata) + Filesystem (images) | ~105KB/item | 100 |
| Outfits        | IndexedDB          | Preferences                                  | ~3KB        | 50  |

### 5.2 Storage Limits

| Resource       | Hard Cap (MVP) | Note                |
| -------------- | -------------- | ------------------- |
| Clothing items | 100            | Enforced by service |
| Saved outfits  | 50             | Enforced by service |
| Chat messages  | 500 (rolling)  | Enforced by service |

### 5.3 Native Storage Architecture

**Metadata:** Capacitor Preferences

- Structured data (items array, outfits array)
- ~500KB for 100 items (without images)
- **Transactional Writes**: Temp file -> Rename -> Update Metadata

**Images:** Capacitor Filesystem

- Stored as WebP files in Data directory
- Path: `/data/data/me.fitwardrobe.app/files/wardrobe_images/`
- Referenced by filename in metadata
- **Startup Reconciliation**: Cleans orphaned files on launch

### 5.4 Image Processing Pipeline

```
Upload → Validate (JPEG/PNG/WebP/HEIC)
       ↓
Check size:
  < 100KB → Store as-is
  100KB-5MB → Compress
  > 5MB → Reject
       ↓
Compression:
  1. Resize to max 800px width
  2. Convert to WebP (quality: 75)
  3. If still >100KB, quality: 60
  4. If still >100KB, width: 600px
       ↓
Store in IndexedDB
       ↓
Generate thumbnail (200px, quality: 60)
```

---

## 6. Performance Requirements

### 6.1 Load Time Targets

| Metric                   | Target | Test Condition |
| ------------------------ | ------ | -------------- |
| First Contentful Paint   | <1.5s  | Fast 3G        |
| Time to Interactive      | <3.0s  | Fast 3G        |
| Largest Contentful Paint | <2.5s  | Fast 3G        |
| Cumulative Layout Shift  | <0.1   | -              |

### 6.2 Runtime Performance

| Operation                   | Target    |
| --------------------------- | --------- |
| Image upload + compression  | <3s       |
| Wardrobe grid (20 items)    | <1s       |
| Outfit generation           | <3s (p95) |
| Chat response               | <2s       |
| Filter wardrobe (100 items) | <500ms    |
| Export (50 items)           | <5s       |
| Import (50 items)           | <10s      |

### 6.3 Bundle Size Budget

| Asset                  | Budget     | Actual (v1.0.1) |
| ---------------------- | ---------- | --------------- |
| JavaScript (gzipped)   | <200KB     | ~140KB          |
| CSS (gzipped)          | <30KB      | ~12KB           |
| APK Binary             | <20MB      | **~2.9MB**      |
| **Total initial load** | **<300KB** | **~180KB**      |

---

## 7. Security Requirements

### 7.1 Client-Side Security

- Content Security Policy (CSP) headers
- Input sanitization for user content
- No eval() or unsafe inline scripts
- HTTPS-only

### 7.2 API Key Security

- Environment variables (never committed)
- VITE\_ prefix for client-accessible vars
- Rate limiting on API calls
- Input validation before AI calls

### 7.3 Data Privacy & Security

- **Local-First**: All personal data stored in IndexedDB/Filesystem.
- **Edge Security**:
  - **JWT Hardening**: Edge Function verifies `Authorization` header against Supabase Auth.
  - **Payload Scanning**: Inputs verified before being sent to AI providers.
  - **Rate Limiting**: Backend RPC ensures API quotas are strictly enforced.
- **No Persistence**: AI proxies operate statelessly; no images or chats are saved on the server.
- **Log Sanitization**: Auth tokens and sensitive payloads are redacted from Vercel logs.

---

## 8. Accessibility Requirements

### 8.1 Minimum Viable Accessibility

**Keyboard Navigation**:

- All elements keyboard-accessible
- Visible focus indicators (2px outline)
- Logical tab order
- Skip-to-main-content link
- Escape closes modals

**Screen Reader**:

- Semantic HTML (<button>, <nav>, <main>)
- ARIA labels for icon buttons
- ARIA live regions for chat
- Alt text for images

**Color & Contrast**:

- WCAG AA (4.5:1 text, 3:1 UI)
- Color not sole indicator
- Error states: icon + color + text

**Responsive Text**:

- Zoom up to 200% supported
- No horizontal scroll at 200%
- Minimum 16px body text

### 8.2 Testing Checklist

- [ ] Lighthouse accessibility >90
- [ ] Keyboard-only full flow
- [ ] Screen reader critical paths
- [ ] Contrast audit
- [ ] 200% zoom test

---

## 9. Error Handling

### 9.1 Critical Error States

| Error               | Trigger              | User Action            |
| ------------------- | -------------------- | ---------------------- |
| Storage Full        | 100-item limit       | Delete items or export |
| AI Timeout          | >15 seconds          | Wait or cancel         |
| Image Upload Failed | >5MB or wrong format | Try smaller image      |
| AI Parse Error      | Malformed response   | Retry or manual entry  |

### 9.2 Edge Cases

| Scenario            | Response                       |
| ------------------- | ------------------------------ |
| Empty wardrobe      | Prompt to add items            |
| Insufficient items  | Suggest what's missing         |
| Conflicting request | Ask clarifying questions       |
| No matching items   | Explain and offer alternatives |

---

## 10. Export/Import Format

### 10.1 Export Structure

```json
{
  "export_version": "1.0",
  "export_date": "ISO-8601",
  "user_profile": { ... },
  "preferences": { ... },
  "items": [
    {
      "id": "uuid",
      "name": "Blue shirt",
      "image_base64": "data:image/webp;base64,...",
      "thumbnail_base64": "data:image/webp;base64,..."
    }
  ],
  "outfits": [ ... ],
  "chat_history": [ ... ] // Optional
}
```

### 10.2 Import Validation

1. Check JSON structure
2. Verify version compatibility
3. Validate all required fields
4. Check image data integrity
5. Preview before confirming

---

## 11. Development Phases

| Phase   | Duration | Deliverable                             |
| ------- | -------- | --------------------------------------- |
| Week 0  | 7 days   | AI evaluation, prototypes               |
| Phase 1 | 2 weeks  | Storage, image pipeline, export/import  |
| Phase 2 | 2 weeks  | Chat UI, AI integration                 |
| Phase 3 | 2 weeks  | Wardrobe CRUD, filters                  |
| Phase 4 | 1 week   | Profile, Outfits, Suggestions, Settings |
| Phase 5 | 2 weeks  | Polish, testing, accessibility          |
| Phase 6 | 1 week   | 100-user beta launch                    |

---

**Document Owner**: FitWardrobe Team  
**Last Updated**: 2026-03-26 (Stable v2.4)
