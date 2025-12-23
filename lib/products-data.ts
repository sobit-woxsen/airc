// Products data organized by department

export interface Department {
    id: string
    name: string
    slug: string
    description: string
    longDescription: string
    icon: string // Lucide icon name
    color: string
    image: string
    videoUrl?: string
}

export interface MediaItem {
    type: "image" | "video"
    url: string
    thumbnail?: string  // For videos, optional custom thumbnail
    alt?: string
}

export interface ProductDocument {
    title: string
    url: string  // Path to PDF file
    type: "whitepaper" | "documentation" | "research" | "other"
}

export interface Product {
    id: string
    name: string
    departmentId: string
    tagline: string
    description: string
    image: string
    media?: MediaItem[]  // Multiple images/videos for gallery
    tags?: string[]  // Product tags for categorization
    documents?: ProductDocument[]  // PDFs, whitepapers, etc.
    status: "Production" | "Beta" | "Alpha" | "Coming Soon"
    technologies: string[]
    demoUrl?: string
    githubUrl?: string
    docUrl?: string
}

// Department definitions
export const departments: Department[] = [
    {
        id: "blockchain",
        name: "Blockchain",
        slug: "blockchain",
        description: "Decentralized solutions for secure and transparent systems",
        longDescription: "Our blockchain division develops cutting-edge decentralized applications, smart contracts, and Web3 infrastructure. We focus on creating secure, scalable, and transparent solutions for finance, supply chain, and digital identity verification.",
        icon: "Blocks",
        color: "#F7931A",
        image: "/departments/blockchain.jpg",
        videoUrl: "", // Add your video URL here
    },
    {
        id: "metaverse",
        name: "Metaverse",
        slug: "metaverse",
        description: "Immersive virtual experiences and spatial computing",
        longDescription: "We create immersive virtual worlds, augmented reality applications, and spatial computing experiences. Our metaverse solutions enable new forms of collaboration, entertainment, and commerce in virtual environments.",
        icon: "Globe",
        color: "#8B5CF6",
        image: "/departments/metaverse.jpg",
        videoUrl: "", // Add your video URL here
    },
    {
        id: "robotics",
        name: "Robotics",
        slug: "robotics",
        description: "Autonomous systems and intelligent automation",
        longDescription: "Our robotics team builds autonomous systems, robotic process automation, and intelligent machines. From industrial automation to humanoid robots, we push the boundaries of what's possible in human-machine collaboration.",
        icon: "Bot",
        color: "#EF4444",
        image: "/departments/robotics.jpg",
        videoUrl: "", // Add your video URL here
    },
    {
        id: "ai-ml",
        name: "AI & Machine Learning",
        slug: "ai-ml",
        description: "Intelligent systems that learn and adapt",
        longDescription: "Our AI & ML division develops state-of-the-art machine learning models, neural networks, and intelligent systems. We specialize in natural language processing, computer vision, and predictive analytics that transform data into actionable insights.",
        icon: "Brain",
        color: "#06B6D4",
        image: "/departments/ai-ml.jpg",
        videoUrl: "", // Add your video URL here
    },
]

// Products organized by department
export const products: Product[] = [
    // Blockchain Products
    {
        id: "woxsen-stock-exchange",
        name: "Woxsen Stock Exchange",
        departmentId: "blockchain",
        tagline: "Decentralized Educational Trading Platform",
        description: "Woxsen Stock Exchange (WSE) is a decentralized trading platform designed for educational innovation at Woxsen University. Each department has its own ERC-20 token representing performance and impact. Students receive airdropped WOX tokens to trade departmental tokens, learn market dynamics, and experience real-world finance using blockchain technology—securely hosted on a private Hyperledger Besu network. WSE combines education, finance, and technology in a unique, immersive learning ecosystem.",
        image: "/products/blockchain/woxsen-stock-exchange/wse1.png",
        media: [
            { type: "image", url: "/products/blockchain/woxsen-stock-exchange/wse1.png", alt: "DeFi Protocol Dashboard" },
            { type: "image", url: "/products/blockchain/woxsen-stock-exchange/wse2.png", alt: "Trading Interface" },
            { type: "image", url: "/products/blockchain/woxsen-stock-exchange/wse3.png", alt: "Analytics View" },
            { type: "video", url: "/products/blockchain/woxsen-stock-exchange/wse.mp4", alt: "Product Demo Video" },
        ],
        tags: ["Blockchain", "Decentralized", "EdTech (Educational Technology)", "ERC-20", "FinTech (Financial Technology)", "Hyperledger Besu"],
        documents: [
            { title: "Whitepaper", url: "/products/blockchain/woxsen-stock-exchange/bproject1.pdf", type: "whitepaper" },
            // { title: "Technical Documentation", url: "/products/blockchain/woxsen-stock-exchange/bproject2.pdf", type: "documentation" },
        ],
        status: "Production",
        technologies: ["Solidity", "Ethereum", "Web3.js", "React"],
        demoUrl: "#",
        githubUrl: "#",
    },
    {
        id: "transcripts-verification-system",
        name: "Transcripts Verification System using Blockchain",
        departmentId: "blockchain",
        tagline: "Secure Transcript Verification",
        description: "This innovative Transcript Verification System leverages cryptography and blockchain to provide rapid, reliable, and tamper-proof verification, ensuring data integrity and building trust. It streamlines the process by moving to a complete decentralized system that instantly verifies transcripts, overcoming the risks of forgery, privacy issues, and document loss. The system uses blockchain for immutable document storage, AI for automatic data processing, and cryptography to securely hash transcript data.",
        image: "/products/blockchain/transcript-verification-system/txv1.png",
        media: [
            { type: "image", url: "/products/blockchain/transcript-verification-system/txv1.png", alt: "Transcripts Verification System" },
            { type: "image", url: "/products/blockchain/transcript-verification-system/txv2.png", alt: "Transcripts Verification System" },
            { type: "image", url: "/products/blockchain/transcript-verification-system/txv3.png", alt: "Transcripts Verification System" },
            { type: "video", url: "/products/blockchain/transcript-verification-system/transcript-verification-system-bc.mp4", alt: "Product Demo Video" },
        ],
        tags: ["Blockchain", "Decentralized", "EdTech (Educational Technology)", "ERC-20", "FinTech (Financial Technology)", "Hyperledger Besu"],
        documents: [
            { title: "Whitepaper", url: "/products/blockchain/transcript-verification-system/bproject2.pdf", type: "whitepaper" },
            // { title: "Technical Documentation", url: "/products/blockchain/woxsen-stock-exchange/bproject2.pdf", type: "documentation" },
        ],
        status: "Production",
        technologies: ["Solidity", "IPFS", "Next.js", "Polygon"],
    },
    {
        id: "mediwox",
        name: "MediWox",
        departmentId: "blockchain",
        tagline: "Secure Healthcare Data. Smarter Insurance. Powered by Blockchain",
        description: "The MediWox system addresses patient data privacy concerns by creating a secure, decentralized platform using blockchain technology for storing and sharing healthcare records. Future developments include implementing insurance policies as NFTs to ensure uniqueness and ownership, offering patients personalized insurance options, and predicting policy premiums using machine learning based on factors like age and location.",
        image: "/products/blockchain/mediwox/med1.png",
        media: [
            { type: "image", url: "/products/blockchain/mediwox/med1.png", alt: "Transcripts Verification System" },
            { type: "image", url: "/products/blockchain/mediwox/med2.png", alt: "Transcripts Verification System" },
            { type: "image", url: "/products/blockchain/mediwox/med3.png", alt: "Transcripts Verification System" },
            { type: "video", url: "/products/blockchain/mediwox/medi-wox-bc.mp4", alt: "Product Demo Video" },
        ],
        tags: ["Blockchain", "Healthcare", "Data Privacy", "Decentralized", "NFT", "Machine Learning"],
        documents: [
            { title: "Whitepaper", url: "/products/blockchain/mediwox/bproject3.pdf", type: "whitepaper" },
            // { title: "Technical Documentation", url: "/products/blockchain/woxsen-stock-exchange/bproject2.pdf", type: "documentation" },
        ],
        status: "Beta",
        technologies: ["Python", "Slither", "GPT-4", "Solidity"],
    },

    // Metaverse Products
    {
        id: "woxsen-campus-tour",
        name: "Woxsen Campus Tour",
        departmentId: "metaverse",
        tagline: "Interactive Smart Campus Hub",
        description: "The Woxsen Campus Tour is an interactive 3D virtual experience that enables users to explore the university's key facilities and infrastructure remotely. Functioning as a digital hub, it also integrates real-time data on solar energy generation, weather conditions, and other smart campus metrics—promoting innovation, sustainability, and enhanced user engagement.",
        image: "/products/metaverse/woxsen-campus-tour/pro1.png",
        media: [
            { type: "image", url: "/products/metaverse/woxsen-campus-tour/pro1.png", alt: "Woxsen Campus Tour" },
            { type: "video", url: "/products/metaverse/woxsen-campus-tour/woxsen-tour-mv.mp4", alt: "Product Demo Video" },
        ],
        tags: ["Blockchain", "Healthcare", "Data Privacy", "Decentralized", "NFT", "Machine Learning"],
        documents: [
            { title: "Whitepaper", url: "/products/metaverse/woxsen-campus-tour/mproject1.pdf", type: "whitepaper" },
            // { title: "Technical Documentation", url: "/products/blockchain/woxsen-stock-exchange/bproject2.pdf", type: "documentation" },
        ],
        status: "Production",
        technologies: ["Unity", "WebXR", "Photon", "Three.js"],
        demoUrl: "#",
    },
    {
        id: "surveillance-robot-training-simulation",
        name: "Surveillance Robot Training Simulation",
        departmentId: "metaverse",
        tagline: "VR Robot Operations Training",
        description: "This VR simulation for Meta Quest 2 trains users to operate a surveillance robot in realistic scenarios. It offers hands-on experience in assembling components and executing missions without physical hardware. The system enhances learning while reducing costs and operational risks.",
        image: "/products/metaverse/surveillance-robot-training-simulation/pro2.png",
        media: [
            { type: "image", url: "/products/metaverse/surveillance-robot-training-simulation/pro2.png", alt: "Surveillance Robot Training Simulation" },
            { type: "image", url: "/products/metaverse/surveillance-robot-training-simulation/ts1.png", alt: "Surveillance Robot Training Simulation" },
            { type: "image", url: "/products/metaverse/surveillance-robot-training-simulation/ts2.png", alt: "Surveillance Robot Training Simulation" },
            { type: "image", url: "/products/metaverse/surveillance-robot-training-simulation/ts3.png", alt: "Surveillance Robot Training Simulation" },
            { type: "image", url: "/products/metaverse/surveillance-robot-training-simulation/ts4.png", alt: "Surveillance Robot Training Simulation" },
            { type: "video", url: "/products/metaverse/surveillance-robot-training-simulation/surveillance-robot-training-simulation-mv.mp4", alt: "Product Demo Video" },
        ],
        tags: ["Blockchain", "Healthcare", "Data Privacy", "Decentralized", "NFT", "Machine Learning"],
        documents: [
            { title: "Whitepaper", url: "/products/metaverse/surveillance-robot-training-simulation/mproject2.pdf", type: "whitepaper" },
            // { title: "Technical Documentation", url: "/products/blockchain/woxsen-stock-exchange/bproject2.pdf", type: "documentation" },
        ],
        status: "Beta",
        technologies: ["ARKit", "ARCore", "Unity", "Cloud Anchors"],
    },
    {
        id: "ethix-verse",
        name: "Ethix Verse",
        departmentId: "metaverse",
        tagline: "Immersive Ethics Learning Metaverse",
        description: "Ethix Verse is an immersive metaverse-based platform that redefines how students learn about ethics. Designed specifically for Woxsen University, it leverages interactive gameplay, detailed simulations, and real-world dilemma scenarios to transform ethics from a traditional subject into a dynamic, memorable experience.",
        image: "/products/metaverse/ethixverse/ev1.png",
        media: [
            { type: "image", url: "/products/metaverse/ethixverse/ev1.png", alt: "Ethix Verse" },
            { type: "image", url: "/products/metaverse/ethixverse/ev2.png", alt: "Ethix Verse" },
            { type: "image", url: "/products/metaverse/ethixverse/ev3.png", alt: "Ethix Verse" },
            { type: "video", url: "/products/metaverse/ethixverse/ethix-verse-mv.mp4", alt: "Product Demo Video" },
        ],
        tags: ["Blockchain", "Healthcare", "Data Privacy", "Decentralized", "NFT", "Machine Learning"],
        documents: [
            { title: "Whitepaper", url: "/products/metaverse/ethixverse/mproject3.pdf", type: "whitepaper" },
            // { title: "Technical Documentation", url: "/products/blockchain/woxsen-stock-exchange/bproject2.pdf", type: "documentation" },
        ],
        status: "Production",
        technologies: ["Python", "PyTorch", "Blender", "WebGL"],
        demoUrl: "#",
    },
    {
        id: "ai-leadership-simulation",
        name: "AI Leadership Simulation",
        departmentId: "metaverse",
        tagline: "Immersive AI-Driven Leadership Training",
        description: "This VR platform delivers an immersive AI Leadership Simulation, enabling learners to explore leadership concepts through self-paced learning, real-time chatbot interaction, and integrated assessments. It combines VR and AI to provide personalized feedback and an engaging, adaptive learning experience for developing leadership skills across industries.",
        image: "/products/metaverse/ai-leadership-simulation/pro4.png",
        media: [
            { type: "image", url: "/products/metaverse/ai-leadership-simulation/pro4.png", alt: "AI Leadership Simulation" },
            { type: "video", url: "/products/metaverse/ai-leadership-simulation/ai-leadership-simulation-mv.mp4", alt: "Product Demo Video" },
        ],
        tags: ["Blockchain", "Healthcare", "Data Privacy", "Decentralized", "NFT", "Machine Learning"],
        documents: [
            { title: "Whitepaper", url: "/products/metaverse/ai-leadership-simulation/mproject4.pdf", type: "whitepaper" },
            // { title: "Technical Documentation", url: "/products/blockchain/woxsen-stock-exchange/bproject2.pdf", type: "documentation" },
        ],
        status: "Production",
        technologies: ["WebRTC", "Three.js", "MediaPipe", "WebXR"],
    },
    {
        id: "entrepreneurship-simulator",
        name: "Entrepreneurship Simulator",
        departmentId: "metaverse",
        tagline: "Interactive Entrepreneurship Training",
        description: "The Entrepreneurship Simulator offers hands-on training in a 3D interactive environment to enhance entrepreneurial skills like market comprehension and decision-making. With virtual mentorship from Dr. Kartik, it bridges theory and practice, receiving positive feedback for improving business understanding. Future expansions aim to enhance the learning experience.",
        image: "/products/metaverse/entrepreneurship-simulator/pro5.png",
        media: [
            { type: "image", url: "/products/metaverse/entrepreneurship-simulator/pro5.png", alt: "Entrepreneurship Simulator" },
            { type: "video", url: "/products/metaverse/entrepreneurship-simulator/entrepreneurship-simulator-mv.mp4", alt: "Product Demo Video" },
        ],
        tags: ["Blockchain", "Healthcare", "Data Privacy", "Decentralized", "NFT", "Machine Learning"],
        documents: [
            { title: "Whitepaper", url: "/products/metaverse/entrepreneurship-simulator/mproject5.pdf", type: "whitepaper" },
            // { title: "Technical Documentation", url: "/products/blockchain/woxsen-stock-exchange/bproject2.pdf", type: "documentation" },
        ],
        status: "Alpha",
        technologies: ["Unity", "Node.js", "MongoDB", "WebSocket"],
    },
    {
        id: "student-skill-enhancement",
        name: "Student Skill Enhancement (Meta+GenAI)",
        departmentId: "metaverse",
        tagline: "Immersive Learning Game",
        description: "This exciting quiz game makes learning fun and interactive for students. It supports up to 100 simultaneous participants and features a real-time scoreboard and user-friendly interface. The game transforms education into an interactive experience, fostering a positive spirit of competition and motivation.",
        image: "/products/metaverse/smart-quiz/pro6.png",
        media: [
            { type: "image", url: "/products/metaverse/smart-quiz/pro6.png", alt: "Smart Quiz" },
            { type: "video", url: "/products/metaverse/smart-quiz/smart-quiz-mv.mp4", alt: "Product Demo Video" },
        ],
        tags: ["Blockchain", "Healthcare", "Data Privacy", "Decentralized", "NFT", "Machine Learning"],
        documents: [
            { title: "Whitepaper", url: "/products/metaverse/smart-quiz/mproject6.pdf", type: "whitepaper" },
            // { title: "Technical Documentation", url: "/products/blockchain/woxsen-stock-exchange/bproject2.pdf", type: "documentation" },
        ],
        status: "Alpha",
        technologies: ["Unity", "Node.js", "MongoDB", "WebSocket"],
    },
    {
        id: "vr-telangana-cultural-exhibition",
        name: "VR Telangana Cultural Exhibition",
        departmentId: "metaverse",
        tagline: "Immersive Cultural Exchange",
        description: "The VR Telangana Cultural Exhibition enables students from Telangana to participate in virtual exchanges with students from around the world. Participants can explore each other's cultures through immersive VR experiences in classroom.",
        image: "/products/metaverse/vr-culture-exchange/pro7.png",
        media: [
            { type: "image", url: "/products/metaverse/vr-culture-exchange/pro7.png", alt: "VR Telangana Cultural Exhibition" },
            { type: "video", url: "/products/metaverse/vr-culture-exchange/VRTelangana.mp4", alt: "Product Demo Video" },
        ],
        tags: ["Metaverse", "Cultural Exchange", "Data Privacy", "EDTech - (Educational Technology)", "Hyderabad, Telangana", "Global Classroom"],
        documents: [
            { title: "Whitepaper", url: "/products/metaverse/vr-culture-exchange/mproject7.pdf", type: "whitepaper" },
            // { title: "Technical Documentation", url: "/products/blockchain/woxsen-stock-exchange/bproject2.pdf", type: "documentation" },
        ],
        status: "Alpha",
        technologies: ["Unity", "Node.js", "MongoDB", "WebSocket"],
    },
    {
        id: "virtual-mall",
        name: "Virtual Mall",
        departmentId: "metaverse",
        tagline: "VR Shopping Experience",
        description: "To tackle crowded spaces and limited accessibility in physical malls, Virtual Reality (VR) environments offer a solution. VR malls simulate shopping experiences without crowds, enhancing comfort and efficiency.",
        image: "/products/metaverse/virtual-mall/vrmall1.png",
        media: [
            { type: "image", url: "/products/metaverse/virtual-mall/vrmall1.png", alt: "Virtual Mall" },
            { type: "image", url: "/products/metaverse/virtual-mall/vrmall2.png", alt: "Virtual Mall" },
            { type: "image", url: "/products/metaverse/virtual-mall/vrmall3.png", alt: "Virtual Mall" },
            // { type: "video", url: "/products/metaverse/vrmall1.mp4", alt: "Product Demo Video" },
        ],
        tags: ["Blockchain", "Healthcare", "Data Privacy", "Decentralized", "NFT", "Machine Learning"],
        documents: [
            // { title: "Whitepaper", url: "/products/metaverse/woxsen-campus-tour/mproject1.pdf", type: "whitepaper" },
            // { title: "Technical Documentation", url: "/products/blockchain/woxsen-stock-exchange/bproject2.pdf", type: "documentation" },
        ],
        status: "Alpha",
        technologies: ["Unity", "Node.js", "MongoDB", "WebSocket"],
    },
    {
        id: "ar-based-historical-tours",
        name: "AR-Based Historical Tours",
        departmentId: "metaverse",
        tagline: "Interactive Historical Guide",
        description: "This AR app lets users explore Hyderabad's historical landmarks interactively. By scanning a location, like Charminar, with their phone's camera, 3D models and historical details appear on the screen. The app also provides information on nearby amenities, making it a convenient guide for tourists and enhancing cultural discovery with 16th-century insights.",
        image: "/products/metaverse/ar-based-historical-exploration/pro9.png",
        media: [
            { type: "image", url: "/products/metaverse/ar-based-historical-exploration/pro9.png", alt: "AR-Based Historical Tours" },
            { type: "video", url: "/products/metaverse/ar-based-historical-exploration/ar-based-historical-exploration-mv.mp4", alt: "Product Demo Video" },
        ],
        tags: ["Metaverse", "VR (Virtual Reality)", "SDGS (Sustainable Development Goals)", "Immersive Experience", "Sustainable", "Social Impact",],
        documents: [
            { title: "Whitepaper", url: "/products/metaverse/ar-based-historical-exploration/mproject9.pdf", type: "whitepaper" },
            // { title: "Technical Documentation", url: "/products/blockchain/woxsen-stock-exchange/bproject2.pdf", type: "documentation" },
        ],
        status: "Alpha",
        technologies: ["Unity", "Node.js", "MongoDB", "WebSocket"],
    },
    {
        id: "metaverse-odyssey-sdg",
        name: "Metaverse Odyssey (SDG)",
        departmentId: "metaverse",
        tagline: "Interactive Historical Guide",
        description: "This project utilizes virtual reality to promote Sustainable Development Goals (SDGs). It creates immersive experiences to raise awareness and drive action for global sustainability, fostering collaboration and leveraging technology for a better future.",
        image: "/products/metaverse/metaverse-odyssey/pro10.png",
        media: [
            { type: "image", url: "/products/metaverse/metaverse-odyssey/pro10.png", alt: "Metaverse Odyssey (SDG)" },
            { type: "video", url: "/products/metaverse/metaverse-odyssey/odyssey-sdg-mv.mp4", alt: "Product Demo Video" },
        ],
        tags: ["Metaverse", "VR (Virtual Reality)", "SDGS (Sustainable Development Goals)", "Immersive Experience", "Sustainable", "Social Impact",],
        documents: [
            { title: "Whitepaper", url: "/products/metaverse/metaverse-odyssey/mproject10.pdf", type: "whitepaper" },
            // { title: "Technical Documentation", url: "/products/blockchain/woxsen-stock-exchange/bproject2.pdf", type: "documentation" },
        ],
        status: "Alpha",
        technologies: ["Unity", "Node.js", "MongoDB", "WebSocket"],
    },
    {
        id: "mobile-bargaining-system-ai",
        name: "Mobile Bargaining System Using AI in Metaverse",
        departmentId: "metaverse",
        tagline: "Mobile Bargaining System Using AI in Metaverse",
        description: "This cutting-edge platform employs artificial intelligence to facilitate bargaining and negotiation within virtual reality environments accessible via mobile devices.",
        image: "/products/metaverse/mobile-bargaining/pro11.png",
        media: [
            { type: "image", url: "/products/metaverse/mobile-bargaining/pro11.png", alt: "Mobile Bargaining System Using AI in Metaverse" },
            { type: "video", url: "/products/metaverse/mobile-bargaining/mobile-bargaining-mv.mp4", alt: "Product Demo Video" },
        ],
        tags: ["AI (Artificial Intelligence)", "Mobile Bargaining", "Metaverse", "Mobile VR", "Mobile AR", "Virtual Reality", "Augmented Reality"],
        documents: [
            { title: "Whitepaper", url: "/products/metaverse/mobile-bargaining/mproject11.pdf", type: "whitepaper" },
            // { title: "Technical Documentation", url: "/products/blockchain/woxsen-stock-exchange/bproject2.pdf", type: "documentation" },
        ],
        status: "Alpha",
        technologies: ["Unity", "Node.js", "MongoDB", "WebSocket"],
    },
    {
        id: "law-chatbot",
        name: "Law ChatBot",
        departmentId: "metaverse",
        tagline: "Interactive Legal Learning",
        description: "This `Law ChatBot`` features a virtual AI avatar in the Metaverse acting as a law professor, explaining cases and recommending quizzes. The integrated quiz game adds an interactive dimension, scoring users based on their performance.",
        image: "/products/metaverse/law-chatbot/pro12.png",
        media: [
            { type: "image", url: "/products/metaverse/law-chatbot/pro12.png", alt: "Law ChatBot" },
            { type: "video", url: "/products/metaverse/law-chatbot/Justice.mp4", alt: "Product Demo Video" },
        ],
        tags: ["Law", "Chatbots", "AI Avatar", "Metaverse", "Interactive Learning", "Quiz Game"],
        documents: [
            { title: "Whitepaper", url: "/products/metaverse/law-chatbot/mproject12.pdf", type: "whitepaper" },
            // { title: "Technical Documentation", url: "/products/blockchain/woxsen-stock-exchange/bproject2.pdf", type: "documentation" },
        ],
        status: "Alpha",
        technologies: ["Unity", "Node.js", "MongoDB", "WebSocket"],
    },
    {
        id: "ai-insurance-agent",
        name: "AI Insurance Agent in Metaverse",
        departmentId: "metaverse",
        tagline: "Virtual AI Insurance Assistant",
        description: "This is a virtual assistant avatar powered by artificial intelligence that assists users with insurance-related inquiries and services within virtual reality environments. It provides personalized insurance advice and claims assistance, enhancing the insurance experience for users.",
        image: "/products/metaverse/ai-insurance-agent/pro13.png",
        media: [
            { type: "image", url: "/products/metaverse/ai-insurance-agent/pro13.png", alt: "AI Insurance Agent" },
            { type: "video", url: "/products/metaverse/ai-insurance-agent/ai-insurance-agent-mv.mp4", alt: "Product Demo Video" },
        ],
        tags: ["AI (Artificial Intelligence)", "Insurance", "Metaverse", "Virtual Assistant", "VR (Virtual Reality)", "AR (Augmented Reality)", "Customer Service"],
        documents: [
            { title: "Whitepaper", url: "/products/metaverse/ai-insurance-agent/mproject13.pdf", type: "whitepaper" },
            // { title: "Technical Documentation", url: "/products/blockchain/woxsen-stock-exchange/bproject2.pdf", type: "documentation" },
        ],
        status: "Alpha",
        technologies: ["Unity", "Node.js", "MongoDB", "WebSocket"],
    },
    {
        id: "jordana-ai",
        name: "Jordana AI",
        departmentId: "metaverse",
        tagline: "Conversational AI for 3D Characters",
        description: "Jordana AI is a real-time, automated multilingual conversational chatbot system designed for 3D characters. It leverages neural networks and tokenized intents data to overcome the limitations of existing chatbot technologies.",
        image: "/products/metaverse/jordana/Jordana.png",
        media: [
            { type: "image", url: "/products/metaverse/jordana/Jordana.png", alt: "Woxsen Campus Tour" },
            { type: "video", url: "/products/metaverse/jordana/jordana.mp4", alt: "Product Demo Video" },
        ],
        tags: ["AI (Artificial Intelligence)", "Chatbots", "Converationsal AI", "Multilingual", "3D Characters", "Neural Networks", "Tokenized Intents"],
        documents: [
            { title: "Whitepaper", url: "/products/metaverse/jordana/mproject14.pdf", type: "whitepaper" },
            // { title: "Technical Documentation", url: "/products/blockchain/woxsen-stock-exchange/bproject2.pdf", type: "documentation" },
        ],
        status: "Alpha",
        technologies: ["Unity", "Node.js", "MongoDB", "WebSocket"],
    },
    {
        id: "ar-employee-profile-viewer",
        name: "AR Employee Profile Viewer",
        departmentId: "metaverse",
        tagline: "Dynamic AR Profile System",
        description: "This Augmented Reality (AR) based Employee Profile Management System streamlines employee identification by providing real-time employee information through an AR interface. It fosters a more dynamic and interactive work environment by leveraging advanced technologies.",
        image: "/products/metaverse/ar-employee-viewer/pro15.png",
        media: [
            { type: "image", url: "/products/metaverse/ar-employee-viewer/pro15.png", alt: "AR Employee Profile Viewer" },
            { type: "video", url: "/products/metaverse/ar-employee-viewer/ar-employee-viewer-mv.mp4", alt: "Product Demo Video" },
        ],
        tags: ["(AR) Augmented Reality", "Employee Management", "Real-Time Data", "Interactive", "Workplace Technoology", "Profile Viewer"],
        documents: [
            { title: "Whitepaper", url: "/products/metaverse/ar-employee-viewer/mproject15.pdf", type: "whitepaper" },
            // { title: "Technical Documentation", url: "/products/blockchain/woxsen-stock-exchange/bproject2.pdf", type: "documentation" },
        ],
        status: "Alpha",
        technologies: ["Unity", "ARKit", "ARCore", "Vuforia"],
    },

    // Robotics Products
    {
        id: "surveillance-robot",
        name: "Surveillance Robot",
        departmentId: "robotics",
        tagline: "Autonomous Robotic Surveillance",
        description: "This autonomous surveillance robot is powered by a Jetson Nano, Arduino, Lidar, and mecanum wheels for real-time video transmission. It utilizes a camera for live monitoring and Rplidar for human detection and obstacle avoidance. This system ensures efficient, autonomous navigation for enhanced surveillance.",
        image: "/products/robotics/surveillance-robot/rpro3.png",
        media: [
            { type: "image", url: "/products/robotics/surveillance-robot/rpro3.png", alt: "AR Employee Profile Viewer" },
            { type: "video", url: "/products/robotics/surveillance-robot/surveillance-robot-rt.mp4", alt: "Product Demo Video" },
        ],
        "tags": [
            "Autonomous Robot",
            "Robot Surveillance",
            "Jetson Nano",
            "LiDAR",
            "Obstacle Avoidance",
            "Real-Time Video",
            "Computer Vision",
            "Robotics",
            "Edge AI",
            "Autonomous Navigation",
            "Security Robotics"
        ],
        documents: [
            { title: "Whitepaper", url: "/products/robotics/surveillance-robot/rproject1.pdf", type: "whitepaper" },
            // { title: "Technical Documentation", url: "/products/blockchain/woxsen-stock-exchange/bproject2.pdf", type: "documentation" },
        ],
        status: "Production",
        technologies: ["ROS2", "Python", "SLAM", "Computer Vision"],
        demoUrl: "#",
    },
    {
        id: "iron-man-suit",
        name: "Iron Man Suit",
        departmentId: "robotics",
        tagline: "Automated Fire Response System",
        description: "This system uses sensors to detect fires early and automatically dispatches robots to stop them. It is controlled by a special wearable Iron Man Suit and features a helpful voice assistant called Woximus for information and guidance during emergencies.",
        image: "/products/robotics/ironman-suit/rpro2.png",
        media: [
            { type: "image", url: "/products/robotics/ironman-suit/rpro2.png", alt: "AR Employee Profile Viewer" },
            { type: "image", url: "/products/robotics/ironman-suit/IronMan1.png", alt: "AR Employee Profile Viewer" },
            { type: "image", url: "/products/robotics/ironman-suit/IronMan2.png", alt: "AR Employee Profile Viewer" },
            { type: "image", url: "/products/robotics/ironman-suit/IronMan3.png", alt: "AR Employee Profile Viewer" },
            { type: "video", url: "/products/robotics/ironman-suit/iron-man-rt.mp4", alt: "Product Demo Video" },
        ],
        "tags": [
            "Fire Safety",
            "Robotics",
            "Wearable Technology",
            "Emergency Response",
            "Voice Assistant",
            "Automation",
            "Disaster Management",
            "Rescue Technology",
            "Smart Safety",
            "AI Assistance"
        ],
        documents: [
            { title: "Whitepaper", url: "/products/robotics/ironman-suit/rproject2.pdf", type: "whitepaper" },
            // { title: "Technical Documentation", url: "/products/blockchain/woxsen-stock-exchange/bproject2.pdf", type: "documentation" },
        ],
        status: "Beta",
        technologies: ["PX4", "ROS", "Computer Vision", "5G"],
    },
    {
        id: "iot-based-bp-and-spo2-monitoring-device",
        name: "IoT Based BP and SpO2 Monitoring Device",
        departmentId: "robotics",
        tagline: "Affordable Remote Health Monitoring",
        description: "An affordable IoT-enabled pulse oximeter with a mobile app allows users to monitor heart rate and oxygen levels in real-time via smartphones. This accessible solution promotes regular health tracking and early intervention. Ideal for improving public health and reducing healthcare costs.",
        image: "/products/robotics/iot-based-blood-pressure-and-spo2-monitoring-device/rpro1.png",
        media: [
            { type: "image", url: "/products/robotics/iot-based-blood-pressure-and-spo2-monitoring-device/rpro1.png", alt: "AR Employee Profile Viewer" },
            { type: "image", url: "/products/robotics/iot-based-blood-pressure-and-spo2-monitoring-device/Oxy.png", alt: "AR Employee Profile Viewer" },
            { type: "video", url: "/products/robotics/iot-based-blood-pressure-and-spo2-monitoring-device/iot-based-blood-pressure-and-spo2-monitoring-device-rt.mp4", alt: "AR Employee Profile Viewer" },
        ],
        "tags": [
            "IoT",
            "Internet of Things",
            "HealthTech",
            "Pulse Oximeter",
            "SpO2 Monitoring",
            "Heart Rate Monitoring",
            "Real-Time Monitoring",
            "Remote Health Monitoring",
            "Mobile App",
            "Digital Health",
            "Wearable Health"
        ],
        documents: [
            { title: "Whitepaper", url: "/products/robotics/iot-based-blood-pressure-and-spo2-monitoring-device/rproject3.pdf", type: "whitepaper" },
            // { title: "Technical Documentation", url: "/products/blockchain/woxsen-stock-exchange/bproject2.pdf", type: "documentation" },
        ],
        status: "Production",
        technologies: ["Python", "PyTorch", "ROS", "MoveIt"],
    },
    {
        id: "third-eye",
        name: "3RD Eye: OpenCV based robot navigation",
        departmentId: "robotics",
        tagline: "Third-View Robot Navigation",
        description: "This is a third-person view perspective system for path planning of a self-maneuverable device, utilizing either a webcam or an IP camera.",
        image: "/products/robotics/third-eye/rpro4.png",

        media: [
            { type: "image", url: "/products/robotics/third-eye/rpro4.png", alt: "AR Employee Profile Viewer" },
            { type: "image", url: "/products/robotics/third-eye/eye1.png", alt: "AR Employee Profile Viewer" },
            { type: "image", url: "/products/robotics/third-eye/eye2.png", alt: "AR Employee Profile Viewer" },
            { type: "image", url: "/products/robotics/third-eye/eye3.png", alt: "AR Employee Profile Viewer" },
            { type: "video", url: "/products/robotics/third-eye/third-eye-rt.mp4", alt: "Product Demo Video" },
        ],
        "tags": [
            "OpenCV",
            "Robot Navigation",
            "Path Planning",
            "Computer Vision",
            "Third-Person View",
            "Autonomous Device",
            "Robotics",
            "AI Navigation",
            "Visual Guidance",
            "Autonomous Systems"

        ],
        documents: [
            { title: "Whitepaper", url: "/products/robotics/third-eye/rproject4.pdf", type: "whitepaper" },
            // { title: "Technical Documentation", url: "/products/blockchain/woxsen-stock-exchange/bproject2.pdf", type: "documentation" },
        ], status: "Production",
        technologies: ["ROS", "OpenCV", "Tensor RT", "LoRa"],
    },


    // AI & Machine Learning Products
    {
        id: "multilingual-chatbot",
        name: "Multilingual Chatbot",
        departmentId: "ai-ml",
        tagline: "Seamless Cross-Language Conversation",
        description: "An advanced NLP application, this Multilingual Chatbot enables seamless cross-language communication by understanding and responding in a user's preferred language. Core features include real-time language detection, automatic translation, context-aware interactions, and customizable responses. The system is built on an extensible architecture that supports external API integrations and user session management. This design allows for the easy addition of new features and languages, ensuring the chatbot can evolve with growing demands. NLP (Natural Language Processing)",
        image: "/products/artificialintelligence/multilingual-chatbot/apro1.png",
        media: [
            { type: "image", url: "/products/artificialintelligence/multilingual-chatbot/apro1.png", alt: "Multilingual Chatbot Interface" },
            { type: "video", url: "/products/artificialintelligence/multilingual-chatbot/multilingual-chatbot-ai.mp4", alt: "Product Demo Video" },
        ],
        tags: ["Chatbot", "Multilingual", "NLP", "Automatic Translation", "Converational AI", "Context-Aware"],
        documents: [
            { title: "Whitepaper", url: "/products/artificialintelligence/multilingual-chatbot/project1.pdf", type: "whitepaper" },
        ],
        status: "Production",
        technologies: ["PyTorch", "BERT", "FastAPI", "Redis"],
        demoUrl: "#",
        githubUrl: "#",
    },
    {
        id: "ai-podcast-generator",
        name: "AI Podcast Generator",
        departmentId: "ai-ml",
        tagline: "AI-Driven Audio Content Creation",
        description: "The AI Podcast Generator is a web application that transforms user-provided content into engaging audio podcasts. Users can initiate the process by either uploading PDF files or simply inputting a specific topic. The application leverages AI models to process the content, performing summarization, generating discussion points, and converting the text to speech. Users can further enhance their podcasts by integrating background music and utilizing voice cloning features for a customized listening experience.",
        image: "/products/artificialintelligence/ai-podcast-generator/apro2.png",
        status: "Alpha",
        media: [
            { type: "image", url: "/products/artificialintelligence/ai-podcast-generator/apro2.png", alt: "AI Podcast Generator Interface" },
            { type: "video", url: "/products/artificialintelligence/ai-podcast-generator/ai-podcast-generator-ai.mp4", alt: "Product Demo Video" },
        ],
        tags: ["AI Audio", "Podcast Generation", "Text-to-Speech", "Content Creation", "Voice Cloning", "Audio Processing"],
        documents: [
            { title: "Whitepaper", url: "/products/artificialintelligence/ai-podcast-generator/project2.pdf", type: "whitepaper" },
        ],
        technologies: ["Python", "OpenAI", "FastAPI", "LangChain"],
        demoUrl: "#",
    },
    {
        id: "social-wall",
        name: "Social Wall",
        departmentId: "ai-ml",
        tagline: "Real-Time Event Engagement Hub",
        description: "This automation tool enhances real-time event engagement by extracting and visualizing social media posts. It aggregates this content into a user-friendly dashboard and supports dynamic updates, allowing for immediate audience interaction during live events.",
        image: "/products/artificialintelligence/social-wall/apro3.png",
        status: "Alpha",
        media: [
            { type: "image", url: "/products/artificialintelligence/social-wall/apro3.png", alt: "Social Wall Dashboard" },
            { type: "video", url: "/products/artificialintelligence/social-wall/social-wall-ai.mp4", alt: "Product Demo Video" },
        ],
        tags: ["Social Media", "Event Engagement", "Real-Time Updates", "Dashboard", "Automation", "Content Aggregation"],
        documents: [
            { title: "Whitepaper", url: "/products/artificialintelligence/social-wall/project3.pdf", type: "whitepaper" },
        ],
        technologies: ["Python", "OpenAI", "FastAPI", "LangChain"],
        demoUrl: "#",
    },
    {
        id: "full-proof-attendance-system",
        name: "Full Proof Attendance System",
        departmentId: "ai-ml",
        tagline: "Secure IoT Attendance Tracking",
        description: "This system utilizes a wireless camera to gather facial data, which is triggered only after verifying mapped fingerprint data. All intensive processing is handled by a server or cloud infrastructure. The system provides precise attendance tracking in real-time, delivering updates directly through an IoT-enabled Android app.",
        image: "/products/artificialintelligence/full-proof-attendance-system/apro4.png",
        status: "Alpha",
        media: [
            { type: "image", url: "/products/artificialintelligence/full-proof-attendance-system/apro4.png", alt: "Attendance System Overview" },
            { type: "image", url: "/products/artificialintelligence/full-proof-attendance-system/fullatt1.png", alt: "Attendance System Interface 1" },
            { type: "image", url: "/products/artificialintelligence/full-proof-attendance-system/fullatt2.png", alt: "Attendance System Interface 2" },
            { type: "video", url: "/products/artificialintelligence/full-proof-attendance-system/attendance-system-ai.mp4", alt: "Product Demo Video" },
        ],
        "tags": [
            "IoT",
            "Internet of Things",
            "Biometrics",
            "Biometric Attendance System",
            "Attendance System",
            "Facial Recognition",
            "Face Recognition",
            "Fingerprint Verification",
            "Fingerprint Authentication",
            "Smart Attendance",
            "Automated Attendance",
            "Android App",
            "Mobile Application",
            "IoT Attendance",
            "Secure Attendance",
            "Real-Time Attendance",
            "Digital Attendance System"
        ],
        documents: [
            { title: "Whitepaper", url: "/products/artificialintelligence/full-proof-attendance-system/project4.pdf", type: "whitepaper" },
        ],
        technologies: ["Python", "OpenCV", "IoT", "Android"],
        demoUrl: "#",
    },
    {
        id: "airport-assist",
        name: "Airport Assist",
        departmentId: "ai-ml",
        tagline: "All-in-One Travel Assistant",
        description: "This comprehensive travel companion enables secure registration, seamless ticket booking, and sends automated reminders via email or SMS. On the day of travel, users access real-time airport directions, explore services like lounges, VR zones, and food courts, and receive personalized recommendations.",
        image: "/products/artificialintelligence/airport-assist/apro5.png",
        status: "Alpha",
        media: [
            { type: "image", url: "/products/artificialintelligence/airport-assist/apro5.png", alt: "Airport Assist Overview" },
            { type: "image", url: "/products/artificialintelligence/airport-assist/Airport1.png", alt: "Airport Assist Interface" },
            { type: "video", url: "/products/artificialintelligence/airport-assist/Airport.mp4", alt: "Product Demo Video" },
        ],
        "tags": [
            "Travel App",
            "Airport Navigation",
            "Ticket Booking",
            "Flight Booking",
            "Real-Time Updates",
            "Live Travel Updates",
            "Personalized Recommendations",
            "Travel Companion",
            "Smart Travel",
            "Digital Travel Assistant",
            "Journey Planner",
            "Travel Management"
        ],
        documents: [
            { title: "Whitepaper", url: "/products/artificialintelligence/airport-assist/project5.pdf", type: "whitepaper" },
        ],
        technologies: ["Python", "Flutter", "Firebase", "Google Maps API"],
        demoUrl: "#",
    },
    {
        id: "cricket-ball-analytics",
        name: "Cricket Ball Analytics",
        departmentId: "ai-ml",
        tagline: "Real-Time Cricket Ball Tracking",
        description: "This project features automated ball trajectory detection with real-time path visualization. It leverages state-of-the-art object detection models, including Detectron2, EfficientDet, and RetinaNet, to accurately track the cricket ball's movement. The system is designed to perform robustly even amidst challenging conditions such as high velocity, occlusions, and varying lighting.",
        image: "/products/artificialintelligence/cricket-ball-analytics/apro7.png",
        status: "Alpha",
        media: [
            { type: "image", url: "/products/artificialintelligence/cricket-ball-analytics/apro7.png", alt: "Cricket Ball Analytics Overview" },
            { type: "image", url: "/products/artificialintelligence/cricket-ball-analytics/ball1.png", alt: "Ball Tracking Interface 1" },
            { type: "image", url: "/products/artificialintelligence/cricket-ball-analytics/ball2.png", alt: "Ball Tracking Interface 2" },
            { type: "video", url: "/products/artificialintelligence/cricket-ball-analytics/full-ball-sports-analytics-ai.mp4", alt: "Product Demo Video" },
        ],
        "tags": [
            "Object Detection",
            "Computer Vision",
            "Trajectory Tracking",
            "Sports Analytics",
            "Real-Time Analytics",
            "Real-Time Processing",
            "Detectron2",
            "AI Vision",
            "Video Analysis",
            "Motion Tracking",
            "Deep Learning"
        ],
        documents: [
            { title: "Whitepaper", url: "/products/artificialintelligence/cricket-ball-analytics/project7.pdf", type: "whitepaper" },
        ],
        technologies: ["Python", "Detectron2", "OpenCV", "TensorFlow"],
        demoUrl: "#",
    },
    {
        id: "embedded-marketing",
        name: "Embedded Marketing",
        departmentId: "ai-ml",
        tagline: "AI-Powered Marketing Integration",
        description: "This intelligent marketing system seamlessly integrates promotional content into various digital platforms. It uses advanced AI algorithms to analyze user behavior and context to deliver personalized marketing messages at optimal moments, ensuring high engagement while maintaining a non-intrusive user experience.",
        image: "/products/artificialintelligence/embedded-marketing/apro8.png",
        status: "Alpha",
        media: [
            { type: "image", url: "/products/artificialintelligence/embedded-marketing/apro8.png", alt: "Embedded Marketing Overview" },
            { type: "image", url: "/products/artificialintelligence/embedded-marketing/EmbeddedMarketing1.png", alt: "Marketing Interface 1" },
            { type: "image", url: "/products/artificialintelligence/embedded-marketing/EmbeddedMarketing2.png", alt: "Marketing Interface 2" },
            { type: "video", url: "/products/artificialintelligence/embedded-marketing/embedded-marketing-ai.mp4", alt: "Product Demo Video" },
        ],
        "tags": [
            "Embedded Marketing",
            "AI Marketing",
            "Personalization",
            "User Behavior Analysis",
            "Digital Advertising",
            "Marketing Automation",
            "Context-Aware Marketing",
            "Engagement Optimization"
        ],
        documents: [
            { title: "Whitepaper", url: "/products/artificialintelligence/embedded-marketing/project8.pdf", type: "whitepaper" },
        ],
        technologies: ["Python", "Machine Learning", "React", "Node.js"],
        demoUrl: "#",
    },
    {
        id: "ocr",
        name: "PDF to CSV",
        departmentId: "ai-ml",
        tagline: "Intelligent Document Data Extraction",
        description: "Advanced OCR system that automatically extracts structured data from PDF documents and converts it into CSV format. The system uses state-of-the-art text recognition and table detection algorithms to accurately parse complex documents, making data extraction fast and efficient for business intelligence and analytics.",
        image: "/products/artificialintelligence/ocr/apro6.png",
        status: "Alpha",
        media: [
            { type: "image", url: "/products/artificialintelligence/ocr/apro6.png", alt: "OCR System Overview" },
            { type: "video", url: "/products/artificialintelligence/ocr/ocr-ai.mp4", alt: "Product Demo Video" },
        ],
        "tags": [
            "OCR",
            "Document Processing",
            "Data Extraction",
            "PDF Processing",
            "CSV Conversion",
            "Text Recognition",
            "Table Detection",
            "Automation",
            "Business Intelligence",
            "Document Analytics"
        ],
        documents: [
            { title: "Whitepaper", url: "/products/artificialintelligence/ocr/project6.pdf", type: "whitepaper" },
        ],
        technologies: ["Python", "Tesseract", "PyPDF2", "Pandas"],
        demoUrl: "#",
    },

]

// Helper functions
export function getDepartmentBySlug(slug: string): Department | undefined {
    return departments.find((d) => d.slug === slug)
}

export function getProductsByDepartment(departmentId: string): Product[] {
    return products.filter((p) => p.departmentId === departmentId)
}

export function getProductById(id: string): Product | undefined {
    return products.find((p) => p.id === id)
}

export function getProductCountByDepartment(departmentId: string): number {
    return products.filter((p) => p.departmentId === departmentId).length
}
