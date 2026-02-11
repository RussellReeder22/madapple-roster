import Link from "next/link";
import { notFound } from "next/navigation";
import { getTeamBySlug, getPlayersByTeamId } from "@/lib/airtable";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RosterWithFilters } from "@/components/roster-filters";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const team = await getTeamBySlug(slug);
  if (!team) return { title: "Team Not Found" };
  return {
    title: `${team.name} | Mad Apple Softball`,
    description: `View the ${team.name} roster for the 2025-2026 season. Coach ${team.headCoach}.`,
  };
}

export default async function TeamPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const team = await getTeamBySlug(slug);
  if (!team) notFound();

  const players = await getPlayersByTeamId(team.id);

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 mb-4"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          All Teams
        </Link>

        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm">
                {team.ageGroup}
              </Badge>
              <Badge variant="outline" className="text-sm text-muted-foreground">
                {team.season}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{team.name}</h1>
            <p className="text-muted-foreground">
              Coach {team.headCoach} &middot; {players.length} player
              {players.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      <Separator />

      <RosterWithFilters players={players} />
    </div>
  );
}
