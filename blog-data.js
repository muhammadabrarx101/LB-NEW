/* ============================================================
   Learning Bubble — Article index
   ------------------------------------------------------------
   Each article targets a long-tail informational query that
   feeds naturally into a course page. Keep `slug` stable — it
   is the URL.
   ============================================================ */

const articlesData = [
    {
        slug: 'how-long-does-ielts-preparation-take',
        title: 'How long does IELTS preparation actually take?',
        excerpt: 'An honest timeline based on where you are starting, not on what a course wants to sell you.',
        date: '2026-08-12',
        readMins: 6,
        branch: 'academics',
        category: 'Test Preparation',
        icon: 'fa-bullseye',
        related: [23, 24],
        keywords: 'IELTS test preparation, how long IELTS preparation, IELTS study plan'
    },
    {
        slug: 'igcse-vs-o-level-difference',
        title: 'IGCSE vs O-Level: what actually differs',
        excerpt: 'The two qualifications get used interchangeably. They are not the same, and the difference matters when you choose.',
        date: '2026-08-05',
        readMins: 5,
        branch: 'academics',
        category: 'IGCSE Academics',
        icon: 'fa-flask',
        related: [22],
        keywords: 'IGCSE, O-Level, IGCSE vs O Level, exam preparation'
    },
    {
        slug: 'sat-preparation-timeline',
        title: 'A realistic four-month SAT preparation plan',
        excerpt: 'What each month should look like, and why cramming the last three weeks rarely moves a score.',
        date: '2026-07-28',
        readMins: 7,
        branch: 'academics',
        category: 'Test Preparation',
        icon: 'fa-chart-simple',
        related: [25],
        keywords: 'SAT test preparation, SAT study plan, SAT timeline'
    },
    {
        slug: 'what-age-should-a-child-start-coding',
        title: 'What age should a child start coding?',
        excerpt: 'There is no single right answer, but there is a wrong way to start — and it puts children off for years.',
        date: '2026-07-20',
        readMins: 6,
        branch: 'kids',
        category: 'Technology & Coding',
        icon: 'fa-code',
        related: [5, 6, 4],
        keywords: 'coding for kids, online learning for kids, what age to start coding'
    },
    {
        slug: 'is-online-learning-effective-for-kids',
        title: 'Is online learning actually effective for kids?',
        excerpt: 'The evidence is more specific than the arguments. What matters is group size, live teaching and what the child does in the session.',
        date: '2026-07-11',
        readMins: 7,
        branch: 'kids',
        category: 'Online learning',
        icon: 'fa-laptop',
        related: [16, 12, 17],
        keywords: 'online learning for kids, is online learning effective, elearning for children'
    },
    {
        slug: 'how-to-choose-an-online-course-for-your-child',
        title: 'How to choose an online course for your child',
        excerpt: 'Six questions worth asking before you pay for anything — including the two most providers hope you skip.',
        date: '2026-07-02',
        readMins: 6,
        branch: 'kids',
        category: 'Online learning',
        icon: 'fa-compass',
        related: [1, 11, 18],
        keywords: 'creative courses for kids, online courses for kids, choosing online learning'
    }
];

if (typeof window !== 'undefined') window.articlesData = articlesData;
