import { SITE_CONFIG } from "@/lib/config"

export type Garment = {
  id: string
  name: string
  category: "Tops" | "Bottoms" | "Outerwear" | "Shoes"
}

/** Sample wardrobe shown in the design-preview screens. Images: /images/home/g-<id>-360.* */
export const GARMENTS: Garment[] = [
  { id: "overshirt", name: "Olive overshirt", category: "Outerwear" },
  { id: "blazer", name: "Navy blazer", category: "Outerwear" },
  { id: "denim", name: "Denim jacket", category: "Outerwear" },
  { id: "oxford", name: "Blue oxford", category: "Tops" },
  { id: "tee", name: "White tee", category: "Tops" },
  { id: "trousers", name: "Cream trousers", category: "Bottoms" },
  { id: "jeans", name: "Indigo jeans", category: "Bottoms" },
  { id: "loafers", name: "Brown loafers", category: "Shoes" },
  { id: "sneakers", name: "White sneakers", category: "Shoes" },
]

export const NAV_LINKS = [
  { href: "/#features", label: "Features" },
  { href: "/#styles", label: "Styles" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#privacy", label: "Privacy" },
  { href: "/blog/", label: "Blog" },
]

/** Glass chips floating beside the hero phone (kept clear of the model's face). */
export const HERO_CHIPS = [
  { icon: "spark", title: "Get outfit ideas", text: "With a reason for each" },
  { icon: "lock", title: "Keep it private", text: "Stored on your device" },
] as const

/** The dark band under the hero. */
export const STRIP = [
  { icon: "hanger", title: "Your own clothes", text: "Nothing to buy, nothing to browse" },
  { icon: "phone", title: "Stored on your device", text: "Your wardrobe stays on your phone" },
  { icon: "quote", title: "A reason for every pick", text: "One line on why it works" },
  { icon: "calendar", title: "Every occasion", text: "Work, travel, dates, gym and more" },
] as const

/** Style cards. Images: /images/home/<image>-<w>.* (AI-generated, illustrative). */
export const STYLES = [
  { id: "casual", image: "look-casual", title: "Casual", text: "Everyday comfort", alt: "A man in an olive overshirt, white tee and cream chinos leaning on a sunlit wall" },
  { id: "work", image: "look-work-w", title: "Workwear", text: "Sharp for the office", alt: "A woman in a charcoal blazer, cream top and navy wide-leg trousers walking through an office lobby" },
  { id: "street", image: "look-street", title: "Streetwear", text: "Bold and relaxed", alt: "A man in a denim jacket, rust hoodie and black cap on a city street" },
  { id: "travel", image: "look-travel-w", title: "Travel", text: "Light and versatile", alt: "A woman in a camel trench coat with a tan weekender bag walking down an old stone street" },
  { id: "gym", image: "look-gym", title: "Gym", text: "Built to move", alt: "A man in a black tee looping a towel around his neck in a gym" },
  { id: "date", image: "look-date", title: "Date night", text: "Make an impression", alt: "A man in a black leather jacket leaning on a bar counter at night" },
] as const

export const FEATURES = [
  {
    icon: "camera",
    title: "Photo tagging",
    text: "Snap a piece and it's tagged by type, colour, pattern and season. You can fix any tag.",
  },
  {
    icon: "calendar",
    title: "Outfits for the occasion",
    text: "Pick where you're going and get a full outfit from your clothes, plus one or two alternatives.",
  },
  {
    icon: "thumbs",
    title: "Learns your taste",
    text: "Keep or skip each outfit. The styles and colours you like shape the next suggestion.",
  },
  {
    icon: "layers",
    title: "Build around one piece",
    text: "Want to wear that jacket? Choose it and the outfit is built around it.",
  },
] as const

export const STEPS = [
  { icon: "camera", title: "Add your clothes", text: "Take photos or upload them from your gallery." },
  { icon: "sliders", title: "Set your style", text: "Pick the styles you like and the colours you avoid." },
  { icon: "spark", title: "Get outfit ideas", text: "Choose the occasion. Get an outfit and a reason." },
  { icon: "thumbs", title: "Keep or skip", text: "Every choice teaches it what suits you." },
] as const

export const TRUST = [
  {
    icon: "phone",
    title: "Stored on your device",
    text: "Your photos, pieces and outfits are saved on your phone or in your browser, not on our servers.",
    href: "/privacy/",
    link: "Read the privacy policy",
  },
  {
    icon: "spark",
    title: "AI only when it's needed",
    text: "To tag a piece or plan an outfit, the photo or item details are sent to Google's Gemini or to Groq for processing. We don't keep copies.",
    href: "/ai-transparency/",
    link: "How our AI works",
  },
  {
    icon: "user",
    title: "A founder you can reach",
    text: "FitWardrobe is built by Aryan Panwar in Meerut, India. Questions and ideas go straight to him.",
    href: "/about/",
    link: "About FitWardrobe",
  },
] as const

/** Home FAQ. `link` adds a contextual link under the answer (not part of the FAQ schema text). */
export const FAQS: { q: string; a: string; link?: { href: string; text: string } }[] = [
  {
    q: "What is FitWardrobe?",
    a: "FitWardrobe is a digital wardrobe app that suggests outfits using only the clothes you own. You photograph your clothes, it tags them, and it puts an outfit together for the occasion you choose, with a short reason for each pick.",
  },
  {
    q: "Is FitWardrobe available yet?",
    a: "Not yet. We're rebuilding the app now, for Android and the web first. Join the early-access list and we'll email you the day it opens.",
  },
  {
    q: "Is there an iPhone app?",
    a: "No. FitWardrobe launches on Android and the web first. On an iPhone you'll be able to use the web version in your browser.",
  },
  {
    q: "Is FitWardrobe free?",
    a: "Yes, it's free during early access. If we add paid plans later, we'll tell you well before anything changes. Nothing is ever charged without your clear agreement.",
  },
  {
    q: "What happens to my clothing photos?",
    a: "Your photos, items and outfits are stored on your own device. To tag a piece or suggest an outfit, the photo or item details are sent to a cloud AI service for processing. We don't keep copies on our servers.",
  },
  {
    q: "Can FitWardrobe tell me what to wear to work?",
    a: "That's the main thing it's built for. Add your work clothes, choose Work or a job interview, and it suggests an outfit from the pieces you own, with one line on why it suits the day. It can get things wrong, and you can tell it when it does.",
    link: { href: "/outfit-planner/", text: "How the AI outfit planner works" },
  },
  {
    q: "Can it build a capsule wardrobe from my clothes?",
    a: "It works as a capsule wardrobe planner rather than a shopping list. Add the pieces you want to keep in rotation and it builds outfits from only those, each with a reason, so a small wardrobe goes further.",
    link: { href: "/capsule-wardrobe/", text: "Plan a capsule wardrobe from what you own" },
  },
  {
    q: "How does it choose an outfit?",
    a: "It reads the type, colour, pattern, season and formality of each piece you add, learns from the outfits you keep or skip, and puts together combinations for the occasion you choose. Every suggestion comes with a short reason. It can get things wrong, and you can tell it when it does.",
  },
  {
    q: "How is it different from Whering, Indyx or Stylebook?",
    a: "FitWardrobe focuses on one job: choosing an outfit for a specific occasion from clothes you already own, and telling you why it works. Our comparison guide sets out what each wardrobe app offers, based on their public feature lists.",
    link: { href: "/blog/best-outfit-planning-apps-compared/", text: "Whering vs Indyx vs Stylebook, compared" },
  },
  {
    q: "Is there a Stylebook app for Android?",
    a: "No. Stylebook is only available for iPhone and iPad. FitWardrobe is a digital wardrobe app coming to Android and the web, and our guide to Stylebook alternatives for Android compares the options available today.",
    link: { href: "/blog/stylebook-alternative-android/", text: "Stylebook alternatives for Android" },
  },
  {
    q: "What is a digital wardrobe app?",
    a: "A digital wardrobe app keeps a photo of every piece of clothing you own, tagged by type, colour and season, so you can see your whole wardrobe on your phone and plan outfits from it. FitWardrobe adds outfit suggestions for the occasion you pick, each with a short reason.",
    link: { href: "/blog/what-is-a-digital-wardrobe/", text: "What a digital wardrobe is, and how to start one" },
  },
  {
    q: "Is it only for men?",
    a: "No. FitWardrobe works with any wardrobe.",
  },
]

/** Homepage links into the most-searched guides and the two product guide pages. */
export const GUIDES = [
  {
    href: "/blog/best-outfit-planning-apps-compared/",
    topic: "Wardrobe apps",
    title: "Whering vs Indyx vs Stylebook: which wardrobe app to choose",
  },
  {
    href: "/blog/stylebook-alternative-android/",
    topic: "Android",
    title: "Is Stylebook on Android? The best alternatives",
  },
  {
    href: "/blog/best-digital-wardrobe-apps/",
    topic: "Wardrobe apps",
    title: "The best digital wardrobe and outfit planner apps",
  },
  {
    href: "/blog/what-is-a-digital-wardrobe/",
    topic: "Digital wardrobe",
    title: "What a digital wardrobe is, and how to start one",
  },
  {
    href: "/outfit-planner/",
    topic: "Outfit planner",
    title: "AI outfit planner: outfits from the clothes you own",
  },
  {
    href: "/capsule-wardrobe/",
    topic: "Capsule wardrobe",
    title: "An AI capsule wardrobe planner for what you already have",
  },
]

export const SOCIAL_LINKS = [
  { href: "https://instagram.com/fitwardrobe", label: "Instagram" },
  { href: "https://x.com/fitwardrobe", label: "X" },
  { href: SITE_CONFIG.telegramUrl, label: "Telegram" },
  { href: SITE_CONFIG.discordUrl, label: "Discord" },
  { href: SITE_CONFIG.social.github, label: "GitHub" },
]
