"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TeamCard } from "@/components/team-card";
import type { Team } from "@/lib/airtable";
import { AGE_GROUPS } from "@/lib/airtable";

interface Props {
  teams: Team[];
  playerCounts: Record<string, number>;
}

export function AgeGroupTabs({ teams, playerCounts }: Props) {
  const teamsByAge = AGE_GROUPS.reduce(
    (acc, ag) => {
      acc[ag] = teams.filter((t) => t.ageGroup === ag);
      return acc;
    },
    {} as Record<string, Team[]>
  );

  const activeGroups = AGE_GROUPS.filter((ag) => teamsByAge[ag].length > 0);

  return (
    <Tabs defaultValue={activeGroups[0]} className="w-full">
      <TabsList className="flex flex-wrap h-auto gap-1 bg-muted/50 p-1">
        {activeGroups.map((ag) => (
          <TabsTrigger key={ag} value={ag} className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
            {ag}
            <span className="ml-1.5 text-xs opacity-70">
              ({teamsByAge[ag].length})
            </span>
          </TabsTrigger>
        ))}
      </TabsList>
      {activeGroups.map((ag) => (
        <TabsContent key={ag} value={ag} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamsByAge[ag].map((team) => (
              <TeamCard
                key={team.id}
                team={team}
                playerCount={playerCounts[team.id] || 0}
              />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
