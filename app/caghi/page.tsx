
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Globe, Shield, Users, Lightbulb, Mail } from "lucide-react"

export default function CaghiPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none z-0"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-transparent to-transparent dark:from-blue-950/20 pointer-events-none"></div>

          <div className="container px-4 mx-auto relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6 border border-blue-200 dark:border-blue-800">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                New Research Centre
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                Centre for AI Governance <br className="hidden md:block" />
                & Human Infrastructure
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Pioneering the ethical frameworks and societal structures necessary for a future where artificial intelligence and humanity thrive together.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="rounded-full px-8 bg-black hover:bg-black/90 text-white shadow-lg">
                  Explore Our Research
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8 border-foreground/20 hover:bg-foreground/5">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-20 bg-muted/30 relative">
          <div className="container px-4 mx-auto">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
              <div className="bg-white dark:bg-card p-8 rounded-2xl border shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Lightbulb size={120} />
                </div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-blue-600">
                  <Lightbulb className="w-6 h-6" /> Our Vision
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  To be a global beacon for responsible AI development, ensuring that technological advancement is aligned with human values, rights, and societal well-being. We envision a world where AI infrastructure supports rather than supplants human agency.
                </p>
              </div>

              <div className="bg-white dark:bg-card p-8 rounded-2xl border shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Shield size={120} />
                </div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-blue-600">
                  <Shield className="w-6 h-6" /> Our Mission
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  To conduct interdisciplinary research, develop robust governance frameworks, and build the human infrastructure needed to manage AI risks and maximize its benefits for society. We bridge the gap between technical innovation and policy making.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Are & What We Do */}
        <section className="py-24">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col lg:flex-row gap-16 items-start">
              <div className="lg:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Who We Are</h2>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  CAGHI is a multidisciplinary collective of researchers, ethicists, policy experts, and technologists. We are united by a common goal: to navigate the complexities of the AI age with wisdom and foresight.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Situated within the AI Research Center, we draw upon a rich ecosystem of technical expertise while bringing critical social science perspectives to the forefront of AI development.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-6">
                  <div className="relative pl-4 border-l-2 border-blue-500">
                    <div className="text-4xl font-bold mb-1">20+</div>
                    <div className="text-sm text-muted-foreground">Expert Researchers</div>
                  </div>
                  <div className="relative pl-4 border-l-2 border-blue-500">
                    <div className="text-4xl font-bold mb-1">15+</div>
                    <div className="text-sm text-muted-foreground">Global Partners</div>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold mb-8">What We Do</h2>
                <ul className="space-y-6">
                  {[
                    { title: "Policy Research", desc: "Developing actionable policy recommendations for governments and organizations." },
                    { title: "Ethics Auditing", desc: "Creating frameworks to audit AI systems for bias, fairness, and safety." },
                    { title: "Public Education", desc: "Demystifying AI for the general public to foster informed democratic participation." },
                    { title: "Infrastructure Design", desc: "Proposing 'human infrastructure' models to support workforce transition in the AI era." }
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
                        {i + 1}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Key Focus Areas */}
        <section className="py-24 bg-black/5 dark:bg-white/5">
          <div className="container px-4 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Focus Areas</h2>
              <p className="text-muted-foreground text-lg">Our research and advocacy concentrate on these critical pillars of AI governance.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: <Globe className="w-8 h-8" />, title: "Global AI Governance", desc: "Harmonizing international standards and regulations for cross-border AI deployment." },
                { icon: <Users className="w-8 h-8" />, title: "Human-AI Collaboration", desc: "Designing systems that augment human intelligence rather than replacing it." },
                { icon: <Shield className="w-8 h-8" />, title: "Algorithmic Accountability", desc: "Ensuring transparency and responsibility in automated decision-making processes." }
              ].map((area, i) => (
                <div key={i} className="bg-background p-8 rounded-xl border hover:border-blue-500/50 transition-colors duration-300">
                  <div className="mb-6 inline-flex p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                    {area.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{area.title}</h3>
                  <p className="text-muted-foreground">{area.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-24 container px-4 mx-auto">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-12 text-center text-white overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-20"></div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <Mail className="w-12 h-12 mx-auto mb-6 opacity-90" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Partner With Us</h2>
              <p className="text-blue-100 text-lg mb-8">
                Interested in collaborating on research or policy? We'd love to hear from you.
              </p>
              <Button size="lg" variant="secondary" className="rounded-full px-8 text-blue-700 font-bold hover:bg-white">
                Get in Touch
              </Button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
