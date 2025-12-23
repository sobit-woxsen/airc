export interface Episode {
    id: number
    title: string
    slug: string
    guest: string
    date: string
    duration: string
    description: string
    audioUrl: string
    showNotes: string[]
    image?: string
}

export const episodes: Episode[] = [
    {
        id: 1,
        title: "Beyond the Hype: Why Current AI Development is Creating More Problems Than Solutions",
        slug: "beyond-the-hype",
        guest: "Dr. Raul V Rodriguez",
        date: "August 14, 2025",
        duration: "15:08",
        description:
            "Beyond the Hype is a field report from an AI practitioner revealing how current AI development, despite notable successes, often creates more problems than it solves. The book highlights a widening gap between AI’s promises and its real-world performance in sectors like healthcare, aviation, education, and smart cities. It identifies three core issues: optimization without understanding, human-AI integration failure, and systemic complexity amplification. Real-world examples show unintended consequences such as skill atrophy, bias reinforcement, dependency, and social inequality. The author critiques the industry’s focus on benchmarks and hype over long-term human impact. Finally, it calls for a shift toward problem-first, human-centered, and transparent AI development.",
        audioUrl: "/podcasts-audio/beyond-the-hype/beyond-the-hype.m4a",
        image: "/podcasts-audio/beyond-the-hype/beyond-the-hype.png",
        showNotes: [
            "Timeline: Intro (0:00)",
            "Quantum error correction breakthroughs (5:30)",
            "Current limitations and roadblocks (15:45)",
            "Industry applications (25:00)",
            "Timeline predictions (35:20)",
        ],
    },
    {
        id: 2,
        title: "The Integrated Workplace Well-being and Performance Framework",
        slug: "the-integrated-workplace-well-being-and-performance-framework",
        guest: " Dr. Raul V Rodriguez",
        date: "August 11, 2025",
        duration: "07:19",
        description:
            "The Integrated Workplace Well-being & Performance Framework is a comprehensive, multi-dimensional model designed to help organizations understand and enhance the intricate relationship between employee well-being, job performance, and ethical conduct in the modern workplace. It recognizes that today’s work environment is shaped by rapid technological advancements, evolving leadership practices, generational diversity, and complex organizational cultures. This framework addresses a broad range of interrelated factors, including digital stress and moral disengagement, social connectedness, ethical standards, technology-mediated productivity, leadership insecurity, role alignment, and the balance between conformity and innovation. By considering both organizational and human dimensions, it provides leaders and managers with actionable insights to cultivate workplaces where employees are healthy, engaged, innovative, and ethically grounded. Its ultimate aim is to create sustainable work environments where technology supports—not undermines—human potential, leadership inspires trust and clarity, and organizational structures promote both individual happiness and collective performance. In doing so, it offers a roadmap for navigating the challenges of the digital era while fostering a culture of well-being, productivity, and integrity.",
        audioUrl: "/podcasts-audio/the-integrated-workplace-well-being-and-performance-framework/the-integrated-workplace-well-being-and-performance-framework.m4a",
        image: "/podcasts-audio/the-integrated-workplace-well-being-and-performance-framework/the-integrated-workplace-well-being-and-performance-framework.png",
        showNotes: [
            "Timeline: Intro (0:00)",
            "Defining fairness in ML (4:15)",
            "Common bias sources (12:30)",
            "Mitigation strategies (20:00)",
            "Regulatory landscape (30:15)",
        ],
    },
    {
        id: 3,
        title: "Leadership Fit and System Stability",
        slug: "leadership-fit-and-system-stability-an-interdisciplinary-framework",
        guest: "Dr. Raul V Rodriguez",
        date: "2025-01-06",
        duration: "06:52",
        description: "The paper “Leadership Fit and System Stability” presents a comprehensive interdisciplinary framework for understanding how the alignment between a leader and their context—referred to as leadership fit—impacts the stability of political, organizational, and social systems. Drawing from political science, psychology, sociology, and organizational behavior, the authors identify four key dimensions of leadership fit: institutional alignment, demographic congruence, competency-context match, and adaptive capacity. The study argues that effective leadership is not defined by universal traits but by how well a leader’s characteristics match the specific demands of their environment. Using historical analysis, empirical research, and case studies, the paper demonstrates that leadership misfit—such as ignoring institutional norms or lacking cultural competence—can lead to system collapse, while good fit enhances performance and resilience. To operationalize this insight, the authors propose a Leadership Fit Assessment Framework (LFAF) that enables organizations and institutions to measure and improve leadership alignment systematically. Ultimately, the paper emphasizes that sustainable leadership and system stability require ongoing adaptation, informed selection processes, and context-sensitive development strategies.",
        audioUrl: "/podcasts-audio/leadership-fit-and-system-stability-an-interdisciplinary-framework/leadership-fit-and-system-stability-an-interdisciplinary-framework.wav",
        image: "/podcasts-audio/leadership-fit-and-system-stability-an-interdisciplinary-framework/leadership-fit-and-system-stability-an-interdisciplinary-framework.png",
        showNotes: [
            "Timeline: Intro (0:00)",
            "Academic vs industry tradeoffs (6:00)",
            "Building the first MVP (15:30)",
            "Scaling challenges (25:45)",
            "Advice for researchers (38:00)",
        ],
    },
    {
        id: 4,
        title: "Polytemporal Network Theory",
        slug: "polytemporal-network-theory-a-universal-framework-for-system-dynamics",
        guest: "Dr. Raul V Rodriguez",
        date: "July 28, 2025",
        duration: "07:32",
        description: "Polytemporal Network Theory (PNT) introduces a framework for understanding complex systems through their interactions across multiple timescales—from microseconds to decades. Rather than viewing systems as single-layer networks, PNT conceptualizes them as stacks of interconnected networks, each operating at a different temporal frequency. System behavior emerges from resonance, interference, and cascading effects between these layers. The theory provides mathematical tools to model these dynamics and demonstrates its applicability across fields such as neuroscience, economics, ecology, and technology. PNT reveals that many systemic failures stem from temporal misalignments and offers new ways to design resilient systems by honoring the full spectrum of time-based interactions.",
        audioUrl: "/podcasts-audio/polytemporal-network-theory-a-universal-framework-for-system-dynamics/polytemporal-network-theory-a-universal-framework-for-system-dynamics.wav",
        image: "/podcasts-audio/polytemporal-network-theory-a-universal-framework-for-system-dynamics/polytemporal-network-theory-a-universal-framework-for-system-dynamics.png",
        showNotes: [
            "Timeline: Intro (0:00)",
            "The environmental cost of AI (3:20)",
            "Practical optimization techniques (12:00)",
            "Carbon-aware scheduling (22:30)",
            "Future of green AI (30:00)",
        ],
    },
    {
        id: 5,
        title: "Adaptive Resonance Leadership Theory",
        slug: "adaptive-resonance-leadership-leading-in-perpetual-discontinuity",
        guest: "Dr. Raul V Rodriguez",
        date: "July 28, 2025",
        duration: "07:32",
        description: "The Adaptive Resonance Leadership Theory (ARLT) is a new framework for leadership in today's rapidly changing and unpredictable world. Unlike traditional theories that assume stable environments and clear boundaries, ARLT emphasizes that leaders must continuously adapt to shifting contexts, diverse stakeholder values, and challenges that cross organizational and national lines. Key principles include creating 'resonance' (dynamic mutual adaptation rather than static fit), leveraging influence across multiple systems (not just hierarchical control), managing initiatives on different time scales for adaptability (chronodiversity), and innovating new shared values to unite diverse groups. The theory sees leaders as orchestrators in complex, uncontrollable environments, focusing on fostering emergence and resilience.",
        audioUrl: "/podcasts-audio/adaptive-resonance-leadership-leading-in-perpetual-discontinuity/adaptive-resonance-leadership-leading-in-perpetual-discontinuity.wav",
        image: "/podcasts-audio/adaptive-resonance-leadership-leading-in-perpetual-discontinuity/adaptive-resonance-leadership-leading-in-perpetual-discontinuity.png",
        showNotes: [
            "Timeline: Intro (0:00)",
            "The environmental cost of AI (3:20)",
            "Practical optimization techniques (12:00)",
            "Carbon-aware scheduling (22:30)",
            "Future of green AI (30:00)",
        ],
    },
    {
        id: 6,
        title: "The Cascade Collapse Framework",
        slug: "the-cascade-collapse-framework",
        guest: "Dr. Raul V Rodriguez",
        date: "July 14, 2025",
        duration: "05:27",
        description: "The Cascade Collapse Framework (CCF) is a model that predicts when and how nations or organizations fail by analyzing the interaction between leadership weaknesses and structural network vulnerabilities. Building on previous theories, it uses network analysis and graph theory to map out how collapse spreads through 'cascade' patterns—often triggered by leadership failures that erode trust in key positions. The framework can forecast collapse within 6–18 months, identify intervention points to stop failure, and shows that even stable-looking systems can be close to collapse if a leadership failure occurs. The model is validated by analyzing dozens of historical and current cases.",
        audioUrl: "/podcasts-audio/the-cascade-collapse-framework/the-cascade-collapse-framework.wav",
        image: "/podcasts-audio/the-cascade-collapse-framework/the-cascade-collapse-framework.png",
        showNotes: [
            "Timeline: Intro (0:00)",
            "The environmental cost of AI (3:20)",
            "Practical optimization techniques (12:00)",
            "Carbon-aware scheduling (22:30)",
            "Future of green AI (30:00)",
        ],
    },
]

export function getAllEpisodes(): Episode[] {
    return episodes
}

export function getEpisodeById(id: number): Episode | undefined {
    return episodes.find((episode) => episode.id === id)
}

export function getEpisodeBySlug(slug: string): Episode | undefined {
    return episodes.find((episode) => episode.slug === slug)
}
