/**
 * DEPRECATED: This file is kept for migration reference only.
 * Newsletter data is now managed dynamically in the database.
 * See /app/actions/newsletters.ts and Prisma Newsletter model.
 *
 * Use getPublishedNewsletters() server action to fetch newsletter data.
 */

export interface Newsletter {
  id: string
  title: string
  description: string
  date: string
  issue: number
  coverImage: string
  pdfUrl: string
  topics: string[]
  featured?: boolean
}

export const newslettersData: Newsletter[] = [
  // 2025 Issues
  {
    id: "2025-08",
    title: "AI Research Monthly - August 2025",
    description: "Latest breakthroughs in AI research, cutting-edge developments in machine learning, and insights from leading researchers in the field.",
    date: "August 2025",
    issue: 14,
    coverImage: "/newsletter/August25.pdf",
    pdfUrl: "/newsletter/August25.pdf",
    topics: ["AI Research", "Machine Learning", "Breakthroughs", "Innovation"],
    featured: true,
  },
  {
    id: "2025-06",
    title: "AI Research Monthly - June 2025",
    description: "Comprehensive coverage of AI advancements, research papers, industry applications, and expert perspectives on emerging technologies.",
    date: "June 2025",
    issue: 13,
    coverImage: "/newsletter/June25.pdf",
    pdfUrl: "/newsletter/June25.pdf",
    topics: ["Research Papers", "Industry Applications", "Emerging Tech", "Expert Insights"],
    featured: true,
  },
  {
    id: "2025-05",
    title: "AI Research Monthly - May 2025",
    description: "Deep dive into quantum computing, AI ethics, and the latest developments in natural language processing and computer vision.",
    date: "May 2025",
    issue: 12,
    coverImage: "/newsletter/May25.pdf",
    pdfUrl: "/newsletter/May25.pdf",
    topics: ["Quantum Computing", "AI Ethics", "NLP", "Computer Vision"],
  },
  {
    id: "2025-04",
    title: "AI Research Monthly - April 2025",
    description: "Exploring AI applications in healthcare, sustainable technology, and breakthrough discoveries in neural network architectures.",
    date: "April 2025",
    issue: 11,
    coverImage: "/newsletter/April25.pdf",
    pdfUrl: "/newsletter/April25.pdf",
    topics: ["Healthcare AI", "Sustainability", "Neural Networks", "Applications"],
  },
  {
    id: "2025-03",
    title: "AI Research Monthly - March 2025",
    description: "Spotlight on AI agents, autonomous systems, robotics innovations, and the future of intelligent automation.",
    date: "March 2025",
    issue: 10,
    coverImage: "/newsletter/March25.pdf",
    pdfUrl: "/newsletter/March25.pdf",
    topics: ["AI Agents", "Autonomous Systems", "Robotics", "Automation"],
  },
  {
    id: "2025-02",
    title: "AI Research Monthly - February 2025",
    description: "Analysis of large language models, transformer architectures, and the evolving landscape of generative AI technologies.",
    date: "February 2025",
    issue: 9,
    coverImage: "/newsletter/February25.pdf",
    pdfUrl: "/newsletter/February25.pdf",
    topics: ["Large Language Models", "Transformers", "Generative AI", "Analysis"],
  },
  {
    id: "2025-01",
    title: "AI Research Monthly - January 2025",
    description: "Year-ahead predictions, emerging research trends, breakthrough papers, and comprehensive review of AI developments.",
    date: "January 2025",
    issue: 8,
    coverImage: "/newsletter/January25.pdf",
    pdfUrl: "/newsletter/January25.pdf",
    topics: ["2025 Predictions", "Research Trends", "Annual Review", "Future Outlook"],
  },

  // 2024 Issues
  {
    id: "2024-12",
    title: "AI Research Monthly - December 2024",
    description: "End-of-year roundup featuring the most significant AI achievements, breakthrough research, and year in review analysis.",
    date: "December 2024",
    issue: 7,
    coverImage: "/newsletter/December24.pdf",
    pdfUrl: "/newsletter/December24.pdf",
    topics: ["Year in Review", "Achievements", "Breakthrough Research", "2024 Highlights"],
  },
  {
    id: "2024-11",
    title: "AI Research Monthly - November 2024",
    description: "Focus on edge computing, IoT integration with AI, and advancements in distributed machine learning systems.",
    date: "November 2024",
    issue: 6,
    coverImage: "/newsletter/November24.pdf",
    pdfUrl: "/newsletter/November24.pdf",
    topics: ["Edge Computing", "IoT", "Distributed ML", "Systems"],
  },
  {
    id: "2024-10",
    title: "AI Research Monthly - October 2024",
    description: "Deep learning innovations, neural architecture search, and cutting-edge research in reinforcement learning applications.",
    date: "October 2024",
    issue: 5,
    coverImage: "/newsletter/October24.pdf",
    pdfUrl: "/newsletter/October24.pdf",
    topics: ["Deep Learning", "Neural Architecture", "Reinforcement Learning", "Innovation"],
  },
  {
    id: "2024-09",
    title: "AI Research Monthly - September 2024",
    description: "Exploring AI in finance, algorithmic trading, risk management, and the impact of machine learning on financial markets.",
    date: "September 2024",
    issue: 4,
    coverImage: "/newsletter/Sept24.pdf",
    pdfUrl: "/newsletter/Sept24.pdf",
    topics: ["FinTech", "Algorithmic Trading", "Risk Management", "Financial AI"],
  },
  {
    id: "2024-08",
    title: "AI Research Monthly - August 2024",
    description: "AI safety and alignment research, responsible AI development, and ethical considerations in modern AI systems.",
    date: "August 2024",
    issue: 3,
    coverImage: "/newsletter/august24.pdf",
    pdfUrl: "/newsletter/august24.pdf",
    topics: ["AI Safety", "Alignment", "Responsible AI", "Ethics"],
  },
  {
    id: "2024-07",
    title: "AI Research Monthly - July 2024",
    description: "Computer vision breakthroughs, image recognition advances, and applications in autonomous vehicles and robotics.",
    date: "July 2024",
    issue: 2,
    coverImage: "/newsletter/July24.pdf",
    pdfUrl: "/newsletter/July24.pdf",
    topics: ["Computer Vision", "Image Recognition", "Autonomous Vehicles", "Applications"],
  },
  {
    id: "2024-06",
    title: "AI Research Monthly - June 2024",
    description: "Natural language processing innovations, transformer models, and the evolution of conversational AI systems.",
    date: "June 2024",
    issue: 1,
    coverImage: "/newsletter/june24.pdf",
    pdfUrl: "/newsletter/june24.pdf",
    topics: ["NLP", "Transformers", "Conversational AI", "Language Models"],
  },
]
