import React from 'react'
import Head from 'next/head'

const howToScore = () => {
    return (
        <>
            <Head>
                <title>How To Score | Boxing Scorecard</title>
            </Head>
            <div className="wrap__lg">
                <section id="how-to-score">
                    <h2>The basics of the 10-point must system</h2>
                    <ul>
                        <li>
                            Judges score on a 10-point scale. Most rounds will
                            end 10-9, with&nbsp;the more dominant
                            boxer&nbsp;receiving 10 points,&nbsp;the other
                            receiving 9.
                        </li>
                        <li>
                            If a boxer&nbsp;is knocked down, he loses a point.
                            If a&nbsp;boxer is knocked down twice, he loses two
                            points. If both fighters are knocked down, the
                            knockdowns cancel each other out.
                        </li>
                        <li>
                            While uncommon, if a&nbsp;fighter completely
                            dominates a round but doesn’t score a knockdown, a
                            judge can still score that round 10-8.
                        </li>
                        <li>
                            If a&nbsp;judge deems the round completely even,
                            both fighters receive 10 points.
                        </li>
                        <li>
                            When the referee sees fit, he can take away a point
                            or two for an intentional foul; he can do the same
                            for unintentional ones, but that usually occurs
                            after at least a warning.
                        </li>
                    </ul>

                    <hr />

                    <h2>What judges look for</h2>
                    <ul>
                        <li>
                            <span>Effective Aggression</span> – Being aggressive
                            gives the impression of dominance, but unless the
                            boxer is landing shots and not constantly getting
                            countered, it’s not exactly “effective.” Judges look
                            for effective aggression, where the
                            aggressor&nbsp;consistently lands his punches and
                            avoids those from his opponent.
                        </li>
                        <li>
                            <span>Ring Generalship</span> – The fighter who
                            controls the action and enforces his will and style.
                        </li>
                        <li>
                            <span>Defense</span> – How well is a boxer slipping,
                            parrying, and blocking punches? Good defense is
                            important.
                        </li>
                        <li>
                            <span>Hard and Clean Punches</span> – To the
                            untrained eye, it can appear as if a boxer is
                            landing a lot of shots, when, in fact, most are
                            being blocked or aren’t landing flush. A judge needs
                            to look for hard shots that land clean.
                        </li>
                    </ul>

                    <hr />

                    <h2>The decision</h2>
                    <ul>
                        <li>
                            <span>Unanimous Decision</span> – All three judges
                            had the same fighter scoring more points.
                        </li>
                        <li>
                            <span>Split Decision</span> – Two of the three
                            judges had the same fighter scoring more points (the
                            winner), while the other judge had the other boxer
                            scoring more points (the loser).
                        </li>
                        <li>
                            <span>Majority Decision</span> – Two of the three
                            judges had the same fighter scoring more points (the
                            winner), while the other judge ruled the contest a
                            draw.
                        </li>
                        <li>
                            <span>Draw</span> – A draw can occur when either two
                            of the judges rule the contest a draw, or it can
                            happen when one judge scores the bout for one
                            fighter, another judge scores it for the other
                            fighter, and the third rules it a draw.
                        </li>
                    </ul>

                    <span>
                        Rules taken from{' '}
                        <a
                            href="https://coolmaterial.com/feature/how-to-score-a-boxing-match/"
                            target="_blank"
                            rel="noreferrer">
                            Cool Material
                        </a>
                        .
                    </span>
                </section>
            </div>
        </>
    )
}

export default howToScore
