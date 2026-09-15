/* ============================================================
   Learning Bubble — Shared Course Data
   ------------------------------------------------------------
   Two branches:
     • kids      → Learning Bubble for Kids   (creative / exploratory)
     • academics → Learning Bubble Academics  (exam-focused)

   NOTE: pricing has been intentionally removed site-wide.
   Fees are discussed 1-to-1 on WhatsApp after enquiry.
   ============================================================ */

const BRANCHES = {
    kids: {
        id: 'kids',
        name: 'Learning Bubble for Kids',
        short: 'For Kids',
        tagline: 'Curiosity-led courses for ages 6–18',
        blurb: 'Playful, project-first courses in storytelling, coding, art, writing and logic — built to make children fall in love with learning.',
        home: 'kids.html',
        icon: 'fa-rocket',
        emoji: '🚀',
        ctaLabel: 'Explore Kids Courses'
    },
    academics: {
        id: 'academics',
        name: 'Learning Bubble Academics',
        short: 'Academics',
        tagline: 'IGCSE · A-Levels · IELTS · SAT',
        blurb: 'Structured, exam-focused tuition with small groups, past-paper drilling and measurable progress towards your target grade.',
        home: 'academics.html',
        icon: 'fa-graduation-cap',
        emoji: '🎓',
        ctaLabel: 'Explore Academics'
    }
};

/* ------------------------------------------------------------
   Categories — each belongs to exactly one branch.
   ------------------------------------------------------------ */
const categoriesData = [
    // ---------- KIDS ----------
    {
        name: 'Literature, History & Storytelling',
        branch: 'kids',
        short: 'Stories & History',
        icon: 'fa-book-open',
        image: 'assets/images/categories/literatureHistoryAndStorytelling.jpeg',
        blurb: 'Mysteries, myths and real historical detective work that make the past impossible to put down.'
    },
    {
        name: 'Technology & Coding',
        branch: 'kids',
        short: 'Tech & Coding',
        icon: 'fa-code',
        image: 'assets/images/categories/technologyAndCoding.jpeg',
        blurb: 'From first lines of code to AI literacy, Python and design tools — technology as a creative material.'
    },
    {
        name: 'Creative Writing & Literature Development',
        branch: 'kids',
        short: 'Creative Writing',
        icon: 'fa-feather-pointed',
        image: 'assets/images/categories/creativeWritingLiterature.jpeg',
        blurb: 'Poetry, short fiction and vocabulary work that help young writers find a voice worth reading.'
    },
    {
        name: 'Arts & Creativity',
        branch: 'kids',
        short: 'Arts & Science',
        icon: 'fa-palette',
        image: 'assets/images/categories/artsCreativity.jpeg',
        blurb: 'Hands-on art, experiments and making — where the answer is never just one right answer.'
    },
    {
        name: 'Math, Logic & Skills',
        branch: 'kids',
        short: 'Math & Logic',
        icon: 'fa-puzzle-piece',
        image: 'assets/images/categories/Math, Logic & Skills.jpeg',
        blurb: 'Mental maths, money sense, enterprise and climate thinking — life skills disguised as games.'
    },
    {
        name: 'Workshops',
        branch: 'kids',
        short: 'Short Workshops',
        icon: 'fa-bolt',
        image: 'assets/images/categories/workshopCollection.png',
        blurb: 'One and two-day intensives — a fast, low-commitment way to try something new.'
    },

    // ---------- ACADEMICS ----------
    {
        name: 'IGCSE Academics',
        branch: 'academics',
        short: 'IGCSE',
        icon: 'fa-flask',
        image: 'assets/images/categories/IGCSE Academics.jpeg',
        blurb: 'Concept clarity, past papers and exam technique across the full IGCSE subject list.'
    },
    {
        name: 'A-Level Academics',
        branch: 'academics',
        short: 'A-Levels',
        icon: 'fa-square-root-variable',
        image: null,
        blurb: 'AS and A2 support built around specification mastery, structured answers and mark-scheme fluency.'
    },
    {
        name: 'Test Preparation',
        branch: 'academics',
        short: 'Test Prep',
        icon: 'fa-bullseye',
        image: 'assets/images/categories/testPreparation.png',
        blurb: 'IELTS and SAT programmes with diagnostics, timed practice and targeted weak-area work.'
    },
    {
        name: 'English Language',
        branch: 'academics',
        short: 'English Language',
        icon: 'fa-comments',
        image: 'assets/images/categories/englishLangCourses.jpeg',
        blurb: 'Graded proficiency courses that build grammar, fluency and confident academic English.'
    },
    {
        name: 'Professional Skills',
        branch: 'academics',
        short: 'Professional',
        icon: 'fa-briefcase',
        image: 'assets/images/categories/workshopCollection.png',
        blurb: 'Short, practical courses in the communication skills university and workplaces actually ask for.'
    }
];

/* ------------------------------------------------------------
   Courses
   ------------------------------------------------------------ */
const coursesData = [

    /* ========== KIDS · Literature, History & Storytelling ========== */
    {
        id: 1, branch: 'kids', name: 'The World of Sherlock Holmes',
        category: 'Literature, History & Storytelling',
        duration: '4 sessions · 1 month', ages: '12–16', level: 'Beginner', format: 'Live online · small group',
        image: 'assets/images/courses/course-1.jpg', icon: 'fa-magnifying-glass',
        tagline: 'Read the clues. Name the culprit. Think like a detective.',
        about: 'Step into the world of mystery, logic and deduction through one of literature’s most iconic detectives. Students read and explore Sherlock Holmes cases, analyze clues, debate suspects and work together to solve mysteries. Through guided discussion and problem-solving activities, learners develop sharp observation skills, logical reasoning and attention to detail — learning to see the world through Holmes’ analytical lens.',
        highlights: ['Close-reading of original Conan Doyle cases', 'Deduction and evidence-mapping activities', 'Group case-solving with guided debate', 'Builds observation and logical reasoning']
    },
    {
        id: 2, branch: 'kids', name: 'History Mystery',
        category: 'Literature, History & Storytelling',
        duration: '6 sessions · 1.5 months', ages: '12–16', level: 'Intermediate', format: 'Live online · small group',
        image: 'assets/images/courses/course-2.jpg', icon: 'fa-landmark',
        tagline: 'History without the memorising — just the good parts.',
        about: 'History comes alive through storytelling, investigation and inquiry. This course takes students through ancient civilisations, major historical events and lesser-known stories that shaped the modern world. Rather than memorising dates, students explore why things happened, how societies evolved, and how the past still shapes the present — developing genuine historical thinking.',
        highlights: ['Inquiry-led rather than date-led', 'Primary-source investigation', 'Connects past events to present-day life', 'Builds argument and evidence skills']
    },
    {
        id: 3, branch: 'kids', name: 'Tales and Telling',
        category: 'Literature, History & Storytelling',
        duration: '4 sessions · 1 month', ages: '8–14', level: 'Beginner', format: 'Live online · small group',
        image: 'assets/images/courses/course-3.jpg', icon: 'fa-book',
        tagline: 'Learn to hold a room with nothing but a story.',
        about: 'Students learn the art of storytelling through classic and contemporary stories. The course focuses on understanding plot, character and sequence, while teaching students how to summarise a story without losing what matters. Learners also practise oral storytelling, helping them express ideas clearly, confidently and creatively.',
        highlights: ['Plot, character and sequence fundamentals', 'Summarising without losing meaning', 'Live oral storytelling practice', 'Confidence in front of an audience']
    },

    /* ========== KIDS · Technology & Coding ========== */
    {
        id: 4, branch: 'kids', name: 'Artificial Intelligence for Kids',
        category: 'Technology & Coding',
        duration: '8 sessions · 1.5 months', ages: '12–16', level: 'Beginner', format: 'Live online · small group',
        image: 'assets/images/courses/course-4.jpg', icon: 'fa-robot',
        tagline: 'Understand AI properly — then use it responsibly.',
        about: 'This course introduces students to artificial intelligence in a clear, age-appropriate and responsible way. Learners explore how AI shows up in everyday life, how AI tools actually work, and how to interact with them safely and ethically. Students experiment with building simple AI bots, understand data basics, and learn to use AI as a tool for learning and creativity — alongside real digital-safety habits.',
        highlights: ['How AI systems actually work, explained simply', 'Build your own simple AI bot', 'Data literacy and bias basics', 'Online safety and digital responsibility']
    },
    {
        id: 5, branch: 'kids', name: 'Fun with Coding',
        category: 'Technology & Coding',
        duration: '5 sessions · 1 month', ages: '10–16', level: 'Beginner', format: 'Live online · small group',
        image: 'assets/images/courses/course-5.jpg', icon: 'fa-gamepad',
        tagline: 'First code, first game, first "I made that".',
        about: 'A playful, beginner-friendly introduction to coding using Small Basic. Students learn fundamental programming concepts through drawing, painting, animation and simple games. The course builds logical thinking, creativity and confidence with technology — perfect for young learners taking their first steps into code.',
        highlights: ['No prior experience needed', 'Learn through drawing, animation and games', 'Loops, variables and logic made visual', 'Finish with projects you can show off']
    },
    {
        id: 6, branch: 'kids', name: 'Learn Python',
        category: 'Technology & Coding',
        duration: '6 sessions · 1.5 months', ages: '12–18', level: 'Intermediate', format: 'Live online · small group',
        image: 'assets/images/courses/course-6.jpg', icon: 'fa-terminal',
        tagline: 'The language real developers and data scientists use.',
        about: 'Designed for students ready to move beyond block-based coding, this course introduces Python from the ground up. Learners cover programming fundamentals, then gradually work with data organisation, basic analysis and simple visualisations using tools like pandas and matplotlib. The focus is a strong foundation that prepares students for advanced coding and future tech learning.',
        highlights: ['Python fundamentals from zero', 'Working with real data using pandas', 'Charts and visualisation with matplotlib', 'A launchpad into serious programming']
    },
    {
        id: 7, branch: 'kids', name: 'Graphic Design with Canva & Illustrator',
        category: 'Technology & Coding',
        duration: '6 sessions · 2 months', ages: '10–16', level: 'Beginner', format: 'Live online · small group',
        image: 'assets/images/courses/course-7.jpg', icon: 'fa-pen-nib',
        tagline: 'Make things that actually look designed.',
        about: 'An introduction to digital design for young creators. Students learn design fundamentals — layout, colour, hierarchy and typography — while working hands-on in Canva and Illustrator. The course emphasises creativity, visual communication and practical skills through real project briefs.',
        highlights: ['Layout, colour and typography fundamentals', 'Hands-on Canva and Illustrator work', 'Real design briefs, not just exercises', 'Build a small personal portfolio']
    },
    {
        id: 8, branch: 'kids', name: 'MS Office for Kids',
        category: 'Technology & Coding',
        duration: '7 sessions · 1.5 months', ages: '10–16', level: 'Beginner', format: 'Live online · small group',
        image: 'assets/images/courses/course-8.jpg', icon: 'fa-file-lines',
        tagline: 'The tools every school project quietly depends on.',
        about: 'A practical course introducing students to essential digital tools — Microsoft Word, PowerPoint and Excel. Learners get hands-on experience creating documents, presentations and simple spreadsheets while understanding the real-world purpose and correct use of each tool, building skills for school and well beyond.',
        highlights: ['Word: proper document structure', 'PowerPoint: presentations that hold attention', 'Excel: formulas, tables and simple charts', 'Skills that pay off in every subject']
    },

    /* ========== KIDS · Creative Writing & Literature Development ========== */
    {
        id: 9, branch: 'kids', name: "Poet's Corner",
        category: 'Creative Writing & Literature Development',
        duration: '4 sessions · 1 month', ages: '10–14', level: 'Beginner', format: 'Live online · small group',
        image: 'assets/images/courses/course-9.jpg', icon: 'fa-feather',
        tagline: 'Where young writers discover what words can do.',
        about: 'A creative space for young poets to discover the beauty of words. Students explore poetry from the past and present, learn to read and recite with confidence, and are introduced to poetic devices and core writing techniques. Through guided practice, students begin crafting their own poems while developing expression, rhythm and voice.',
        highlights: ['Read and recite with confidence', 'Poetic devices, taught through examples', 'Write and revise your own poems', 'Small, supportive workshop setting']
    },
    {
        id: 10, branch: 'kids', name: "Poet's Corner — Advanced",
        category: 'Creative Writing & Literature Development',
        duration: '6 sessions · 1 month', ages: '15–20', level: 'Advanced', format: 'Live online · workshop',
        image: 'assets/images/courses/course-10.jpg', icon: 'fa-feather-pointed',
        tagline: 'A real writing workshop, led by a working poet.',
        about: 'Designed for teens and young adults with prior exposure to poetry, this advanced course is led by a writer and poet who guides participants through drafting, refining and polishing their own work. Students receive constructive feedback, explore advanced technique, and develop a deeper personal voice in a supportive workshop environment.',
        highlights: ['Led by a practising writer/poet', 'Full draft → critique → revision cycle', 'Advanced form and technique', 'Develop a distinct personal voice']
    },
    {
        id: 11, branch: 'kids', name: 'Creative Writing — Ages 8–10',
        category: 'Creative Writing & Literature Development',
        duration: '5 sessions · 1 month', ages: '8–10', level: 'Beginner', format: 'Live online · small group',
        image: 'assets/images/courses/course-11.jpg', icon: 'fa-pencil',
        tagline: 'Where the blank page stops being scary.',
        about: 'A beginner-friendly course that sparks imagination and builds confidence in writing. Students explore short stories, descriptive writing and simple narratives through fun prompts and activities, developing a genuine love for writing while strengthening core language skills.',
        highlights: ['Playful prompts that unlock ideas', 'Descriptive writing made concrete', 'Short stories from start to finish', 'Confidence before correctness']
    },
    {
        id: 12, branch: 'kids', name: 'Creative Writing — Ages 11–14',
        category: 'Creative Writing & Literature Development',
        duration: '5 sessions · 1 month', ages: '11–14', level: 'Intermediate', format: 'Live online · small group',
        image: 'assets/images/courses/course-12.jpg', icon: 'fa-pen-fancy',
        tagline: 'Real storytelling craft for the middle years.',
        about: 'This course focuses on developing stronger storytelling skills. Students learn plot structure, character development, dialogue and descriptive language, while experimenting with different writing styles and genres to find what suits them.',
        highlights: ['Plot structure that actually holds up', 'Characters readers care about', 'Writing believable dialogue', 'Try multiple genres and styles']
    },
    {
        id: 13, branch: 'kids', name: 'Creative Writing — Ages 15–18',
        category: 'Creative Writing & Literature Development',
        duration: '5 sessions · 1 month', ages: '15–18', level: 'Advanced', format: 'Live online · workshop',
        image: 'assets/images/courses/course-13.jpg', icon: 'fa-scroll',
        tagline: 'Refine the voice you already have.',
        about: 'An advanced creative writing course for teens ready to refine their voice. Students explore personal style, advanced narrative technique and multi-genre writing, while receiving guided feedback to improve clarity, depth and expression.',
        highlights: ['Advanced narrative technique', 'Individual written feedback', 'Multi-genre experimentation', 'Portfolio-ready finished pieces']
    },
    {
        id: 14, branch: 'kids', name: 'Vocabulary Quest',
        category: 'Creative Writing & Literature Development',
        duration: '10 sessions · 1.5 months', ages: '14–18', level: 'Intermediate', format: 'Live online · small group',
        image: 'assets/images/courses/course-14.jpg', icon: 'fa-spell-check',
        tagline: 'A bigger vocabulary, without the flashcard grind.',
        about: 'A dynamic course designed to strengthen vocabulary, comprehension and expression. Students learn advanced, context-based words through games, challenges and real-life usage — helping them speak and write with clarity and confidence.',
        highlights: ['Words learned in context, not in lists', 'Game and challenge-based sessions', 'Direct payoff for essays and exams', 'Comprehension and expression together']
    },

    /* ========== KIDS · Arts & Creativity ========== */
    {
        id: 15, branch: 'kids', name: 'Art Rebels',
        category: 'Arts & Creativity',
        duration: '4 sessions · 1 month', ages: '12–18', level: 'All levels', format: 'Live online · studio style',
        image: 'assets/images/courses/course-15.jpg', icon: 'fa-paintbrush',
        tagline: 'New style every session. No theory lectures.',
        about: 'A bold and expressive art course for young creatives. Each session introduces a new style or technique — sketching, painting, mixed media, experimental art — without heavy theory. Students are encouraged to explore, experiment and express freely, building confidence and creative independence.',
        highlights: ['A different technique every session', 'Sketching, painting, mixed media', 'Experiment-first, theory-light', 'Builds real creative independence']
    },
    {
        id: 16, branch: 'kids', name: 'Bubbles & Beakers Science Club',
        category: 'Arts & Creativity',
        duration: '5 sessions · 1 month', ages: '10–16', level: 'Beginner', format: 'Live online · at-home experiments',
        image: 'assets/images/courses/course-16.jpg', icon: 'fa-flask-vial',
        tagline: 'Real experiments, everyday materials, zero boredom.',
        about: 'A hands-on science course designed to spark curiosity and wonder. Students perform safe, exciting experiments at home using everyday materials, learning scientific concepts through direct observation. The course encourages questioning, experimentation and critical thinking while connecting science to the world around them.',
        highlights: ['Safe experiments with household materials', 'Learn by observing, not memorising', 'Builds the scientific method naturally', 'Curiosity-driven and question-led']
    },

    /* ========== KIDS · Math, Logic & Skills ========== */
    {
        id: 17, branch: 'kids', name: 'Math Magic!',
        category: 'Math, Logic & Skills',
        duration: '6 sessions · 2 months', ages: '6–10', level: 'Beginner', format: 'Live online · small group',
        image: 'assets/images/courses/course-17.jpg', icon: 'fa-calculator',
        tagline: 'The tricks that make hard sums look easy.',
        about: 'This course turns maths into something genuinely enjoyable. Students learn clever strategies, patterns and problem-solving techniques that make even complex questions approachable. Through puzzles, challenges and interactive activities, learners build confidence, speed and logical thinking — discovering that maths can be fun.',
        highlights: ['Mental-maths strategies and shortcuts', 'Pattern spotting and number sense', 'Puzzle and challenge based', 'Kills maths anxiety early']
    },
    {
        id: 18, branch: 'kids', name: 'Young Entrepreneurs',
        category: 'Math, Logic & Skills',
        duration: '6 sessions · 1.5 months', ages: '10–14', level: 'Beginner', format: 'Live online · project based',
        image: 'assets/images/courses/course-18.jpg', icon: 'fa-lightbulb',
        tagline: 'Have an idea? Take it all the way to a real sale.',
        about: 'Designed for children with big ideas, this course introduces the fundamentals of entrepreneurship in a practical, engaging way. Students learn to spot opportunities, understand basic business concepts and develop a product or service idea. With guided support, learners go through the process of making a real sale — gaining confidence, creativity and real-world problem-solving skills.',
        highlights: ['Spot a real opportunity', 'Build a product or service idea', 'Pricing, pitching and customers', 'Complete an actual first sale']
    },
    {
        id: 19, branch: 'kids', name: 'Financial Literacy — Ages 8–12',
        category: 'Math, Logic & Skills',
        duration: '5 sessions · 1 month', ages: '8–12', level: 'Beginner', format: 'Live online · simulation',
        image: 'assets/images/courses/course-19.jpg', icon: 'fa-piggy-bank',
        tagline: 'Money sense, learned before it matters.',
        about: 'Students learn the basics of saving, spending and understanding money in everyday life. Through activities and a guided simulation, learners make financial decisions using digital in-game money and see the real outcomes of their choices — building early financial awareness and responsibility.',
        highlights: ['Saving vs spending, made concrete', 'Guided in-game money simulation', 'See consequences of real decisions', 'Early financial responsibility']
    },
    {
        id: 20, branch: 'kids', name: 'Financial Literacy — Ages 13–18',
        category: 'Math, Logic & Skills',
        duration: '5 sessions · 1 month', ages: '13–18', level: 'Intermediate', format: 'Live online · simulation',
        image: 'assets/images/courses/course-20.jpg', icon: 'fa-chart-line',
        tagline: 'Budgeting, investing and how money actually grows.',
        about: 'An advanced course focused on budgeting, saving, investing and understanding how money grows over time. Students take part in a realistic financial simulation where they invest digital funds and track returns based on their own decision-making, helping them develop long-term financial thinking.',
        highlights: ['Budgeting that survives real life', 'How compounding and returns work', 'Realistic investment simulation', 'Long-term financial thinking']
    },
    {
        id: 21, branch: 'kids', name: 'Become a Climate Activist',
        category: 'Math, Logic & Skills',
        duration: '2 months', ages: '8–12', level: 'Beginner', format: 'Live online · discussion & worksheets',
        image: 'assets/images/courses/course-21.jpg', icon: 'fa-leaf',
        tagline: 'Understand the planet — then do something about it.',
        about: 'This course introduces students to environmental awareness and responsibility. Learners explore carbon emissions, pollution, deforestation, wildlife conservation, endangered species and planetary safety. Through books, resources, discussion and worksheets, students build knowledge — and the mindset to protect the planet.',
        highlights: ['Climate science at the right level', 'Conservation and biodiversity', 'Discussion-led, not doom-led', 'Ends with a personal action project']
    },

    /* ========== KIDS · Workshops ========== */
    {
        id: 29, branch: 'kids', name: 'Poetry Writing Workshop',
        category: 'Workshops',
        duration: '2 days', ages: '10–18', level: 'All levels', format: 'Live online · intensive',
        image: 'assets/images/courses/course-29.jpg', icon: 'fa-feather',
        tagline: 'Two days. One finished poem you are proud of.',
        about: 'A short, focused intensive for anyone curious about poetry. Over two days students explore form and imagery, write under gentle guidance, and leave with at least one finished, polished poem.',
        highlights: ['Two-day intensive format', 'Imagery, rhythm and form', 'Guided writing time', 'Leave with finished work']
    },
    {
        id: 30, branch: 'kids', name: 'Explore Shakespeare',
        category: 'Workshops',
        duration: '1 day', ages: '12–18', level: 'All levels', format: 'Live online · intensive',
        image: 'assets/images/courses/course-30.jpg', icon: 'fa-masks-theater',
        tagline: 'Shakespeare, finally in a language you speak.',
        about: 'A single-day workshop that makes Shakespeare approachable. Students explore language, character and plot through performance and discussion, coming away with the confidence to read a play without fear.',
        highlights: ['One-day, low-commitment', 'Language decoded, not translated away', 'Performance and discussion based', 'Great prep for school set texts']
    },
    {
        id: 31, branch: 'kids', name: 'Creative Writing Workshop',
        category: 'Workshops',
        duration: '2 days', ages: '10–18', level: 'All levels', format: 'Live online · intensive',
        image: 'assets/images/courses/course-31.jpg', icon: 'fa-pen-clip',
        tagline: 'A fast, generous jump-start for new writers.',
        about: 'A two-day intensive covering the essentials of story: idea generation, structure, character and voice. Ideal for students who want to try creative writing before committing to a longer course.',
        highlights: ['Idea generation that works on demand', 'Structure and character basics', 'Live feedback on your draft', 'Perfect taster before a full course']
    },

    /* ========== ACADEMICS · IGCSE ========== */
    {
        id: 22, branch: 'academics', name: 'IGCSE Academics',
        category: 'IGCSE Academics',
        duration: '8–12 sessions per month', ages: 'Grades 9–11', level: 'IGCSE / O-Level', format: 'Small group (3–5) or 1-to-1',
        image: 'assets/images/courses/course-22.jpg', icon: 'fa-flask',
        tagline: 'Concept clarity, past papers, exam readiness.',
        about: 'Structured IGCSE tuition built around three things that actually move grades: genuine concept clarity, relentless past-paper practice and exam technique. Sessions run in small groups of 3–5 students or one-to-one, with pacing matched to your school syllabus and exam session.',
        subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'English', 'Islamiat', 'Pakistan Studies', 'Accounting', 'Economics', 'Business Studies'],
        highlights: ['Groups capped at 3–5 students', 'Full past-paper and mark-scheme drilling', 'Topic-wise diagnostics to find gaps', 'Flexible 1-to-1 option available']
    },

    /* ========== ACADEMICS · A-Levels ========== */
    {
        id: 33, branch: 'academics', name: 'A-Level Academics',
        category: 'A-Level Academics',
        duration: '8–12 sessions per month', ages: 'AS & A2',
        level: 'A-Level', format: 'Small group (3–5) or 1-to-1',
        image: null, icon: 'fa-square-root-variable',
        tagline: 'AS and A2 support built for the mark scheme.',
        about: 'A-Level tuition focused on specification mastery and structured answering. We work through the syllabus in order, then move into full past-paper cycles — teaching students not just the content but exactly how examiners award marks. Available as small-group or one-to-one, across AS and A2.',
        subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Further Mathematics', 'Economics', 'Business', 'Accounting', 'English Literature'],
        highlights: ['Specification-mapped lesson sequence', 'Mark-scheme and command-word training', 'Structured long-answer technique', 'AS and A2 covered']
    },

    /* ========== ACADEMICS · Test Preparation ========== */
    {
        id: 23, branch: 'academics', name: 'IELTS Academic',
        category: 'Test Preparation',
        duration: 'Flexible · hourly or module based', ages: '15+', level: 'Band 6.0 → 8.0+', format: '1-to-1 or group of 3–5',
        image: 'assets/images/courses/course-23.jpg', icon: 'fa-bullseye',
        tagline: 'For university applications and study abroad.',
        about: 'Full IELTS Academic preparation across all four modules — Listening, Reading, Writing and Speaking. Starts with a diagnostic to establish your current band, then targets the specific modules holding your score back, using timed practice and detailed written feedback on Task 1 and Task 2.',
        subjects: ['Listening', 'Reading', 'Academic Writing Task 1 & 2', 'Speaking'],
        highlights: ['Diagnostic band assessment first', 'Detailed Writing Task 1 & 2 feedback', 'Timed, exam-condition practice', 'Speaking mocks with an examiner mindset']
    },
    {
        id: 24, branch: 'academics', name: 'IELTS General Training',
        category: 'Test Preparation',
        duration: 'Flexible · hourly or module based', ages: '16+', level: 'Band 5.5 → 8.0+', format: '1-to-1 or group of 3–5',
        image: 'assets/images/courses/course-24.jpg', icon: 'fa-passport',
        tagline: 'For migration, work and PR applications.',
        about: 'IELTS General Training preparation aimed at migration and work applications. Covers all four modules with particular focus on General Writing letter tasks and the everyday-English reading passages that catch candidates out. Runs one-to-one or in small groups.',
        subjects: ['Listening', 'General Reading', 'General Writing Task 1 & 2', 'Speaking'],
        highlights: ['Letter-writing task specialisation', 'Everyday-English reading strategy', 'Band-targeted study plan', 'Small groups or 1-to-1']
    },
    {
        id: 25, branch: 'academics', name: 'SAT Preparation',
        category: 'Test Preparation',
        duration: '4 months · 3 sessions per week (~48 sessions)', ages: '15–18', level: 'Digital SAT', format: 'Group tuition or per session',
        image: 'assets/images/courses/course-25.jpg', icon: 'fa-chart-simple',
        tagline: 'A full 4-month programme built around your target score.',
        about: 'A comprehensive SAT preparation programme running three sessions a week over four months — roughly 48 sessions — designed to move students to their target score through structured instruction and personalised support. Covers both SAT English and Math, with test-taking strategy, focused work on individual weak areas, curated practice materials, and ongoing performance tracking throughout.',
        subjects: ['Reading & Writing', 'Math (Calculator & No-Calculator)', 'Test strategy', 'Full-length mocks'],
        highlights: ['~48 sessions across 4 months', 'Expert guidance in both English and Math', 'Individual weak-area targeting', 'Regular mocks with performance tracking']
    },

    /* ========== ACADEMICS · English Language ========== */
    {
        id: 26, branch: 'academics', name: 'English Language — Basic',
        category: 'English Language',
        duration: '10 sessions', ages: 'All ages', level: 'A1 – A2', format: 'Live online · small group',
        image: 'assets/images/courses/course-26.jpg', icon: 'fa-comment',
        tagline: 'Build the foundation properly, once.',
        about: 'A foundation course for learners starting out in English. Covers core grammar, everyday vocabulary, sentence construction and basic conversation, with plenty of low-pressure speaking practice so the language becomes usable rather than theoretical.',
        highlights: ['Core grammar taught in plain language', 'Everyday, high-frequency vocabulary', 'Low-pressure speaking practice', 'Clear progress checkpoints']
    },
    {
        id: 27, branch: 'academics', name: 'English Language — Intermediate',
        category: 'English Language',
        duration: '10 sessions', ages: 'All ages', level: 'B1 – B2', format: 'Live online · small group',
        image: 'assets/images/courses/course-27.jpg', icon: 'fa-comments',
        tagline: 'From understanding English to actually using it.',
        about: 'For learners who understand English but hesitate to use it. This course builds fluency and accuracy together — tenses, connectors and register — alongside structured writing practice and extended conversation work.',
        highlights: ['Fluency and accuracy developed together', 'Tenses, connectors and register', 'Structured writing practice', 'Extended conversation work']
    },
    {
        id: 28, branch: 'academics', name: 'English Language — Advanced',
        category: 'English Language',
        duration: '8 sessions', ages: 'All ages', level: 'C1+', format: 'Live online · small group',
        image: 'assets/images/courses/course-28.jpg', icon: 'fa-graduation-cap',
        tagline: 'Precise, academic, professional English.',
        about: 'An advanced course for learners aiming at academic or professional English. Focuses on nuance, tone, advanced structures and formal writing — the level of control expected in university work and professional settings.',
        highlights: ['Nuance, tone and register control', 'Advanced grammatical structures', 'Formal and academic writing', 'Presentation and discussion skills']
    },

    /* ========== ACADEMICS · Professional Skills ========== */
    {
        id: 32, branch: 'academics', name: 'Professional Email Writing',
        category: 'Professional Skills',
        duration: '2 days', ages: '16+', level: 'All levels', format: 'Live online · intensive',
        image: 'assets/images/courses/course-32.jpg', icon: 'fa-envelope-open-text',
        tagline: 'Write emails people actually reply to.',
        about: 'A two-day practical workshop on professional written communication. Covers structure, tone, subject lines, follow-ups and the common mistakes that make emails get ignored — with real templates you can reuse immediately.',
        highlights: ['Structure and tone for every situation', 'Subject lines that get opened', 'Follow-ups without being annoying', 'Reusable templates included']
    }
];

/* ------------------------------------------------------------
   Helpers (shared by every page)
   ------------------------------------------------------------ */
const LB = {
    branches: BRANCHES,
    categories: categoriesData,
    courses: coursesData,

    /** Courses belonging to a branch ('kids' | 'academics'), or all. */
    byBranch(branch) {
        if (!branch || branch === 'all') return coursesData;
        return coursesData.filter(c => c.branch === branch);
    },

    /** Categories belonging to a branch. */
    categoriesFor(branch) {
        if (!branch || branch === 'all') return categoriesData;
        return categoriesData.filter(c => c.branch === branch);
    },

    categoryMeta(name) {
        return categoriesData.find(c => c.name === name) || null;
    },

    course(id) {
        return coursesData.find(c => c.id === Number(id)) || null;
    },

    /** Count of courses in a category. */
    countIn(categoryName) {
        return coursesData.filter(c => c.category === categoryName).length;
    },

    /** Free-text search across a branch (or everything). */
    search(query, branch) {
        const q = String(query || '').trim().toLowerCase();
        if (!q) return [];
        return this.byBranch(branch).filter(c => {
            const haystack = [
                c.name, c.category, c.tagline, c.about,
                c.ages, c.level, (c.subjects || []).join(' ')
            ].join(' ').toLowerCase();
            return haystack.includes(q);
        });
    }
};

/* Legacy alias — a couple of older scripts still reference this. */
const categoryColors = {};
categoriesData.forEach(c => { categoryColors[c.name] = c.branch; });

if (typeof window !== 'undefined') window.LB = LB;
