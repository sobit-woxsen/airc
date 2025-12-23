export interface Conference {
    id: string
    title: string
    date: string
    location: string
    description: string
    fullDescription: string
    image: string
    status: "Upcoming" | "Past" | "Registration Open"
    organizingInstitute: string
    department: string
    participantsExpected: string
    targetParticipants: string
    callForPapers: {
        text: string
        tracks: {
            id: string
            title: string
        }[]
    }
    timeline: {
        event: string
        deadline: string
    }[]
    registrationFees: {
        indian: {
            category: string
            amount: string
        }[]
        international: {
            category: string
            amount: string
        }[]
    }
    committee: {
        patrons: { name: string; role: string; image?: string }[]
        chairs: { name: string; role: string; image?: string }[]
        convenors: { name: string; role: string; image?: string }[]
        coConvenors: { name: string; role: string; image?: string }[]
    }
    submissionGuidelines: {
        cmtLink: string
        createAccountLink: string
        submissionStepsLink: string
    }
    speakers: {
        name: string
        role: string
        company: string
        image: string
    }[]
    agenda: {
        time: string
        title: string
        description: string
        speaker?: string
    }[]
    registrationUrl: string
}

export const conferences: Conference[] = [
    {
        id: "ethics-security-governance-ai-2026",
        title: "International Conference on Ethics, Security, and Governance for Responsible AI 2026 (ICESGAI2026)",
        date: "October 25-26, 2026",
        location: "Woxsen University, Hyderabad",
        description: "Resolving the gap between high-level ethical principles and actionable engineering practices in AI.",
        fullDescription: `The "International Conference on Ethics, Security, and Governance for Responsible AI-2026" is focused on resolving the long-established gap between high-level ethical principles and actionable, auditable engineering practices. Sharing of policies, guidelines, and state-of-the-art technical tools for validating AI models and methodologies against the ethical, legal, and safety requirements will be the primary agenda for the event. We encourage scholars, academicians, research scholars, and industry personnel who are fascinated by the increasing potential of AI and, at the same time, worried about its negative influence and working in the field to mitigate its negative impact, to submit their scholarly work or take part to be more aware of the field.`,
        image: "/ai-ethics-discussion.jpg",
        status: "Registration Open",
        organizingInstitute: "Woxsen University, Hyderabad",
        department: "Department of Analytics, School of Business, Woxsen University",
        participantsExpected: "50-100",
        targetParticipants: "Research Scholars, Academicians, Industry-persons, People working in AI Research Centers in India and abroad.",
        callForPapers: {
            text: "Submitted manuscripts should follow, but not be strictly confined to, the following research areas.",
            tracks: [
                { id: "Track I", title: "AI Governance, Regulations, and Legal Framework" },
                { id: "Track II", title: "Bias Mitigation, Robustness, and Fairness in AI Deployment" },
                { id: "Track III", title: "Designing Explainable, Interpretable, and Trustworthy AI for the future" },
                { id: "Track IV", title: "Addressing the issue of Privacy, data security and Societal Impact in the usage of AI" },
                { id: "Track V", title: "Ethics in Applications: Case Studies and Real-Time Practised Methodologies" }
            ]
        },
        timeline: [
            { event: "Initial registration and full paper submission", deadline: "03.07.2026" },
            { event: "Acceptance notification", deadline: "20.07.2026" },
            { event: "Camera-ready paper submission", deadline: "15.09.2026" },
            { event: "Early Bird Registration", deadline: "20.09.2026" },
            { event: "Standard Registration", deadline: "03.10.2026" },
            { event: "Late Registration", deadline: "15.10.2026" },
            { event: "Date for conference", deadline: "25-26 October 2026" }
        ],
        registrationFees: {
            indian: [
                { category: "Undergraduate/Postgraduate", amount: "6500/-" },
                { category: "Research Scholar", amount: "8000/-" },
                { category: "Academicians/Professionals", amount: "10000/-" }
            ],
            international: [
                { category: "Undergraduate/Postgraduate", amount: "$120" },
                { category: "Research Scholar", amount: "$130" },
                { category: "Academicians/Professionals", amount: "$150" }
            ]
        },
        committee: {
            patrons: [
                { name: "Dr. Raul V. Rodriguez", role: "Vice President, Woxsen University, India", image: "/professional-professor.png" }
            ],
            chairs: [
                { name: "Dr. Raul V. Rodriguez", role: "Vice President, Woxsen University, India", image: "/professional-professor.png" },
                { name: "Dr. Hemachandran K", role: "Professor, School of Business, Woxsen University, India", image: "/professional-engineer.png" }
            ],
            convenors: [
                { name: "Dr. Hemachandran K", role: "Professor, School of Business, Woxsen University, India", image: "/professional-engineer.png" }
            ],
            coConvenors: [
                { name: "Dr. Bikash Kumar Pradhan", role: "Assistant Professor, School of Business, Woxsen University", image: "/professional-woman-researcher.png" },
                { name: "Dr. Rajesh Kumar", role: "Associate Professor, School of Business, Woxsen University", image: "/professional-person-educator.jpg" },
                { name: "Dr. Shyam Joshi", role: "Assistant Professor, School of Business, Woxsen University", image: "/professional-woman-manager.png" }
            ]
        },
        submissionGuidelines: {
            cmtLink: "#",
            createAccountLink: "https://cmt3.research.microsoft.com/docs/help/general/account-creation.html",
            submissionStepsLink: "https://cmt3.research.microsoft.com/docs/help/author/author-submission-form.html"
        },
        speakers: [], // "Soon to be announced"
        agenda: [],
        registrationUrl: "#register"
    }
]
