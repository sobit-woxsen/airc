export interface Product {
  id: string
  name: string
  domain: string
  tagline: string
  description: string
  fullDescription: string
  image: string
  status: "Production" | "Beta" | "Development"
  technologies: string[]
  demoUrl: string
  githubUrl: string
  docUrl: string
  features: string[]
  useCases: string[]
  metrics: {
    users?: string
    queries?: string
    uptime?: string
    satisfaction?: string
    simulations?: string
    algorithms?: string
    co2Saved?: string
    costSaved?: string
  }
  videoUrl?: string
  slides?: string[]
  pdfUrl?: string
}

// Extended product data with media
export const products: Product[] = [
  {
    id: "neural-search",
    name: "NeuralSearch",
    domain: "AI & Machine Learning",
    tagline: "Semantic search powered by transformer models",
    description:
      "Advanced semantic search engine leveraging BERT embeddings for context-aware information retrieval. Handles multi-lingual queries with 94% accuracy.",
    fullDescription: `NeuralSearch is a cutting-edge semantic search engine that revolutionizes how users find information. By leveraging state-of-the-art BERT transformer models, it understands the contextual meaning behind queries rather than just matching keywords.

The system processes queries through multiple layers of neural networks, creating dense vector representations that capture semantic relationships. This approach enables the engine to return highly relevant results even when exact keywords don't match, understanding synonyms, related concepts, and user intent.

Key capabilities include multi-lingual support across 20+ languages, real-time indexing of new documents, and adaptive learning that improves accuracy over time based on user interactions. The architecture is designed for scalability, handling millions of queries per day with sub-100ms response times.`,
    image: "/neural-network-architecture-visualization.jpg",
    status: "Production",
    technologies: ["PyTorch", "BERT", "FastAPI", "Redis", "Docker", "PostgreSQL"],
    demoUrl: "#",
    githubUrl: "#",
    docUrl: "#",
    features: [
      "94% accuracy on multi-lingual queries",
      "Sub-100ms query response time",
      "Real-time document indexing",
      "Adaptive learning from user feedback",
      "Supports 20+ languages",
      "Scalable to millions of documents",
    ],
    useCases: [
      "Enterprise knowledge bases",
      "E-commerce product search",
      "Academic research databases",
      "Customer support documentation",
    ],
    metrics: {
      users: "50K+",
      queries: "2M+/day",
      uptime: "99.9%",
      satisfaction: "4.8/5",
    },
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    slides: [
      "/neural-network-architecture-visualization.jpg",
      "/multimodal-ai-network.jpg",
      "/explainable-ai-visualization.jpg",
    ],
    pdfUrl: "/docs/neural-search-whitepaper.pdf",
  },
  {
    id: "quantum-simulator",
    name: "QuantumSim",
    domain: "Quantum Computing",
    tagline: "Quantum circuit simulator for education and research",
    description:
      "High-performance quantum computing simulator supporting up to 20 qubits. Includes visualization tools and built-in quantum algorithms library.",
    fullDescription: `QuantumSim is a powerful quantum circuit simulator designed for both education and cutting-edge research. It provides an intuitive interface for designing, testing, and visualizing quantum algorithms without requiring access to actual quantum hardware.

The simulator supports up to 20 qubits and implements all standard quantum gates including Hadamard, CNOT, Toffoli, and custom unitary operations. Built-in algorithms include Shor's factoring algorithm, Grover's search, quantum teleportation, and various quantum machine learning protocols.

Advanced visualization features allow users to see quantum state evolution in real-time, view Bloch sphere representations, and analyze measurement probabilities. The system is optimized for performance, using sparse matrix representations and GPU acceleration for complex simulations.`,
    image: "/quantum-computing-circuits.jpg",
    status: "Beta",
    technologies: ["Python", "NumPy", "Qiskit", "WebGL", "CUDA", "React"],
    demoUrl: "#",
    githubUrl: "#",
    docUrl: "#",
    features: [
      "Support for up to 20 qubits",
      "Real-time circuit visualization",
      "Built-in quantum algorithms library",
      "GPU-accelerated simulations",
      "Bloch sphere representations",
      "Export to Qiskit and Cirq",
    ],
    useCases: [
      "Quantum computing education",
      "Algorithm research and development",
      "Quantum machine learning experiments",
      "Pre-deployment testing for quantum hardware",
    ],
    metrics: {
      users: "15K+",
      simulations: "500K+",
      algorithms: "25+",
      satisfaction: "4.7/5",
    },
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    slides: ["/quantum-computing-circuits.jpg", "/quantum-circuit-diagram.jpg"],
    pdfUrl: "/docs/quantum-sim-documentation.pdf",
  },
  {
    id: "greenops",
    name: "GreenOps",
    domain: "Sustainability",
    tagline: "Carbon footprint optimizer for cloud infrastructure",
    description:
      "Real-time monitoring and optimization of cloud resource carbon emissions. Provides actionable recommendations to reduce energy consumption by up to 40%.",
    fullDescription: `GreenOps is an innovative platform that helps organizations reduce their cloud infrastructure's environmental impact. By continuously monitoring resource usage and carbon emissions, it provides data-driven recommendations for optimization.

The platform integrates with major cloud providers (AWS, Azure, GCP) to track compute, storage, and network resource consumption. Using real-time carbon intensity data from electricity grids worldwide, it calculates the actual environmental impact of your infrastructure.

Advanced ML models analyze usage patterns and suggest optimizations such as workload scheduling during low-carbon periods, right-sizing over-provisioned resources, and migrating workloads to regions with cleaner energy sources. Organizations typically achieve 30-40% reduction in carbon emissions while also reducing costs.`,
    image: "/green-technology-data-center.jpg",
    status: "Production",
    technologies: ["Go", "Kubernetes", "Prometheus", "React", "PostgreSQL", "gRPC"],
    demoUrl: "#",
    githubUrl: "#",
    docUrl: "#",
    features: [
      "Real-time carbon emission tracking",
      "Multi-cloud support (AWS, Azure, GCP)",
      "AI-powered optimization recommendations",
      "Automated workload scheduling",
      "Detailed carbon footprint reports",
      "Cost savings alongside emissions reduction",
    ],
    useCases: [
      "Enterprise cloud cost optimization",
      "Sustainability reporting and compliance",
      "Green software engineering",
      "Data center efficiency improvements",
    ],
    metrics: {
      users: "200+",
      co2Saved: "500 tons",
      costSaved: "$2M+",
      satisfaction: "4.9/5",
    },
    slides: [
      "/green-technology-data-center.jpg",
      "/green-energy-data-center.jpg",
      "/neural-network-architecture-visualization.jpg",
    ],
    pdfUrl: "/docs/greenops-case-study.pdf",
  },
]

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }))
}
