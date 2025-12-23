"use client"

import { useState } from "react"
import { PageShell } from "@/components/page-shell"
import { PageHeader } from "@/components/page-header"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Twitter, Linkedin, ExternalLink, X, Plus, Minus } from "lucide-react"
import { BlurImage } from "@/components/blur-image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

// FAQ Accordion Item Component
function FAQItem({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "group border-b border-black/5 transition-all duration-500",
        isOpen ? "bg-black/[0.02]" : "hover:bg-black/[0.01]"
      )}
    >
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left transition-colors"
      >
        <span className={cn(
          "text-lg font-medium tracking-tight transition-colors duration-300",
          isOpen ? "text-accent" : "text-black/80 group-hover:text-black"
        )}>
          {question}
        </span>
        <div className={cn(
          "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300",
          isOpen ? "bg-black border-black text-white rotate-45" : "border-black/10 group-hover:border-black/20"
        )}>
          <Plus className="w-5 h-5" />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 text-black/60 leading-relaxed font-medium max-w-3xl">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

interface TeamMember {
  name: string
  role: string
  department: string
  bio: string
  image: string
  email: string
  twitter?: string
  linkedin?: string
}

const teamMembers: TeamMember[] = [
  // Strategic Advisors
  {
    name: "Dr. Raul V. Rodriguez",
    role: "Vice President, Woxsen University",
    department: "Leadership",
    bio: "Leading research in explainable AI and neural architecture search.",
    image: "/teams/strategic-advisors/01.png",
    email: "advisor1@airc.edu",
    linkedin: "raulvillamarinrodriguez",
  },
  {
    name: "Dr. K Hemachandran",
    role: "Director, AI Research Center",
    department: "Leadership",
    bio: "Pioneering quantum algorithms for optimization.",
    image: "/teams/strategic-advisors/02.png",
    email: "advisor2@airc.edu",
    linkedin: "drhemachandrank",
  },
  {
    name: "Dr. Rajesh Kumar K V",
    role: "CTO, AI Research Center",
    department: "Leadership",
    bio: "Expert in AI governance and policy.",
    image: "/teams/strategic-advisors/03.png",
    email: "advisor3@airc.edu",
    linkedin: "kvrkkumar",
  },
  {
    name: "Dr. Peplluis Esteva",
    role: "Full Professor of Blockchain and AI Executive Dean",
    department: "Leadership",
    bio: "Specializing in sustainable AI solutions.",
    image: "/teams/strategic-advisors/04.png",
    email: "advisor4@airc.edu",
    linkedin: "peplluis",
  },
  {
    name: "Ravindra Barlingay",
    role: "Vice President - AI, IoT & Robotics Brane Enterprises",
    department: "Leadership",
    bio: "Building partnerships with industry leaders.",
    image: "/teams/strategic-advisors/5.jpg",
    email: "advisor5@airc.edu",
    linkedin: "ravindrabarlingay",
  },
  {
    name: "Prof. Abejide Ade-Ibijola",
    role: "Johannesburg Business School Brane Enterprises",
    department: "Leadership",
    bio: "Guiding research direction and strategy.",
    image: "/teams/strategic-advisors/6.jpg",
    email: "advisor6@airc.edu",
    linkedin: "abejide",
  },
  {
    name: "Mr. Pranesh Misra",
    role: "Chairman & Managing Director Brandscapes Worldwide, Mumbai",
    department: "Leadership",
    bio: "Leading innovation initiatives.",
    image: "/teams/strategic-advisors/7.jpg",
    email: "advisor7@airc.edu",
    linkedin: "advisor7",
  },
  {
    name: "Dmitry Spodarets",
    role: "Founder & Chief Editor Data, Phoenix",
    department: "Leadership",
    bio: "Expert in machine learning systems.",
    image: "/teams/strategic-advisors/8.jpg",
    email: "advisor8@airc.edu",
    linkedin: "spodarets",
  },
  {
    name: "Manjeet Rege",
    role: "Professor and Chair - Department of Software Engineering",
    department: "Leadership",
    bio: "Specializing in AI ethics.",
    image: "/teams/strategic-advisors/09.png",
    email: "advisor9@airc.edu",
    linkedin: "manjeetrege",
  },
  {
    name: "Billa Bhandari",
    role: "Founder & CEO - VitalProbe, Inc.",
    department: "Leadership",
    bio: "Building global research collaborations.",
    image: "/teams/strategic-advisors/10.jpg",
    email: "advisor10@airc.edu",
    linkedin: "vinaysolanki",
  },
  {
    name: "Vinay Solanki",
    role: "Business Head, Nash Tech Labs",
    department: "Leadership",
    bio: "Expert in deep learning architectures.",
    image: "/teams/strategic-advisors/11.jpg",
    email: "advisor11@airc.edu",
    linkedin: "vinaysolanki",
  },
  {
    name: "Rahul Sethi",
    role: "Metaverse Expert & Founder",
    department: "Leadership",
    bio: "Leading quantum computing initiatives.",
    image: "/teams/strategic-advisors/12.jpg",
    email: "advisor12@airc.edu",
    linkedin: "rsethi",
  },
  {
    name: "Dr. D. P. Kothari",
    role: "Advisor to the Chancellor - VIT University",
    department: "Leadership",
    bio: "Expert in robotics and automation.",
    image: "/teams/strategic-advisors/13.png",
    email: "advisor13@airc.edu",
    linkedin: "dr-d-p-kothari-3545612",
  },
  {
    name: "Dr. Harshini Errabelli",
    role: "Founder & Director - Sleep Therapeutics Interventional Pulmonologist & Sleep specialist",
    department: "Leadership",
    bio: "Specializing in NLP and language models.",
    image: "/teams/strategic-advisors/14.jpg",
    email: "advisor14@airc.edu",
    linkedin: "harshini-errabelli-91b8a747",
  },
  {
    name: "Dr. Raghu Mangaraju",
    role: "Senior Vice President, India Delivery Center at Blend360.",
    department: "Leadership",
    bio: "Building AI education programs.",
    image: "/teams/strategic-advisors/15.png",
    email: "advisor15@airc.edu",
    linkedin: "advisor15",
  },
  {
    name: "Srimannarayana",
    role: "President - ASHRAE Singapore Chapter.",
    department: "Leadership",
    bio: "Expert in computer vision.",
    image: "/teams/strategic-advisors/16.png",
    email: "advisor16@airc.edu",
    linkedin: "srimanncvk",
  },
  // Engineers
  {
    name: "Janumula Madhav",
    role: "Junior Robotics Engineer",
    department: "Engineering",
    bio: "Building production ML systems.",
    image: "/teams/engineers/Madhav.jpg",
    email: "madhav@airc.edu",
    linkedin: "madhav",
  },
  {
    name: "Pankaj Kumar Singh",
    role: "Senior AI Engineer",
    department: "Engineering",
    bio: "Full-stack developer and ML engineer.",
    image: "/teams/engineers/Pankaj Kumar Singh.jpg",
    email: "pankaj@airc.edu",
    linkedin: "pankaj-kumar-singh",
  },
  {
    name: "Samir Anil Jumade",
    role: "Senior Blockchain Engineer",
    department: "Engineering",
    bio: "Specializing in scalable infrastructure.",
    image: "/teams/engineers/Samir Anil Jumade.jpg",
    email: "samir@airc.edu",
    linkedin: "samir-anil-jumade",
  },
  {
    name: "Sobit Prasad",
    role: "Full Stack Developer",
    department: "Engineering",
    bio: "Building AI-powered applications.",
    image: "/teams/engineers/Sobit Prasad.jpg",
    email: "sobit@airc.edu",
    linkedin: "sobit-prasad",
  },
  {
    name: "Vishal Sharma",
    role: "Senior Project Engineer",
    department: "Engineering",
    bio: "Expert in backend systems.",
    image: "/teams/engineers/Vishal Sharma.jpg",
    email: "vishal@airc.edu",
    linkedin: "vishal-sharma",
  },
  {
    name: "Yash",
    role: "Metaverse Engineer",
    department: "Engineering",
    bio: "Frontend developer and UI specialist.",
    image: "/teams/engineers/yash.jpg",
    email: "yash@airc.edu",
    linkedin: "yash",
  },
]

const departments = ["View all", "Leadership", "Research", "Engineering", "Education"]

interface TeamMemberCardProps {
  member: TeamMember
  onViewDetails: (member: TeamMember) => void
}

function TeamMemberCard({ member, onViewDetails }: TeamMemberCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      layout
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.05 : 1,
          zIndex: isHovered ? 10 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative bg-white rounded-lg border-1 border-black/5 overflow-hidden shadow-none hover:shadow-xs transition-shadow duration-300"
      >
        {/* Image */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
          <BlurImage
            src={member.image}
            alt={member.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Unified Name, Role & Expandable Content */}
        <div className="absolute bottom-0 left-0 right-0 p-2">
          <motion.div
            animate={{
              height: isHovered ? "auto" : "auto",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white/70 rounded-lg px-4 py-3 backdrop-blur-xl shadow-none border-1 border-black/5 overflow-hidden"
          >
            {/* Always visible: Name & Role */}
            <h3 className="font-semibold text-foreground text-sm">{member.name}</h3>
            <p className="text-xs text-muted-foreground">{member.role}</p>

            {/* Expandable: Bio & Social Links */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                  animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <p className="text-xs text-foreground/70 mb-3 line-clamp-2">{member.bio}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                      <a
                        href={`mailto:${member.email}`}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                        aria-label={`Email ${member.name}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                      {member.twitter && (
                        <a
                          href={`https://twitter.com/${member.twitter}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground transition-colors hover:text-foreground"
                          aria-label={`${member.name} on Twitter`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Twitter className="h-4 w-4" />
                        </a>
                      )}
                      {member.linkedin && (
                        <a
                          href={`https://linkedin.com/in/${member.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground transition-colors hover:text-foreground"
                          aria-label={`${member.name} on LinkedIn`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onViewDetails(member)
                      }}
                      className="flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function TeamsPage() {
  const [activeFilter, setActiveFilter] = useState("View all")
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

  const filteredMembers = activeFilter === "View all"
    ? teamMembers
    : teamMembers.filter(member => member.department === activeFilter)

  return (
    <PageShell mainClassName="flex-1 bg-white px-2 md:px-16">
      <PageHeader
        title="Our Team"
        description="World-class researchers, engineers, and educators united by a mission to advance technology for the benefit of humanity."
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "Team" }
        ]}
        className="relative overflow-hidden"
      >
        <div className="relative z-10 flex gap-2 py-4 overflow-x-auto scrollbar-hide">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setActiveFilter(dept)}
              className={cn(
                "px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 relative overflow-hidden",
                activeFilter === dept
                  ? "text-white bg-black ring-4 ring-black/5"
                  : "text-black/40 hover:text-black bg-black/[0.03] hover:bg-black/[0.05]"
              )}
            >
              {dept}
            </button>
          ))}
        </div>
      </PageHeader>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 relative"
      >
        {/* Background Decorative Elements */}
        <div className="absolute inset-x-0 -top-24 h-96 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none -z-10 blur-[100px]" />

        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredMembers.map((member) => (
              <TeamMemberCard
                key={member.email}
                member={member}
                onViewDetails={setSelectedMember}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No team members found in this department.</p>
          </div>
        )}
      </motion.div>

      <section className="bg-black text-white py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-10" />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-24 bottom-0 w-96 h-96 bg-accent/20 blur-[120px] rounded-full"
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-px bg-accent/50" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-accent">Career Sanctuary</span>
              <div className="w-12 h-px bg-accent/50" />
            </div> */}
            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter mb-8 ">
              Join Our <span className="text-accent underline underline-offset-8 decoration-1">Future</span>
            </h2>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
              We're always looking for passionate individuals who want to make a difference in AI research and education. Join us in shaping the future of technology.
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <Link
                href="/careers"
                className="group relative px-10 py-4 bg-white  text-sm font-medium text-black  rounded-full transition-all hover:scale-105 hover:bg-accent hover:text-white"
              >
                View Open Positions
              </Link>
              <Link
                href="/contact"
                className="group px-10 py-4 border border-white/20 text-white text-sm   rounded-full transition-all hover:bg-white hover:text-black"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6 relative overflow-hidden bg-white border-t border-black/5">
        <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

        {/* Decorative Elements */}
        <div className="absolute left-0 top-0 bottom-0 w-[200px] bg-diagonal-hatch opacity-20 [mask-image:linear-gradient(to_right,black,transparent)] pointer-events-none hidden md:block" />
        <div className="absolute right-0 top-0 bottom-0 w-[200px] bg-diagonal-hatch opacity-20 [mask-image:linear-gradient(to_left,black,transparent)] pointer-events-none hidden md:block" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="mb-20">

            <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-black mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-black/60 font-medium max-w-xl leading-relaxed text-lg">
              Everything you need to know about joining our research sanctuary and the culture that drives us.
            </p>
          </div>

          <div className="border-t border-black/5">
            {[
              {
                question: "What is the work culture like at AIRC?",
                answer: "We foster a collaborative, research-driven environment where curiosity is encouraged. Our team values open communication, continuous learning, and work-life balance. We believe in giving our researchers and engineers the freedom to explore innovative ideas."
              },
              {
                question: "Do you offer remote work options?",
                answer: "Yes! We embrace a hybrid work model. Many of our team members work remotely, while our offices serve as collaboration hubs for those who prefer in-person interaction. We provide all the tools needed for seamless remote collaboration."
              },
              {
                question: "What growth opportunities are available?",
                answer: "We invest heavily in our team's development through mentorship programs, conference attendance, publication support, and internal workshops. Many of our researchers have grown into leadership positions within the organization."
              },
              {
                question: "How can I apply for a position?",
                answer: "Visit our Careers page to see current openings. If you don't see a role that fits, you can also submit a general application. We review all applications and reach out when there's a good match."
              },
              {
                question: "Do you offer internships or research fellowships?",
                answer: "Absolutely! We run competitive internship and fellowship programs for students and early-career researchers. These programs provide hands-on experience working alongside our senior researchers on cutting-edge projects."
              }
            ].map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaqIndex === index}
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
              />
            ))}
          </div>

          <div className="mt-24 p-12 bg-black rounded-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-noise opacity-10" />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-24 -top-24 w-64 h-64 bg-accent/30 blur-[60px] rounded-full"
            />

            <div className="relative z-10 flex flex-col items-center text-center">
              <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-white mb-4">
                Still have questions?
              </h3>
              <p className="text-white/60 mb-8 max-w-sm">
                Our operations team is ready to assist you with any inquiries regarding the research center.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-10 py-4 bg-accent text-white rounded-full text-sm   hover:scale-105 transition-all duration-300 shadow-[0_8px_32px_rgba(var(--color-accent-rgb),0.3)]"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Member Details Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/40 backdrop-blur-md flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-full overflow-hidden shadow-[0_32px_128px_rgba(0,0,0,0.3)] relative flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

              {/* Image Column */}
              <div className="relative w-full md:w-2/5 h-64 md:h-auto bg-neutral-100">
                <BlurImage
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-white/10" />
              </div>

              {/* Content Column */}
              <div className="relative flex-1 p-8 md:p-12 overflow-y-auto">
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 bg-accent/10 text-accent text-[10px] font-bold uppercase rounded-full">
                      {selectedMember.department}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-black mb-2">
                    {selectedMember.name}
                  </h2>
                  <p className="text-lg text-accent font-medium tracking-tight">
                    {selectedMember.role}
                  </p>
                </div>

                <div className="space-y-8">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-px bg-black/10" />
                      <h3 className="text-[11px] font-black uppercase  text-black/40">Background</h3>
                    </div>
                    <p className="text-black/60 leading-relaxed font-medium">
                      {selectedMember.bio}
                    </p>
                  </div>

                  <div className="pt-8 border-t border-black/5">
                    <div className="flex flex-wrap gap-3">
                      {/* <a
                        href={`mailto:${selectedMember.email}`}
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-black/10"
                      >
                        <Mail className="h-4 w-4" />
                        Send Message
                      </a> */}
                      {selectedMember.linkedin && (
                        <a
                          href={`https://linkedin.com/in/${selectedMember.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-100 text-black text-[11px] font-semibold uppercase  hover:bg-neutral-200 transition-all"
                        >
                          <Linkedin className="h-4 w-4" />
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  )
}
