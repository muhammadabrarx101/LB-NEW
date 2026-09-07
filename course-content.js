/* ============================================================
   Learning Bubble — Extended course content
   ------------------------------------------------------------
   Loaded only by course-detail, so the rest of the site
   does not pay for it. Keyed by the course id in courses-data.js.

     whoFor    — one paragraph, plain language
     outcomes  — what the student can actually do afterwards
     structure — how the sessions are sequenced
     faqs      — questions people genuinely ask before booking
                 (also emitted as FAQPage structured data)
   ============================================================ */

const courseContent = {

    /* ========================= KIDS ========================= */

    1: {
        whoFor: 'Students aged 12–16 who like puzzles more than textbooks, and readers who have stalled on classics but will happily chase a mystery. No prior knowledge of Conan Doyle is assumed — several students arrive having never finished a novel and leave having read three cases on their own.',
        outcomes: [
            'Read a full Sherlock Holmes case and summarise the chain of reasoning',
            'Separate an observation from an inference — the core of critical thinking',
            'Build an evidence map and defend a conclusion against challenge',
            'Spot the detail everyone else skipped, in a text and in daily life'
        ],
        structure: [
            { t: 'Session 1 — Observation vs inference', d: 'We open with the famous "you see but you do not observe" exchange, then run live observation drills before touching a single case.' },
            { t: 'Session 2 — The first case', d: 'A complete short case read together, paused at the point where the reader has every clue Holmes has. Students commit to a suspect before the reveal.' },
            { t: 'Session 3 — Evidence mapping', d: 'Working in pairs, students diagram how each clue connects to a conclusion, then argue the weak links in someone else\'s map.' },
            { t: 'Session 4 — Solve it yourself', d: 'A case the teacher has not discussed. Students work it end to end and present their reasoning to the group.' }
        ],
        faqs: [
            { q: 'Does my child need to have read Sherlock Holmes before?', a: 'No. We read the cases together in class and provide the text. Students who have never opened one are the students this course was designed for.' },
            { q: 'Are the stories too difficult for a 12-year-old?', a: 'The Victorian language takes a session to settle into, which is why we read aloud together and stop to unpack anything unfamiliar. Plot pulls readers through vocabulary far better than a glossary does.' },
            { q: 'Is there any homework?', a: 'One optional case between sessions. Students who want to read ahead are welcome to; nobody is penalised for not doing so.' }
        ]
    },

    2: {
        whoFor: 'Students aged 12–16 who find school history a list of dates to survive. Also strong preparation for anyone heading into IGCSE History, because the skill being trained — using evidence to build an argument — is exactly what those papers reward.',
        outcomes: [
            'Explain why an event happened, not just when it happened',
            'Read a primary source and identify whose interests it serves',
            'Compare two accounts of the same event and account for the difference',
            'Connect a historical pattern to something happening now'
        ],
        structure: [
            { t: 'Sessions 1–2 — How we know anything', d: 'What counts as evidence, who wrote the record, and why the winners\' version survives. Students examine conflicting accounts of one event.' },
            { t: 'Sessions 3–4 — Civilisations and collapse', d: 'Why societies rise and fall, drawn from cases students have usually never met in class.' },
            { t: 'Session 5 — The stories left out', d: 'Histories that did not make the syllabus, and an honest look at why.' },
            { t: 'Session 6 — Your own investigation', d: 'Each student picks an event, gathers sources and presents a short evidence-based case to the group.' }
        ],
        faqs: [
            { q: 'Does this follow a school syllabus?', a: 'No — it deliberately sits alongside school rather than repeating it. The thinking skills transfer directly to IGCSE History, but the content is chosen to be interesting rather than examinable.' },
            { q: 'Will it help with school history grades?', a: 'Usually yes, indirectly. Students who can argue from evidence write better history essays, and that is the part most students lose marks on.' },
            { q: 'How much reading is involved?', a: 'Short extracts, read in class. This is a discussion course, not a reading list.' }
        ]
    },

    3: {
        whoFor: 'Ages 8–14, particularly children who go quiet in group settings or lose the thread when retelling something. Equally suited to confident talkers who need structure rather than volume.',
        outcomes: [
            'Retell a story with beginning, middle and end intact',
            'Summarise without losing the detail that made it matter',
            'Hold a listener\'s attention using pace and pause',
            'Speak to a group without reading from a page'
        ],
        structure: [
            { t: 'Session 1 — What makes a story a story', d: 'Shape, sequence and stakes, taught through stories students already know.' },
            { t: 'Session 2 — Summarising well', d: 'The difference between cutting a story down and gutting it. Students summarise the same tale at three different lengths.' },
            { t: 'Session 3 — Telling out loud', d: 'Pace, pause and eye contact. Everyone tells; nobody is put on the spot cold.' },
            { t: 'Session 4 — Your story', d: 'Each student prepares and performs a short story of their own choosing.' }
        ],
        faqs: [
            { q: 'My child is shy. Will they be forced to perform?', a: 'Never cold. We build up through pair work and small-group telling first, and a child who is not ready in week four can tell their story to the teacher instead. Most choose to perform by then.' },
            { q: 'Is this a writing course?', a: 'No — it is oral. Students plan on paper but the work happens out loud. If you want writing, look at Creative Writing for the same age group.' },
            { q: 'Does it help with school presentations?', a: 'Directly. Presentation confidence is the most common thing parents report back.' }
        ]
    },

    4: {
        whoFor: 'Ages 12–16. Students already using AI tools without much understanding of them, and parents who would rather their child learned the rules from a teacher than from a group chat. No coding background needed.',
        outcomes: [
            'Explain in plain terms how an AI model produces an answer',
            'Build and test a simple rule-based bot',
            'Recognise when an AI output is wrong, biased or invented',
            'Use AI as a study aid without outsourcing the thinking'
        ],
        structure: [
            { t: 'Sessions 1–2 — What AI actually is', d: 'Pattern-matching, training data and prediction, explained without maths. Where AI already touches their day.' },
            { t: 'Sessions 3–4 — Build a bot', d: 'Students design and test a simple conversational bot, then try to break each other\'s.' },
            { t: 'Sessions 5–6 — Data and bias', d: 'Why models inherit the flaws of their training data, demonstrated rather than asserted.' },
            { t: 'Sessions 7–8 — Using AI honestly', d: 'Prompting, fact-checking, what counts as your own work, and digital safety. Ends with a personal project.' }
        ],
        faqs: [
            { q: 'Will this teach my child to cheat with AI?', a: 'The opposite. A large part of the course is where the line sits between using a tool and handing over your thinking, and why the second one costs you.' },
            { q: 'Is coding experience required?', a: 'No. The bot-building uses visual and rule-based tools, not a programming language.' },
            { q: 'Which AI tools do you use?', a: 'Age-appropriate, teacher-supervised tools inside the session. Students are not asked to create accounts on anything.' }
        ]
    },

    5: {
        whoFor: 'Ages 10–16 with no coding experience at all. The right starting point for a child who says they are "not a computer person" — the first thing they draw on screen usually settles that.',
        outcomes: [
            'Write and run a working program from a blank file',
            'Use variables, loops and conditions without memorising syntax',
            'Debug your own code by reading the error rather than guessing',
            'Finish with games and animations you built yourself'
        ],
        structure: [
            { t: 'Session 1 — First lines, first drawing', d: 'Something appears on screen in the first ten minutes. Coordinates and commands.' },
            { t: 'Session 2 — Loops', d: 'Why repeating yourself is the programmer\'s enemy, shown by drawing something impossible by hand.' },
            { t: 'Session 3 — Variables and input', d: 'Programs that remember and respond.' },
            { t: 'Session 4 — Conditions', d: 'Decisions, branching and the logic of if-then.' },
            { t: 'Session 5 — Build a game', d: 'Students combine everything into a small playable game to keep.' }
        ],
        faqs: [
            { q: 'What software is needed?', a: 'Microsoft Small Basic — free, tiny, and installs in a minute on Windows. We send the link and a setup guide before session one.' },
            { q: 'Is Small Basic a real language?', a: 'Yes, and deliberately chosen: it has real syntax and real errors, but a fraction of the ceremony. Students move to Python afterwards without unlearning anything.' },
            { q: 'What comes after this course?', a: 'Learn Python is the natural next step, usually with a few months in between.' }
        ]
    },

    6: {
        whoFor: 'Ages 12–18 who have outgrown block-based coding, or adults starting from scratch. Some prior exposure to programming logic helps but is not required — we cover fundamentals before touching data.',
        outcomes: [
            'Write Python programs using functions, lists and dictionaries',
            'Load a real dataset and answer questions with it using pandas',
            'Produce clear charts with matplotlib',
            'Read an error message and fix the cause rather than the symptom'
        ],
        structure: [
            { t: 'Session 1 — Python fundamentals', d: 'Variables, types, input and output. Everything runs from day one.' },
            { t: 'Session 2 — Control flow and functions', d: 'Loops, conditions, and writing code you can reuse.' },
            { t: 'Session 3 — Data structures', d: 'Lists and dictionaries, and choosing between them.' },
            { t: 'Session 4 — Working with real data', d: 'First contact with pandas on a genuine, messy dataset.' },
            { t: 'Session 5 — Analysis', d: 'Filtering, grouping and asking questions the data can answer.' },
            { t: 'Session 6 — Visualisation and project', d: 'matplotlib charts, then a small end-to-end project of the student\'s choosing.' }
        ],
        faqs: [
            { q: 'Is this enough to start A-Level or university Computer Science?', a: 'It is a solid foundation for the programming half. It does not cover theory topics like algorithms and complexity, which those courses teach separately.' },
            { q: 'What does my child need installed?', a: 'Nothing at first — we start in the browser. Later sessions use a free local Python setup that we walk through together.' },
            { q: 'Is six sessions really enough for pandas?', a: 'For a working introduction, yes — enough to load, filter, group and chart real data. It is a foundation, not mastery, and we say so.' }
        ]
    },

    7: {
        whoFor: 'Ages 10–16 who already make things — posters, edits, thumbnails — and want them to stop looking homemade. No design background needed.',
        outcomes: [
            'Apply hierarchy, alignment and spacing deliberately',
            'Choose colour and type combinations that hold together',
            'Work confidently in both Canva and Illustrator',
            'Take a brief from idea to finished artwork'
        ],
        structure: [
            { t: 'Sessions 1–2 — The fundamentals', d: 'Layout, hierarchy, alignment and whitespace. Why good design mostly looks like restraint.' },
            { t: 'Sessions 3–4 — Colour and type', d: 'Building palettes that work and pairing typefaces without guessing.' },
            { t: 'Session 5 — Illustrator', d: 'Vectors, shapes and why logos are not made of pixels.' },
            { t: 'Session 6 — Real brief', d: 'A full project from brief to export, critiqued by the group.' }
        ],
        faqs: [
            { q: 'Do we need to buy Adobe Illustrator?', a: 'A free trial covers the two sessions that use it, and everything else runs in Canva\'s free tier. Nobody is required to buy software for this course.' },
            { q: 'Is a drawing tablet needed?', a: 'No. A mouse or trackpad is fine throughout.' },
            { q: 'Will they finish with a portfolio?', a: 'They finish with several complete pieces, which is enough to show a school or a first client.' }
        ]
    },

    8: {
        whoFor: 'Ages 10–16 heading into years where school work is submitted digitally. Especially useful for students who can use a phone fluently but freeze in front of a spreadsheet.',
        outcomes: [
            'Structure a Word document with headings, styles and a contents page',
            'Build a presentation that supports a speaker instead of replacing them',
            'Use Excel formulas, sorting and basic charts',
            'Choose the right tool for a task instead of defaulting to one'
        ],
        structure: [
            { t: 'Sessions 1–2 — Word', d: 'Styles, structure, tables and formatting that survives being reopened.' },
            { t: 'Sessions 3–4 — PowerPoint', d: 'Slide design, and why most slides are doing the wrong job.' },
            { t: 'Sessions 5–6 — Excel', d: 'Cells, formulas, sorting, filtering and charts, on data students care about.' },
            { t: 'Session 7 — Put it together', d: 'One project that touches all three tools, as a real school task would.' }
        ],
        faqs: [
            { q: 'Do we need a paid Microsoft 365 subscription?', a: 'No — the free web versions cover everything in the course. A desktop install is nicer but not required.' },
            { q: 'Can they use Google Docs and Sheets instead?', a: 'They can follow along, and most skills transfer. Some Excel specifics differ, and we point those out as they come up.' },
            { q: 'Is this too basic for a 16-year-old?', a: 'The Excel half rarely is. Most students at that age have never been taught formulas properly and find it the most useful part.' }
        ]
    },

    9: {
        whoFor: 'Ages 10–14 meeting poetry beyond what school requires. Suits both children who already write privately and those who think poetry is something that happens to other people.',
        outcomes: [
            'Read a poem aloud with confidence and control',
            'Name what a poem is doing — imagery, rhythm, repetition',
            'Write in several forms rather than defaulting to rhyme',
            'Revise your own work instead of abandoning it'
        ],
        structure: [
            { t: 'Session 1 — Poems worth hearing', d: 'Reading aloud, old and new, and finding one everyone actually likes.' },
            { t: 'Session 2 — The toolkit', d: 'Imagery, sound and rhythm, spotted in real poems before being used.' },
            { t: 'Session 3 — Writing', d: 'Guided writing in three different forms, including one without rhyme.' },
            { t: 'Session 4 — Sharing and revising', d: 'Gentle workshop. Everyone leaves with one poem they have properly finished.' }
        ],
        faqs: [
            { q: 'What if my child hates poetry?', a: 'That is a common starting point, and usually means they have only met poems chosen for exams. Session one exists to fix that.' },
            { q: 'Do they have to share their work?', a: 'With the group by session four, yes — but only work they choose, and the workshop rules are set before anyone reads.' },
            { q: 'Is there an older version of this course?', a: 'Yes, Poet\'s Corner Advanced for ages 15–20, led by a working poet.' }
        ]
    },

    10: {
        whoFor: 'Ages 15–20 who already write poetry and want to get better rather than be encouraged. Assumes you have written before and can take direct feedback on your work.',
        outcomes: [
            'Take a poem through drafting, critique and genuine revision',
            'Use form and line breaks as deliberate choices',
            'Give and receive workshop feedback that is useful rather than polite',
            'Recognise and develop your own voice'
        ],
        structure: [
            { t: 'Sessions 1–2 — Reading as a writer', d: 'Contemporary poems taken apart for technique, not meaning.' },
            { t: 'Sessions 3–4 — Draft and critique', d: 'Full workshop cycle on work everyone brings. Direct, specific feedback.' },
            { t: 'Session 5 — Form and constraint', d: 'Writing into a shape, and what constraint does to the writing.' },
            { t: 'Session 6 — Final piece', d: 'One poem revised properly, with individual written feedback from the tutor.' }
        ],
        faqs: [
            { q: 'How direct is the feedback?', a: 'Direct enough to be useful — specific about what is not working and why. Never unkind, and the ground rules are agreed in session one.' },
            { q: 'Do I need to have been published?', a: 'No. You need to have written poems and want to write better ones.' },
            { q: 'Who teaches it?', a: 'A practising writer and poet, not a general English tutor.' }
        ]
    },

    11: {
        whoFor: 'Ages 8–10, especially children who say they "do not know what to write". The course is built around removing that specific problem.',
        outcomes: [
            'Generate story ideas on demand instead of waiting for inspiration',
            'Write description that shows rather than lists',
            'Finish a short story from beginning to end',
            'Enjoy writing enough to do it unprompted'
        ],
        structure: [
            { t: 'Session 1 — Ideas', d: 'Prompt games that make the blank page stop being frightening.' },
            { t: 'Session 2 — Describing', d: 'Using the senses so a reader can picture it.' },
            { t: 'Session 3 — Characters', d: 'Making someone up who feels real.' },
            { t: 'Session 4 — Shape', d: 'Beginning, middle and end — and why the middle is where stories go wrong.' },
            { t: 'Session 5 — Finish and share', d: 'Completing one story and reading it to the group.' }
        ],
        faqs: [
            { q: 'Is spelling and grammar corrected?', a: 'Lightly and privately. At this age, correcting mid-flow is the fastest way to stop a child writing. Accuracy comes after fluency.' },
            { q: 'How long are the stories?', a: 'A page or two. The goal is finishing, not length.' },
            { q: 'My child writes constantly already — is this too easy?', a: 'Possibly. If they are confident and prolific at 10, the 11–14 course usually suits better. Ask us and we will be honest.' }
        ]
    },

    12: {
        whoFor: 'Ages 11–14 who can already write a story and want it to be good. The stage where enthusiasm needs technique to keep improving.',
        outcomes: [
            'Structure a plot that holds together under pressure',
            'Write characters with wants and contradictions',
            'Write dialogue that sounds like speech and carries information',
            'Work in more than one genre by choice'
        ],
        structure: [
            { t: 'Session 1 — Structure', d: 'Why stories sag in the middle, and what to do about it.' },
            { t: 'Session 2 — Character', d: 'Want, obstacle and flaw. Building someone worth reading about.' },
            { t: 'Session 3 — Dialogue', d: 'Writing speech that is not just information delivery.' },
            { t: 'Session 4 — Genre', d: 'The same scene written three ways to feel how convention shapes writing.' },
            { t: 'Session 5 — Your story', d: 'A complete piece with individual feedback.' }
        ],
        faqs: [
            { q: 'Can my child write fan fiction or fantasy?', a: 'Yes. What they write about is theirs; how well it is built is what we teach.' },
            { q: 'Will this help with school English?', a: 'Yes for creative and descriptive writing tasks, which is where most marks are available and least often taught explicitly.' },
            { q: 'Is the feedback written or spoken?', a: 'Both — spoken in session, and written on the final piece.' }
        ]
    },

    13: {
        whoFor: 'Ages 15–18 who write seriously and want to sharpen rather than start. Useful for personal statements and portfolio applications as a side effect.',
        outcomes: [
            'Identify and develop your own style rather than imitating',
            'Use structure, perspective and tense as deliberate tools',
            'Take direct critique and revise without starting over',
            'Leave with polished pieces suitable for a portfolio'
        ],
        structure: [
            { t: 'Session 1 — Voice', d: 'What makes writing recognisably yours, and how to stop borrowing.' },
            { t: 'Session 2 — Perspective and tense', d: 'How the same story changes depending on who tells it and when.' },
            { t: 'Session 3 — Multi-genre', d: 'Working outside your comfort zone on purpose.' },
            { t: 'Session 4 — Workshop', d: 'Full critique cycle on work in progress.' },
            { t: 'Session 5 — Polish', d: 'Final revision with detailed written feedback.' }
        ],
        faqs: [
            { q: 'Will this help my university application?', a: 'Indirectly but genuinely — the pieces can support a portfolio, and the editing skill shows in a personal statement.' },
            { q: 'How much writing is expected between sessions?', a: 'A short piece most weeks. Students who cannot manage it one week are not left behind.' },
            { q: 'Is the group mixed ability?', a: 'Within a narrow band. Groups are capped at five so the level can be matched properly.' }
        ]
    },

    14: {
        whoFor: 'Ages 14–18 whose ideas outrun their vocabulary, and students preparing for exams or tests where precision of expression carries marks.',
        outcomes: [
            'Use advanced vocabulary correctly in context, not just recognise it',
            'Infer meaning from context instead of stopping at unknown words',
            'Write with precision rather than reaching for the same adjectives',
            'Read faster with better comprehension'
        ],
        structure: [
            { t: 'Sessions 1–3 — Words in context', d: 'How meaning is carried by surrounding text, and how to infer reliably.' },
            { t: 'Sessions 4–6 — Fields and families', d: 'Word roots and families, so one word unlocks ten.' },
            { t: 'Sessions 7–8 — Precision', d: 'Choosing between near-synonyms and why the choice matters.' },
            { t: 'Sessions 9–10 — Using it', d: 'Applied writing and speaking challenges under light time pressure.' }
        ],
        faqs: [
            { q: 'Is this useful for IELTS or SAT?', a: 'Yes — lexical range is directly assessed in IELTS writing and speaking, and context-based vocabulary is central to SAT Reading. It is not a substitute for a full test-prep course.' },
            { q: 'Are there word lists to memorise?', a: 'No. Memorised lists fade within weeks; words learned in context stay.' },
            { q: 'Ten sessions over how long?', a: 'About six weeks, usually twice a week.' }
        ]
    },

    15: {
        whoFor: 'Ages 12–18 who want to make art without a term of theory first. Suits both experienced drawers and people who stopped at age nine.',
        outcomes: [
            'Work confidently in several media rather than one safe one',
            'Start a piece without waiting to feel inspired',
            'Take a technique further than the demonstration',
            'Build a habit of making rather than planning'
        ],
        structure: [
            { t: 'Session 1 — Line and mark', d: 'Sketching approaches, including several that feel wrong at first.' },
            { t: 'Session 2 — Colour', d: 'Painting techniques, with permission to overdo it.' },
            { t: 'Session 3 — Mixed media', d: 'Combining materials, collage and texture.' },
            { t: 'Session 4 — Experimental', d: 'Rule-breaking work, then a group share of everything made.' }
        ],
        faqs: [
            { q: 'What materials do we need?', a: 'A basic set — pencils, paper, and cheap acrylics or watercolours. We send the exact list before session one and keep it deliberately inexpensive.' },
            { q: 'My teenager thinks they cannot draw.', a: 'Two of the four sessions are not drawing at all. This course is built for exactly that student.' },
            { q: 'Is there any critique?', a: 'Sharing, not marking. Nothing is graded.' }
        ]
    },

    16: {
        whoFor: 'Ages 10–16 who ask why constantly. Also a good fit for students who find school science abstract and need to see it happen.',
        outcomes: [
            'Run an experiment safely and record what actually happened',
            'Form a hypothesis and design a fair test of it',
            'Explain a result rather than just observing it',
            'Connect classroom science to things at home'
        ],
        structure: [
            { t: 'Session 1 — How science works', d: 'Hypothesis, variables and fair testing, using a first simple experiment.' },
            { t: 'Session 2 — Chemistry at home', d: 'Reactions with kitchen materials, and what is really happening.' },
            { t: 'Session 3 — Physics you can see', d: 'Forces, pressure and density, demonstrated rather than described.' },
            { t: 'Session 4 — Biology', d: 'Living systems, observation and growth over time.' },
            { t: 'Session 5 — Your experiment', d: 'Students design and run their own, then present the result — including failures.' }
        ],
        faqs: [
            { q: 'Are the experiments safe?', a: 'Every experiment uses household materials and is chosen to be safe with normal supervision. We list anything needing an adult present clearly in advance.' },
            { q: 'What will we need to buy?', a: 'Ordinary kitchen and bathroom items — bicarbonate of soda, vinegar, food colouring, balloons. The full list arrives before the course starts.' },
            { q: 'Does a parent need to be present?', a: 'Nearby, not sitting in. A few sessions involve liquids worth supervising.' }
        ]
    },

    17: {
        whoFor: 'Ages 6–10, particularly children who have already decided they are bad at maths. Catching that belief early is most of the value here.',
        outcomes: [
            'Do mental arithmetic using strategies instead of counting',
            'Spot number patterns and use them as shortcuts',
            'Approach an unfamiliar problem without freezing',
            'Believe that being good at maths is something you become'
        ],
        structure: [
            { t: 'Sessions 1–2 — Number sense', d: 'How numbers relate, so arithmetic stops being memory work.' },
            { t: 'Sessions 3–4 — Tricks that are actually maths', d: 'Fast mental methods, each one explained rather than just drilled.' },
            { t: 'Session 5 — Patterns and puzzles', d: 'Sequences, shapes and logic games.' },
            { t: 'Session 6 — Problem solving', d: 'Word problems attacked as puzzles rather than tests.' }
        ],
        faqs: [
            { q: 'Will this replace school maths?', a: 'No, and it is not meant to. It rebuilds the confidence and number sense that school pace often skips over.' },
            { q: 'My child gets anxious about maths. Is this suitable?', a: 'It is the main reason the course exists. There are no tests, no speed drills against the clock, and no wrong answers said out loud.' },
            { q: 'Six-year-olds and ten-year-olds together?', a: 'No — groups are set within a narrow age band, and capped at five.' }
        ]
    },

    18: {
        whoFor: 'Ages 10–14 with ideas and opinions about how things should work. No business knowledge assumed. The course ends with a real transaction, so students who want to only theorise will find it uncomfortable in a useful way.',
        outcomes: [
            'Spot a genuine problem worth solving',
            'Turn an idea into a specific product or service',
            'Work out a price and explain the reasoning',
            'Pitch to a real person and complete an actual sale'
        ],
        structure: [
            { t: 'Session 1 — Problems, not ideas', d: 'Why businesses start with someone\'s annoyance, not with a brainwave.' },
            { t: 'Session 2 — Shaping the offer', d: 'Turning a vague idea into something specific enough to sell.' },
            { t: 'Session 3 — Who is it for', d: 'Customers, and the discipline of not saying "everyone".' },
            { t: 'Session 4 — Pricing and money', d: 'Costs, price and margin at an age-appropriate level.' },
            { t: 'Session 5 — The pitch', d: 'Presenting the idea and taking hard questions.' },
            { t: 'Session 6 — Make a sale', d: 'A real, supervised first sale, then a group debrief on what happened.' }
        ],
        faqs: [
            { q: 'Does my child have to actually sell something?', a: 'Yes, and it is the point. It is small and supervised — usually to family or a school community — but it has to be real for the lesson to land.' },
            { q: 'Do we need money to start?', a: 'No. We steer students towards ideas that need effort rather than capital.' },
            { q: 'What if the idea fails?', a: 'Several do, and that session is often the most valuable of the six.' }
        ]
    },

    19: {
        whoFor: 'Ages 8–12, before money habits form. Good for children who ask for things constantly and children who never ask for anything.',
        outcomes: [
            'Explain the difference between wanting and needing something',
            'Save towards a goal and track progress',
            'Make a spending decision and live with the outcome',
            'Understand where money comes from and where it goes'
        ],
        structure: [
            { t: 'Session 1 — What money is', d: 'Earning, exchange and why anyone accepts a piece of paper.' },
            { t: 'Session 2 — Wants and needs', d: 'A distinction that sounds simple and is not.' },
            { t: 'Session 3 — Saving', d: 'Goals, patience and delayed reward.' },
            { t: 'Sessions 4–5 — The simulation', d: 'Students manage digital money through a series of decisions and see the consequences play out.' }
        ],
        faqs: [
            { q: 'Is real money involved?', a: 'Never. The simulation uses digital in-game money only.' },
            { q: 'Is this about investing?', a: 'Not at this age — it is saving, spending and decision-making. Investing appears in the 13–18 version.' },
            { q: 'Will it stop my child asking for things?', a: 'It tends to change how they ask, because they start weighing it themselves. No course fixes it entirely.' }
        ]
    },

    20: {
        whoFor: 'Ages 13–18 approaching first jobs, allowances they manage themselves, or university. Assumes basic arithmetic, not prior financial knowledge.',
        outcomes: [
            'Build a budget that survives contact with real life',
            'Explain compounding and why starting early matters more than amount',
            'Understand risk and return well enough to be sceptical',
            'Track an investment decision and evaluate it honestly'
        ],
        structure: [
            { t: 'Session 1 — Budgeting', d: 'Income, fixed costs and the gap where money disappears.' },
            { t: 'Session 2 — Compounding', d: 'The single most important idea in personal finance, shown with numbers.' },
            { t: 'Session 3 — Risk and return', d: 'Why higher returns advertise higher risk, and what that means.' },
            { t: 'Sessions 4–5 — Simulation', d: 'Students invest digital funds, track returns and defend their decisions to the group.' }
        ],
        faqs: [
            { q: 'Is this financial advice?', a: 'No, and we say so plainly in session one. It teaches how the mechanisms work; it does not recommend products or investments.' },
            { q: 'Does it involve real money or real accounts?', a: 'Neither. The simulation is entirely digital and no account is ever opened.' },
            { q: 'Is it region-specific?', a: 'The principles are universal. Where tax or account types differ by country, we say so rather than generalising.' }
        ]
    },

    21: {
        whoFor: 'Ages 8–12 who care about animals and the planet, and children who have absorbed a lot of climate anxiety without much explanation. The tone is deliberately practical rather than frightening.',
        outcomes: [
            'Explain the greenhouse effect in your own words',
            'Distinguish pollution, deforestation and climate change',
            'Name the causes of species decline and what helps',
            'Plan and carry out a small local action'
        ],
        structure: [
            { t: 'Weeks 1–2 — How the planet works', d: 'Climate, carbon and the greenhouse effect, at the right level.' },
            { t: 'Weeks 3–4 — What is going wrong', d: 'Pollution, deforestation and habitat loss, with evidence rather than alarm.' },
            { t: 'Weeks 5–6 — Wildlife', d: 'Endangered species, conservation, and what has actually worked.' },
            { t: 'Weeks 7–8 — Your action', d: 'Each student plans and runs a small real project, then reports back.' }
        ],
        faqs: [
            { q: 'Will this frighten my child?', a: 'We are careful about this. The course spends more time on what helps than on what is broken, and every unit ends with agency rather than despair.' },
            { q: 'Is it political?', a: 'It sticks to established science and to actions individuals and communities can take. It does not campaign for parties or policies.' },
            { q: 'What is the final project?', a: 'Student-chosen and small — a school recycling push, a household audit, a presentation to their class.' }
        ]
    },

    29: {
        whoFor: 'Ages 10–18, any level. A weekend-sized way to try poetry without committing to a month.',
        outcomes: [
            'Write from a prompt without stalling',
            'Use imagery deliberately',
            'Revise a draft into something finished',
            'Leave with at least one complete poem'
        ],
        structure: [
            { t: 'Day 1 — Reading and generating', d: 'Poems worth hearing, then guided writing that produces raw material.' },
            { t: 'Day 2 — Shaping and finishing', d: 'Cutting, reordering and revising into a finished piece, with a share at the end.' }
        ],
        faqs: [
            { q: 'Is two days really enough?', a: 'For one finished poem and a working method, yes. It is a taster, and we are clear about that.' },
            { q: 'Complete beginners welcome?', a: 'Yes — most attendees are.' },
            { q: 'What if we want more afterwards?', a: 'Poet\'s Corner runs over four sessions for 10–14s, and the advanced workshop for 15–20s.' }
        ]
    },

    30: {
        whoFor: 'Ages 12–18, particularly students with a Shakespeare set text coming and no appetite for it.',
        outcomes: [
            'Read Shakespearean language without panicking',
            'Follow a plot through the language rather than a summary',
            'Speak a passage aloud and make sense of it',
            'Approach a set text with a method instead of dread'
        ],
        structure: [
            { t: 'Morning — Decoding the language', d: 'Why it sounds difficult and the handful of patterns that unlock most of it.' },
            { t: 'Afternoon — Performing a scene', d: 'A scene read, staged and discussed, because Shakespeare stops being difficult when it is spoken.' }
        ],
        faqs: [
            { q: 'Which play do you use?', a: 'It varies by group, and we choose based on what attendees have coming at school. Ask when you book.' },
            { q: 'Will my child have to act?', a: 'They will read aloud. Nobody performs alone or is put on the spot.' },
            { q: 'Does this cover a school set text?', a: 'Not systematically — it teaches the approach. Tell us the text and we will weave it in where we can.' }
        ]
    },

    31: {
        whoFor: 'Ages 10–18 curious about creative writing but not ready for a five-week commitment. A good way to find out whether a longer course is worth it.',
        outcomes: [
            'Generate usable ideas on demand',
            'Structure a short story that holds together',
            'Build a character quickly',
            'Get direct feedback on a draft'
        ],
        structure: [
            { t: 'Day 1 — Ideas and structure', d: 'Prompt work to generate material, then the shape a story needs.' },
            { t: 'Day 2 — Character, voice and feedback', d: 'Developing the piece, live feedback, and a group share.' }
        ],
        faqs: [
            { q: 'How is this different from the full course?', a: 'It covers the same foundations at speed. The five-session course goes deeper and includes written feedback on a finished piece.' },
            { q: 'Mixed ages in one group?', a: 'Split into narrower bands wherever numbers allow.' },
            { q: 'Do we need to prepare anything?', a: 'No. Turn up with something to write with.' }
        ]
    },

    /* ======================= ACADEMICS ======================= */

    22: {
        whoFor: 'Students in the two years before IGCSE examinations, on any major international board. Suits students aiming to move up a grade band and students who understand the content but keep losing marks in the paper.',
        outcomes: [
            'Cover the full specification for your subject and board',
            'Answer to the mark scheme rather than to your own understanding',
            'Recognise what each command word is asking for',
            'Sit a full paper in time and know where your marks went'
        ],
        structure: [
            { t: 'Stage 1 — Diagnostic', d: 'A topic-wise assessment before any teaching, so we know precisely where marks are being lost rather than guessing.' },
            { t: 'Stage 2 — Concept rebuild', d: 'The topics the diagnostic flagged, taught properly. Technique layered on a shaky concept collapses under exam pressure.' },
            { t: 'Stage 3 — Past-paper cycles', d: 'Full papers against the real mark scheme, with command-word training and model answers.' },
            { t: 'Stage 4 — Timed mocks', d: 'Exam-condition practice with performance tracked topic by topic through the final weeks.' }
        ],
        faqs: [
            { q: 'Which exam boards do you cover?', a: 'The major international boards. Tell us your board and syllabus code when you enquire and we will confirm before you commit to anything.' },
            { q: 'How many subjects can we take?', a: 'As many as the timetable allows. Most students take two or three with us and handle the rest at school.' },
            { q: 'When should we start?', a: 'Four to six months before the exam session is comfortable. Later is possible, and we will tell you honestly what is achievable in the time left.' },
            { q: 'Group or one-to-one?', a: 'Groups of three to five suit most students and add useful discussion. One-to-one is better if you are starting late or have very specific gaps. We recommend after the diagnostic rather than by default.' }
        ]
    },

    23: {
        whoFor: 'Students applying to universities abroad who need a specific band, typically 6.5 to 7.5. Suits candidates who speak English well but lose marks on task response and structure — which is most of them.',
        outcomes: [
            'Know your current band across all four modules from a real diagnostic',
            'Structure Task 1 and Task 2 responses to the band descriptors',
            'Handle the Reading paper within the time limit',
            'Speak fluently under Part 3 pressure without drying up'
        ],
        structure: [
            { t: 'Stage 1 — Diagnostic', d: 'A full assessment across Listening, Reading, Writing and Speaking to establish your genuine starting band.' },
            { t: 'Stage 2 — Target the gap', d: 'Time goes to the modules holding your overall score down, not evenly across all four.' },
            { t: 'Stage 3 — Writing feedback', d: 'Detailed written feedback on Task 1 and Task 2 against the band descriptors, repeatedly, because writing is where most candidates stall.' },
            { t: 'Stage 4 — Timed practice and speaking mocks', d: 'Exam-condition papers and speaking mocks run the way an examiner would.' }
        ],
        faqs: [
            { q: 'How long does IELTS preparation take?', a: 'Three to four weeks if you are within half a band of your target. Two to three months if you need a full band or more. The diagnostic tells us which you are.' },
            { q: 'Academic or General — which do I need?', a: 'Academic for university study. General Training for migration, work and most PR applications. Check your specific institution\'s requirement, and ask us if it is unclear.' },
            { q: 'Can you guarantee a band score?', a: 'No, and be wary of anyone who does. We will tell you after the diagnostic what is realistic in your timeframe.' },
            { q: 'Do you help with the booking?', a: 'We can point you at the right test centre and date, but you book the test yourself through the official provider.' }
        ]
    },

    24: {
        whoFor: 'Adults preparing for migration, work or permanent residency applications. Different from Academic in reading material and in the Task 1 letter, which catches out candidates who prepared with the wrong materials.',
        outcomes: [
            'Write formal, semi-formal and informal letters to the band descriptors',
            'Handle everyday-English reading passages at speed',
            'Structure a Task 2 essay under time pressure',
            'Reach the band your application actually requires'
        ],
        structure: [
            { t: 'Stage 1 — Diagnostic', d: 'Full assessment across all four modules to find your starting band.' },
            { t: 'Stage 2 — Letter writing', d: 'The Task 1 letter in all three registers — the single biggest difference from Academic.' },
            { t: 'Stage 3 — Reading strategy', d: 'Notices, adverts and workplace documents, which trip up candidates who trained on academic texts.' },
            { t: 'Stage 4 — Timed practice', d: 'Full papers under exam conditions with feedback after each.' }
        ],
        faqs: [
            { q: 'Which band do I need?', a: 'It depends entirely on the immigration programme or employer. Check the official requirement first — we will build the plan around that number.' },
            { q: 'Is General easier than Academic?', a: 'The reading is more everyday, but the writing is not easier — the letter task has its own conventions that cost marks if you improvise.' },
            { q: 'Can I study alongside full-time work?', a: 'Most candidates do. Evening and weekend slots are available, and we set the pace around your schedule.' }
        ]
    },

    25: {
        whoFor: 'Students aged 15–18 applying to universities that ask for the SAT. Built as a full four-month programme rather than a crash course, because sustained practice is what moves SAT scores.',
        outcomes: [
            'Work through both Reading & Writing and Math with a consistent method',
            'Apply test-taking strategy under real time pressure',
            'Close your specific weak areas rather than revising everything',
            'Track your score across repeated full-length mocks'
        ],
        structure: [
            { t: 'Month 1 — Baseline and fundamentals', d: 'A full diagnostic mock, then the content gaps it exposes. Three sessions a week from the start.' },
            { t: 'Month 2 — Section technique', d: 'Reading & Writing method and Math approaches, each drilled to the point of habit.' },
            { t: 'Month 3 — Timed practice', d: 'Sectional work against the clock, with error logs kept by question type.' },
            { t: 'Month 4 — Full mocks', d: 'Complete papers under exam conditions, reviewed question by question, with pace as the final variable.' }
        ],
        faqs: [
            { q: 'How many sessions is the programme?', a: 'Around 48 — three a week for four months.' },
            { q: 'How much can a score realistically improve?', a: 'It depends heavily on your baseline and the work you put in between sessions. We will give you an honest range after the diagnostic mock rather than a number now.' },
            { q: 'Is this the digital SAT?', a: 'Yes, the current digital format, including its adaptive structure.' },
            { q: 'Can I join partway through?', a: 'Sometimes, if a group is at a stage that suits you. Per-session attendance is also available if the full programme does not fit.' }
        ]
    },

    26: {
        whoFor: 'Complete beginners and near-beginners of any age, including adults. The right starting point if English feels like a wall rather than a subject.',
        outcomes: [
            'Build correct sentences in the present, past and future',
            'Hold a basic everyday conversation without freezing',
            'Understand and use high-frequency vocabulary',
            'Read and write short practical texts'
        ],
        structure: [
            { t: 'Sessions 1–3 — Foundations', d: 'Sentence structure, present tense and the words you use most days.' },
            { t: 'Sessions 4–6 — Past and future', d: 'Talking about what happened and what will happen.' },
            { t: 'Sessions 7–8 — Everyday situations', d: 'Practical conversation — shops, directions, introductions.' },
            { t: 'Sessions 9–10 — Putting it together', d: 'Extended speaking and short writing, with a progress check.' }
        ],
        faqs: [
            { q: 'Do you teach in English only?', a: 'Mostly, but the teacher can explain in Urdu when something is not landing. Immersion should not mean confusion.' },
            { q: 'Is this suitable for adults?', a: 'Yes — a good share of this group are adults, and the material is chosen so it does not feel childish.' },
            { q: 'What level does it reach?', a: 'Roughly A2 by the end. Intermediate picks up from there.' }
        ]
    },

    27: {
        whoFor: 'Learners who understand English but hesitate to use it. The most common profile is someone who reads and listens well, then stalls when asked to speak or write.',
        outcomes: [
            'Speak at length without rehearsing every sentence first',
            'Use tenses accurately in connected speech, not just in exercises',
            'Link ideas with appropriate connectors',
            'Write structured paragraphs with a clear argument'
        ],
        structure: [
            { t: 'Sessions 1–3 — Accuracy and fluency together', d: 'Tense control in real speech rather than gap-fills.' },
            { t: 'Sessions 4–6 — Linking ideas', d: 'Connectors, register and building longer turns.' },
            { t: 'Sessions 7–8 — Writing', d: 'Paragraph structure, argument and clarity.' },
            { t: 'Sessions 9–10 — Extended practice', d: 'Discussion, presentation and a final written piece with feedback.' }
        ],
        faqs: [
            { q: 'Will this prepare me for IELTS?', a: 'It builds the underlying language, which helps. It does not teach the test format — that is what the IELTS courses are for, and they work best on top of B1–B2 English.' },
            { q: 'How much speaking is there?', a: 'A great deal. Groups are capped at five specifically so everyone speaks in every session.' },
            { q: 'How do I know this is my level?', a: 'A short placement conversation before you start. We will move you if it is wrong.' }
        ]
    },

    28: {
        whoFor: 'Advanced learners aiming at academic or professional English — university study, professional settings, or anyone whose English is fluent but not yet precise.',
        outcomes: [
            'Control tone and register deliberately across contexts',
            'Use advanced structures accurately in writing and speech',
            'Write formal and academic prose with a clear line of argument',
            'Present and discuss complex ideas confidently'
        ],
        structure: [
            { t: 'Sessions 1–2 — Register and nuance', d: 'How small choices change how you are read.' },
            { t: 'Sessions 3–4 — Advanced structures', d: 'The constructions that separate fluent from precise.' },
            { t: 'Sessions 5–6 — Academic writing', d: 'Argument, evidence and formal conventions.' },
            { t: 'Sessions 7–8 — Presenting', d: 'Extended speaking, discussion and defending a position.' }
        ],
        faqs: [
            { q: 'Is this useful for university abroad?', a: 'Directly — academic register and structured argument are exactly what first-year writing demands, and they are rarely taught explicitly.' },
            { q: 'What level should I be starting at?', a: 'Comfortably B2 or above. We check with a short placement conversation first.' },
            { q: 'Is this the same as an IELTS course?', a: 'No. This builds the language; an IELTS course teaches the exam. Many students do this first, then test prep.' }
        ]
    },

    32: {
        whoFor: 'Students aged 16 and over, university applicants and early-career professionals. Anyone whose emails get ignored, or who rewrites a three-line message six times before sending.',
        outcomes: [
            'Structure an email so the reader knows what to do in ten seconds',
            'Match tone to the relationship without being stiff or too casual',
            'Write subject lines that get opened',
            'Follow up without being annoying'
        ],
        structure: [
            { t: 'Day 1 — Structure and tone', d: 'The shape of an email that gets answered, subject lines, and reading the register of the person you are writing to.' },
            { t: 'Day 2 — Difficult emails and follow-ups', d: 'Chasing, apologising, declining and negotiating — plus reusable templates you leave with.' }
        ],
        faqs: [
            { q: 'Is this only for business?', a: 'No. University applications, tutor emails and internship enquiries are covered, and they are what most attendees need it for.' },
            { q: 'Do we get templates?', a: 'Yes — a set you can adapt, for the situations that come up most.' },
            { q: 'Is my English good enough?', a: 'If you can write a clear paragraph, yes. This is about structure and tone, not grammar repair.' }
        ]
    }
};

if (typeof window !== 'undefined') window.courseContent = courseContent;
