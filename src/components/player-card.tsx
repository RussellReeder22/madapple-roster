import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PositionBadges } from "@/components/position-badge";
import type { Player } from "@/lib/airtable";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function PlayerCard({ player }: { player: Player }) {
  return (
    <Card className="group transition-all hover:border-red-600/30">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <Avatar className="h-14 w-14 border-2 border-muted">
            <AvatarFallback className="bg-muted text-muted-foreground font-bold text-lg">
              {getInitials(player.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold tabular-nums text-red-500 leading-none">
                #{player.number}
              </span>
            </div>
            <h3 className="font-semibold truncate">{player.name}</h3>
            <PositionBadges positions={player.position} />
            <div className="flex items-center gap-2 pt-1">
              {player.gradYear && (
                <span className="text-xs text-muted-foreground">
                  Class of {player.gradYear}
                </span>
              )}
              {player.commitment && (
                <Badge className="bg-green-600/15 text-green-400 border-green-600/30 text-xs" variant="outline">
                  {player.commitment}
                </Badge>
              )}
            </div>
            {player.recruitingLink && (
              <a
                href={player.recruitingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:underline"
              >
                Recruiting Profile
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
