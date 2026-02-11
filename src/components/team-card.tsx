import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Team } from "@/lib/airtable";

export function TeamCard({
  team,
  playerCount,
}: {
  team: Team;
  playerCount: number;
}) {
  return (
    <Link href={`/teams/${team.slug}`}>
      <Card className="group cursor-pointer transition-all hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <Badge variant="outline" className="mb-2 text-xs">
                {team.ageGroup}
              </Badge>
              <h3 className="text-lg font-semibold tracking-tight group-hover:text-red-500 transition-colors">
                {team.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                Coach {team.headCoach}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold tabular-nums">{playerCount}</p>
              <p className="text-xs text-muted-foreground">Players</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-muted-foreground group-hover:text-red-500 transition-colors">
            View Roster
            <svg
              className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
