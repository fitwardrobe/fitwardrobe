import {
  CalendarDays,
  Camera,
  Layers,
  Lock,
  MessageSquareQuote,
  Shirt,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  ThumbsUp,
  UserRound,
  type LucideIcon,
} from "lucide-react"

const ICONS: Record<string, LucideIcon> = {
  calendar: CalendarDays,
  camera: Camera,
  hanger: Shirt,
  layers: Layers,
  lock: Lock,
  phone: Smartphone,
  quote: MessageSquareQuote,
  sliders: SlidersHorizontal,
  spark: Sparkles,
  thumbs: ThumbsUp,
  user: UserRound,
}

/** Decorative line icon by key (see src/data/home.ts). */
export function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const Glyph = ICONS[name] ?? Sparkles
  return <Glyph size={size} strokeWidth={1.5} aria-hidden="true" />
}
