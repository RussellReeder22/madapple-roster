import { getTeams, getPlayers } from "@/lib/airtable";
import { AgeGroupTabs } from "@/components/age-group-tabs";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [teams, players] = await Promise.all([getTeams(), getPlayers()]);

  const playerCounts: Record<string, number> = {};
  for (const player of players) {
    if (player.teamId) {
      playerCounts[player.teamId] = (playerCounts[player.teamId] || 0) + 1;
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Team Rosters</h1>
        <p className="text-muted-foreground">
          {teams.length} teams &middot; {players.length} athletes &middot;
          2025–2026 Season
        </p>
      </div>
      <AgeGroupTabs teams={teams} playerCounts={playerCounts} />
    </div>
  );
}
