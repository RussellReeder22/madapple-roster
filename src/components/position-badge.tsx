import { Badge } from "@/components/ui/badge";

const positionColors: Record<string, string> = {
  P: "bg-red-600/15 text-red-400 border-red-600/30",
  C: "bg-blue-600/15 text-blue-400 border-blue-600/30",
  "1B": "bg-emerald-600/15 text-emerald-400 border-emerald-600/30",
  "2B": "bg-emerald-600/15 text-emerald-400 border-emerald-600/30",
  "3B": "bg-emerald-600/15 text-emerald-400 border-emerald-600/30",
  SS: "bg-emerald-600/15 text-emerald-400 border-emerald-600/30",
  IF: "bg-emerald-600/15 text-emerald-400 border-emerald-600/30",
  MI: "bg-emerald-600/15 text-emerald-400 border-emerald-600/30",
  OF: "bg-amber-600/15 text-amber-400 border-amber-600/30",
  CF: "bg-amber-600/15 text-amber-400 border-amber-600/30",
  UTL: "bg-purple-600/15 text-purple-400 border-purple-600/30",
  LHP: "bg-red-600/15 text-red-400 border-red-600/30",
};

function getPositionColor(pos: string): string {
  const trimmed = pos.trim();
  return positionColors[trimmed] || "bg-muted text-muted-foreground border-border";
}

export function PositionBadge({ position }: { position: string }) {
  return (
    <Badge variant="outline" className={`text-xs font-medium ${getPositionColor(position)}`}>
      {position.trim()}
    </Badge>
  );
}

export function PositionBadges({ positions }: { positions: string | null }) {
  if (!positions) return null;
  const parts = positions.split(/[/,]/).map((p) => p.trim()).filter(Boolean);
  return (
    <div className="flex flex-wrap gap-1">
      {parts.map((pos) => (
        <PositionBadge key={pos} position={pos} />
      ))}
    </div>
  );
}
