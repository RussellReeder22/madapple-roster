const API_KEY = process.env.AIRTABLE_API_KEY!;
const BASE_ID = process.env.AIRTABLE_BASE_ID!;
const TEAMS_TABLE = "tbl5jnHs5R5D8J7f6";
const PLAYERS_TABLE = "tblJGEjabdzLl8XuG";

interface AirtableRecord<T> {
  id: string;
  fields: T;
}

interface AirtableResponse<T> {
  records: AirtableRecord<T>[];
  offset?: string;
}

export interface Team {
  id: string;
  name: string;
  ageGroup: string;
  headCoach: string;
  season: string;
  slug: string;
  playerCount?: number;
}

export interface Player {
  id: string;
  name: string;
  number: number;
  teamId: string;
  teamName?: string;
  gradYear: number | null;
  position: string | null;
  recruitingLink: string | null;
  commitment: string | null;
}

async function airtableFetch<T>(
  tableId: string,
  params: Record<string, string> = {}
): Promise<AirtableRecord<T>[]> {
  const url = new URL(`https://api.airtable.com/v0/${BASE_ID}/${tableId}`);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const allRecords: AirtableRecord<T>[] = [];
  let offset: string | undefined;

  do {
    if (offset) url.searchParams.set("offset", offset);
    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${API_KEY}` },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Airtable error: ${res.status} ${res.statusText}`);
    }

    const data: AirtableResponse<T> = await res.json();
    allRecords.push(...data.records);
    offset = data.offset;
  } while (offset);

  return allRecords;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

interface TeamFields {
  "Team Name": string;
  "Age Group": string;
  "Head Coach": string;
  Season: string;
}

export async function getTeams(): Promise<Team[]> {
  const records = await airtableFetch<TeamFields>(TEAMS_TABLE);
  return records.map((r) => ({
    id: r.id,
    name: r.fields["Team Name"],
    ageGroup: r.fields["Age Group"],
    headCoach: r.fields["Head Coach"],
    season: r.fields["Season"],
    slug: slugify(r.fields["Team Name"]),
  }));
}

interface PlayerFields {
  Name: string;
  Number: number;
  Team: string[];
  "Grad Year": number;
  Position: string;
  "Recruiting Link": string;
  Commitment: string;
}

export async function getPlayers(teamId?: string): Promise<Player[]> {
  const params: Record<string, string> = {};
  if (teamId) {
    params.filterByFormula = `FIND("${teamId}", ARRAYJOIN(ROLLUP_RECORD_IDS(Team)))`;
  }

  const records = await airtableFetch<PlayerFields>(PLAYERS_TABLE, params);
  return records.map((r) => ({
    id: r.id,
    name: r.fields.Name,
    number: r.fields.Number,
    teamId: r.fields.Team?.[0] || "",
    gradYear: r.fields["Grad Year"] || null,
    position: r.fields.Position || null,
    recruitingLink: r.fields["Recruiting Link"] || null,
    commitment: r.fields.Commitment || null,
  }));
}

export async function getTeamBySlug(slug: string): Promise<Team | null> {
  const teams = await getTeams();
  return teams.find((t) => t.slug === slug) || null;
}

export async function getPlayersByTeamId(teamId: string): Promise<Player[]> {
  const allPlayers = await getPlayers();
  return allPlayers
    .filter((p) => p.teamId === teamId)
    .sort((a, b) => a.number - b.number);
}

export const AGE_GROUPS = ["18U", "16U", "14U", "13U", "12U", "11U", "10U"] as const;
