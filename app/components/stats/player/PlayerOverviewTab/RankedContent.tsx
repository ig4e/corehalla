import { MiscStatGroup } from "../../MiscStatGroup"
import { RatingDisplay } from "../../RatingDisplay"
import { SectionTitle } from "../../../layout/SectionTitle"
import { calculateWinrate } from "bhapi/helpers/calculateWinrate"
import { getGlory, getPersonalEloReset } from "bhapi/calculator"
import { getTierFromRating } from "bhapi/helpers/getTierFromRating"
import Image from "next/image"
import type { MiscStat } from "../../MiscStatGroup"
import type { PlayerRanked } from "bhapi/types"

type PlayerOverviewRankedContentProps = {
    ranked: PlayerRanked
}

export const PlayerOverviewRankedContent = ({
    ranked,
}: PlayerOverviewRankedContentProps) => {
    const glory = getGlory(ranked)

    const eloReset = getPersonalEloReset(ranked.rating)

    const rankedStats: MiscStat[] = [
        {
            name: "1v1 Games",
            value: ranked.games,
            desc: "1v1 Ranked games played this season",
        },
        // {
        //     name: "Total Games",
        //     value: totalGames,
        //     desc: "Total ranked games played this season (all gamemodes)",
        // },
        {
            name: "Winrate",
            value: `${calculateWinrate(ranked.wins, ranked.games).toFixed(2)}%`,
            desc: "Ranked winrate (ranked wins / ranked games)",
        },
        ...(glory.hasPlayedEnoughGames
            ? [
                  {
                      name: "Total Glory",
                      value: glory.totalGlory,
                      desc: "Total glory earned this season (wins + best rating)",
                  },
                  {
                      name: "Glory from rating",
                      value: glory.gloryFromBestRating,
                      desc: `Glory earned from best rating (${glory.bestRating} Elo)`,
                  },
                  {
                      name: "Glory from wins",
                      value: glory.gloryFromWins,
                      desc: `Glory earned from wins (${glory.totalWins} Wins)`,
                  },
              ]
            : [
                  {
                      name: "Total Glory",
                      value: "N/A (not enough games)",
                      desc: "Total glory earned this season (wins + best rating)",
                  },
              ]),
        {
            name: "Elo reset",
            value: <>{eloReset}</>,
            desc: `Elo reset for next season (${getTierFromRating(eloReset)})`,
        },
    ]

    return (
        <>
            <SectionTitle hasBorder customMargin className="my-4">
                Ranked Season
            </SectionTitle>
            <div className="flex items-center gap-4">
                <div className="relative h-24 w-16">
                    <Image
                        src={`/images/ranked-banners/${ranked.tier}.png`}
                        alt={ranked.tier ?? "Valhallan"}
                        layout="fill"
                        objectFit="contain"
                        objectPosition="center"
                    />
                </div>
                <div>
                    <span className="text-sm font-light">{ranked.tier}</span>
                    <RatingDisplay
                        className="w-80"
                        games={ranked.games}
                        wins={ranked.wins}
                        rating={ranked.rating}
                        peak_rating={ranked.peak_rating}
                    />
                </div>
            </div>
            <MiscStatGroup className="mt-4" stats={rankedStats} />
        </>
    )
}