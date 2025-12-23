import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ResearchPaperDetail } from "@/components/research-paper-detail"
import { notFound } from "next/navigation"

// Sample data - in production, this would come from a database or CMS
const papers = [
  {
    id: "neural-architecture-search",
    title: "Automated Neural Architecture Search Using Evolutionary Algorithms",
    authors: ["Dr. Sarah Chen", "Prof. Michael Roberts", "Dr. James Kim"],
    abstract:
      "We present a novel approach to neural architecture search that combines evolutionary algorithms with reinforcement learning to automatically design optimal neural network architectures for specific tasks. Our method achieves state-of-the-art results on ImageNet classification while reducing computational costs by 40%.",
    publishedDate: "2024-11-15",
    domain: "Machine Learning",
    citations: 127,
    pdfUrl: "/papers/neural-architecture-search.pdf",
    arxivId: "arXiv:2411.12345",
    keywords: ["Neural Architecture Search", "Evolutionary Algorithms", "AutoML", "Deep Learning"],
  },
  {
    id: "quantum-framework",
    title: "Scalable Quantum Computing Framework for Optimization Problems",
    authors: ["Prof. Michael Roberts", "Dr. Emily Park", "Alex Johnson"],
    abstract:
      "This paper introduces QuOptimize, an open-source framework for developing and testing quantum algorithms at scale. We demonstrate significant performance improvements on combinatorial optimization problems compared to classical approaches, with applications in logistics, finance, and drug discovery.",
    publishedDate: "2024-10-20",
    domain: "Quantum Computing",
    citations: 89,
    pdfUrl: "/papers/quantum-framework.pdf",
    arxivId: "arXiv:2410.67890",
    keywords: ["Quantum Computing", "Optimization", "Framework", "QAOA"],
  },
  {
    id: "sustainable-ai",
    title: "Reducing Carbon Footprint in Large-Scale AI Training",
    authors: ["Dr. Emily Park", "Dr. Sarah Chen", "Maria Garcia"],
    abstract:
      "We propose a suite of techniques for reducing the environmental impact of training large AI models. Through intelligent resource allocation, model pruning, and energy-aware scheduling, we achieve a 60% reduction in carbon emissions while maintaining model performance. Our findings have implications for responsible AI development at scale.",
    publishedDate: "2024-09-05",
    domain: "Sustainability",
    citations: 203,
    pdfUrl: "/papers/sustainable-ai.pdf",
    arxivId: "arXiv:2409.11223",
    keywords: ["Green AI", "Sustainability", "Energy Efficiency", "Responsible AI"],
  },
  {
    id: "multimodal-learning",
    title: "Cross-Modal Learning for Enhanced Visual Understanding",
    authors: ["Dr. James Kim", "Alex Johnson"],
    abstract:
      "A new architecture for learning joint representations across vision and language modalities. Our approach enables models to understand complex relationships between visual content and textual descriptions, achieving state-of-the-art results on vision-language tasks including image captioning, visual question answering, and cross-modal retrieval.",
    publishedDate: "2024-08-12",
    domain: "Computer Vision",
    citations: 156,
    pdfUrl: "/papers/multimodal-learning.pdf",
    arxivId: "arXiv:2408.34567",
    keywords: ["Multimodal Learning", "Vision-Language", "Cross-Modal", "Representation Learning"],
  },
  {
    id: "federated-privacy",
    title: "Privacy-Preserving Federated Learning at Scale",
    authors: ["Maria Garcia", "Dr. Sarah Chen"],
    abstract:
      "Novel differential privacy techniques for secure distributed machine learning across thousands of devices. We introduce a new protocol that provides strong privacy guarantees while maintaining model accuracy, enabling collaborative learning without centralizing sensitive data. Our approach has been validated in real-world healthcare and finance applications.",
    publishedDate: "2024-07-28",
    domain: "Machine Learning",
    citations: 178,
    pdfUrl: "/papers/federated-privacy.pdf",
    arxivId: "arXiv:2407.89012",
    keywords: ["Federated Learning", "Differential Privacy", "Secure ML", "Distributed Systems"],
  },
  {
    id: "robotics-manipulation",
    title: "Dexterous Manipulation Through Imitation Learning",
    authors: ["Prof. Michael Roberts", "Dr. James Kim"],
    abstract:
      "Learning complex manipulation skills from human demonstrations using vision-based reinforcement learning. We present a framework that enables robots to acquire dexterous manipulation capabilities through imitation learning, demonstrating successful transfer of skills like tool use, assembly tasks, and delicate object handling from human operators to robotic systems.",
    publishedDate: "2024-06-10",
    domain: "Robotics",
    citations: 94,
    pdfUrl: "/papers/robotics-manipulation.pdf",
    arxivId: "arXiv:2406.45678",
    keywords: ["Robotics", "Imitation Learning", "Manipulation", "Reinforcement Learning"],
  },
]

export function generateStaticParams() {
  return papers.map((paper) => ({
    id: paper.id,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const paper = papers.find((p) => p.id === id)

  if (!paper) {
    return {
      title: "Paper Not Found",
    }
  }

  return {
    title: `${paper.title} — AI Research Center`,
    description: paper.abstract.substring(0, 160),
  }
}

export default async function ResearchPaperPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const paper = papers.find((p) => p.id === id)

  if (!paper) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ResearchPaperDetail paper={paper} />
      </main>
      <Footer />
    </div>
  )
}
