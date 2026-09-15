# Backlink plan — Learning Bubble

## Read this first

**Backlinks cannot be added to your own website.** A backlink is a link on
*someone else's* site pointing at yours. Nothing in this repository can create
one, and any agency or tool offering "500 backlinks for $20" is selling you
links from link farms, PBNs or hacked sites.

Google detects those. The outcome is a manual action or an algorithmic
demotion, and recovering from one takes months of disavowing links you paid
for. For a domain as young as `learningbubble.org`, a link penalty would be
significantly worse than having no links at all.

So this file is a **do-it-yourself list of legitimate links**, ordered by
effort-to-value. Everything here is something a real business genuinely
qualifies for.

---

## Tier 1 — Do these first (free, high value, a few hours total)

These are citations and profiles. They are not glamorous, but they establish
that the business exists, which is what a new domain most needs.

| # | Where | Why it matters | Notes |
|---|---|---|---|
| 1 | **Google Business Profile** | Unlocks the local pack and Google reviews. Single highest-value item on this list. | Service-area business, no storefront needed. Verify by phone or postcard. |
| 2 | **Bing Places** | Same idea, 10 minutes, imports from Google. | |
| 3 | **Facebook Page — About section** | Add the website URL properly, not just in a post. | You have a page already. |
| 4 | **Instagram bio link** | Nofollow, but drives real traffic and brand searches. | Already exists — point it at `/demo`. |
| 5 | **LinkedIn Company Page** | Free, indexed, and adds a `sameAs` entity signal. | Create if you have not. |
| 6 | **YouTube channel — About/links** | Even with no videos yet, the channel description takes a link. | |

After creating each profile, add its URL to the `sameAs` array in the
Organization schema in `index.html`. That is the one part of this I *have*
wired up for you — Google uses `sameAs` to connect the profiles into a single
entity.

## Tier 2 — Education directories (free, genuinely relevant)

Relevance matters more than volume. One link from an education site beats
fifty from a generic directory.

- Pakistani education / tuition directories (search: `"online tuition" directory Pakistan`)
- IELTS and SAT preparation listing sites — many accept free provider submissions
- Local business directories for Karachi, Lahore and Islamabad
- Homeschool and online-learning resource lists — the guides at `/blog` are what
  makes you eligible for these

**Filter for each one:** would a real parent plausibly find you through this
listing? If no, skip it. That single question rules out almost every spammy
directory.

## Tier 3 — Earned links (slow, most durable)

This is where the guides section earns its keep. Nobody links to a course
page; people link to something useful.

1. **Answer questions where parents already are.** Reddit, Quora and Facebook
   parenting groups. Link only when it genuinely answers the question — drive-by
   link-dropping gets removed and can get you banned.
2. **Offer a free workshop to a school.** Schools link to partners from their
   resources or news pages, and those are strong `.edu`-adjacent links.
3. **Guest post on a local education or parenting blog.** One well-placed post
   beats a hundred directory entries.
4. **Ask families who already recommend you.** Parents who blog, or run
   community groups, will often link if simply asked.

## Tier 4 — Never do these

- Buying links, "guest post packages", or paid link insertions
- Comment-spam and forum-signature links
- Link exchanges at scale ("link to me and I'll link to you")
- Private blog networks (PBNs)
- Fiverr / Upwork "SEO backlink" gigs

All of these violate Google's spam policies. The risk is a penalty on a domain
you cannot afford to lose.

---

## What is already done in the code

These are the on-site parts of link-worthiness, and they are finished:

- `Organization` schema with `sameAs`, `areaServed` and `knowsAbout`
- Six long-form guides at `/blog` — the linkable assets
- 32 static course pages, each independently indexable
- Clean, stable URLs that will not rot
- Correct canonicals so any link equity you do earn lands on one URL

## Tracking

In Search Console, **Links → External links** shows what you have earned.
Expect it to be near-empty for the first couple of months. Check monthly, not
daily.
