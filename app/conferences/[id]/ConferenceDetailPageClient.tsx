"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, MapPin, ExternalLink, Clock, Users, FileText, DollarSign, Award, BookOpen, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlurImage } from "@/components/blur-image"
import type { Conference } from "@/lib/conferences-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ConferenceDetailPageClientProps {
    conference: Conference
}

export default function ConferenceDetailPageClient({ conference }: ConferenceDetailPageClientProps) {
    const statusColors = {
        "Upcoming": "bg-secondary/15 text-secondary-foreground border-secondary/30",
        "Registration Open": "bg-primary/5 text-primary dark:text-primary border-primary/10",
        "Past": "bg-muted text-muted-foreground border-border",
    }

    return (
        <>
            <Header />
            <main className="min-h-screen pt-24 pb-16 bg-cream relative overflow-hidden text-black">
                <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

                {/* Ambient Glows */}
                <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute top-1/2 -left-24 w-[400px] h-[400px] bg-brand/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Back Button */}
                    <Link href="/conferences" className="inline-block mb-12">
                        <div className="group flex items-center gap-2 text-[10px] font-semibold uppercase text-black/40 hover:text-black transition-colors">
                            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                            Back to Conferences
                        </div>
                    </Link>

                    {/* Hero Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-12 relative"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <span
                                className={`px-3 py-1 text-[10px] font-semibold uppercase rounded-full border ${statusColors[conference.status as keyof typeof statusColors] || "bg-muted"}`}
                            >
                                {conference.status}
                            </span>
                            <span className="px-3 py-1 bg-accent/10 text-accent text-[10px] font-semibold uppercase rounded-full">
                                {conference.department}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-7xl font-medium tracking-tighter text-black mb-8 max-w-5xl">
                            {conference.title}
                        </h1>

                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8 border-t border-black/5">
                            <div className="flex flex-wrap gap-12 text-black/40">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-xl bg-black flex items-center justify-center text-white shadow-lg overflow-hidden relative">
                                        <div className="absolute inset-0 bg-noise opacity-20" />
                                        <Calendar className="h-5 w-5 relative z-10" />
                                    </div>
                                    <div>
                                        <div className="text-black font-semibold uppercase text-[11px] leading-tight mb-1">Conference Date</div>
                                        <div className="text-lg text-black font-medium">{conference.date}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-xl bg-black flex items-center justify-center text-white shadow-lg overflow-hidden relative">
                                        <div className="absolute inset-0 bg-noise opacity-20" />
                                        <MapPin className="h-5 w-5 relative z-10" />
                                    </div>
                                    <div>
                                        <div className="text-black font-semibold uppercase text-[11px] leading-tight mb-1">Location</div>
                                        <div className="text-lg text-black font-medium">{conference.location}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <div className="flex gap-4 cursor-pointer">
                                    <Link href={conference.registrationUrl} target="_blank">
                                        <Button size="lg" className="px-10 py-5 bg-black text-white text-[11px] font-semibold uppercase tracking-widest rounded-full transition-all hover:scale-105 hover:bg-black/90 h-auto shadow-xl shadow-black/10">
                                            Register Now
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-x-12 gap-y-4">
                            <div className="flex gap-2 text-xs uppercase font-semibold text-black/40">
                                Organizing Institute:
                                <span className="text-black ml-1">{conference.organizingInstitute}</span>
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content Area */}
                        <div className="lg:col-span-2 space-y-12">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="relative aspect-video w-full overflow-hidden rounded-2xl border border-black/5 shadow-2xl shadow-black/5"
                            >
                                <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
                                <BlurImage
                                    src={conference.image || "/placeholder.svg"}
                                    alt={conference.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </motion.div>

                            <Tabs defaultValue="overview" className="w-full">
                                {/* Category Pills Navigation */}
                                <TabsList className="flex flex-wrap gap-2 mb-10 p-1.5 bg-neutral-100 rounded-full w-fit h-auto border-none">
                                    {[
                                        { id: "overview", label: "Overview" },
                                        { id: "callForPapers", label: "Call for Papers" },
                                        { id: "committee", label: "Committee" },
                                        { id: "registration", label: "Registration" },
                                    ].map((tab) => (
                                        <TabsTrigger
                                            key={tab.id}
                                            value={tab.id}
                                            className="px-6 py-2 text-[11px] font-semibold uppercase tracking-widest transition-all duration-300 rounded-full data-[state=active]:bg-black data-[state=active]:text-white text-black/40 hover:text-black shadow-none border-none outline-none"
                                        >
                                            {tab.label}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>

                                <TabsContent value="overview" className="space-y-8 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
                                    <div className="space-y-12">
                                        <div className="space-y-6">
                                            <h3 className="text-[11px] font-semibold uppercase text-black/40">About the Conference</h3>
                                            <div className="text-lg text-black/60 leading-relaxed font-medium whitespace-pre-line">
                                                {conference.fullDescription}
                                            </div>
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-6 bg-white p-8 rounded-2xl border border-black/5 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-noise opacity-[0.02]" />
                                            <div className="relative">
                                                <h4 className="text-[10px] font-semibold uppercase text-black/40 mb-2">Expected Participants</h4>
                                                <p className="text-lg font-medium text-black">{conference.participantsExpected}</p>
                                            </div>
                                            <div className="relative">
                                                <h4 className="text-[10px] font-semibold uppercase text-black/40 mb-2">Target Audience</h4>
                                                <p className="text-lg font-medium text-black">{conference.targetParticipants}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-[11px] font-semibold uppercase text-black/40 mb-8">Keynote Speakers</h3>
                                            {conference.speakers && conference.speakers.length > 0 ? (
                                                <div className="grid sm:grid-cols-2 gap-6">
                                                    {conference.speakers.map((speaker, index) => (
                                                        <div key={index} className="flex items-center gap-5 p-6 bg-white border border-black/5 rounded-2xl group transition-all hover:bg-neutral-50 hover:border-accent/20">
                                                            <div className="relative w-24 h-24 rounded-xl overflow-hidden shadow-lg">
                                                                <div className="absolute inset-0 bg-noise opacity-20" />
                                                                <BlurImage
                                                                    src={speaker.image}
                                                                    alt={speaker.name}
                                                                    fill
                                                                    className="object-cover"
                                                                />
                                                            </div>
                                                            <div>
                                                                <h4 className="text-lg font-medium text-black mb-1">{speaker.name}</h4>
                                                                <p className="text-[10px] font-semibold text-accent uppercase mb-1">{speaker.role}</p>
                                                                <p className="text-[11px] text-black/40 font-semibold uppercase">{speaker.company}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="p-16 bg-white rounded-3xl text-center border border-dashed border-black/10 relative overflow-hidden">
                                                    <div className="absolute inset-0 bg-noise opacity-[0.02]" />
                                                    <Sparkles className="h-8 w-8 text-accent/40 mx-auto mb-4" />
                                                    <p className="text-black/40 font-semibold uppercase tracking-widest text-[10px]">Announcing Soon</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="callForPapers" className="space-y-8 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
                                    <div className="space-y-6">
                                        <h3 className="text-[11px] font-semibold uppercase text-black/40">Research Tracks</h3>
                                        <p className="text-lg text-black/60 leading-relaxed font-medium mb-8">{conference.callForPapers.text}</p>

                                        <div className="overflow-hidden rounded-2xl border border-black/5 bg-white relative">
                                            <div className="absolute inset-0 bg-noise opacity-[0.02]" />
                                            <table className="w-full text-left text-sm relative z-10">
                                                <thead>
                                                    <tr className="border-b border-black/5">
                                                        <th className="px-8 py-5 text-[10px] font-semibold uppercase text-black/40 tracking-widest">Track ID</th>
                                                        <th className="px-8 py-5 text-[10px] font-semibold uppercase text-black/40 tracking-widest">Topic Areas</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-black/5">
                                                    {conference.callForPapers.tracks.map((track) => (
                                                        <tr key={track.id} className="hover:bg-neutral-50 transition-colors">
                                                            <td className="px-8 py-5 text-[11px] font-semibold uppercase text-black">{track.id}</td>
                                                            <td className="px-8 py-5 text-sm font-medium text-black/60">{track.title}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="space-y-6 pt-12">
                                        <h3 className="text-[11px] font-semibold uppercase text-black/40">Submission Guidelines</h3>
                                        <div className="bg-white p-8 rounded-2xl border border-black/5 relative overflow-hidden group hover:border-accent/20 transition-colors">
                                            <div className="absolute inset-0 bg-noise opacity-[0.02]" />
                                            <h4 className="text-lg font-medium text-black mb-4 flex items-center gap-3">How and Where to Submit</h4>
                                            <ul className="space-y-4 text-black/60 font-medium">
                                                <li className="flex gap-3">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                                                    <span>
                                                        Participants need to create a CMT account to submit their article.
                                                        <Link href={conference.submissionGuidelines.createAccountLink} target="_blank" rel="noreferrer" className="text-accent underline underline-offset-4 ml-1">
                                                            Create Account
                                                        </Link>
                                                    </span>
                                                </li>
                                                <li className="flex gap-3">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                                                    <span>
                                                        After creating your account, follow the submission steps here:
                                                        <Link href={conference.submissionGuidelines.submissionStepsLink} target="_blank" rel="noreferrer" className="text-accent underline underline-offset-4 ml-1">
                                                            Submission Guide
                                                        </Link>
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="bg-black text-white p-8 rounded-2xl relative overflow-hidden">
                                            <div className="absolute inset-0 bg-noise opacity-20" />
                                            <h4 className="text-lg font-medium mb-3">Review Process</h4>
                                            <p className="text-sm text-white/60 font-medium leading-relaxed">
                                                The Microsoft CMT Service will be used to manage the peer-review process for the conference. The service is provided free of charge by Microsoft, covering all expenses including Azure cloud services.
                                            </p>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="committee" className="space-y-12 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
                                    <div className="space-y-12">
                                        {/* Patrons */}
                                        <div className="space-y-8">
                                            <h3 className="text-[11px] font-semibold uppercase text-black/40">Patrons</h3>
                                            <div className="grid gap-4">
                                                {conference.committee.patrons.map((member, i) => (
                                                    <CommitteeMemberCard key={i} name={member.name} role={member.role} image={member.image} />
                                                ))}
                                            </div>
                                        </div>

                                        {/* Chairs */}
                                        <div className="space-y-8">
                                            <h3 className="text-[11px] font-semibold uppercase text-black/40">Chairs</h3>
                                            <div className="grid gap-4">
                                                {conference.committee.chairs.map((member, i) => (
                                                    <CommitteeMemberCard key={i} name={member.name} role={member.role} image={member.image} />
                                                ))}
                                            </div>
                                        </div>

                                        {/* Convenors */}
                                        <div className="space-y-8">
                                            <h3 className="text-[11px] font-semibold uppercase text-black/40">Convenors</h3>
                                            <div className="grid gap-4">
                                                {conference.committee.convenors.map((member, i) => (
                                                    <CommitteeMemberCard key={i} name={member.name} role={member.role} image={member.image} />
                                                ))}
                                            </div>
                                        </div>

                                        {/* Co-Convenors */}
                                        <div className="space-y-8">
                                            <h3 className="text-[11px] font-semibold uppercase text-black/40">Co-Convenors</h3>
                                            <div className="grid gap-4">
                                                {conference.committee.coConvenors.map((member, i) => (
                                                    <CommitteeMemberCard key={i} name={member.name} role={member.role} image={member.image} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="registration" className="space-y-12 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
                                    <div className="bg-white rounded-2xl border border-black/5 overflow-hidden relative">
                                        <div className="absolute inset-0 bg-noise opacity-[0.02]" />
                                        <div className="p-10 relative">
                                            <h3 className="text-[11px] font-semibold uppercase text-black/40 mb-10">Registration Fees</h3>

                                            <div className="grid gap-16">
                                                {/* Indian */}
                                                <div>
                                                    <div className="flex items-center gap-3 mb-8">
                                                        <h4 className="text-lg font-medium text-black">Indian Participants</h4>
                                                    </div>
                                                    <div className="grid gap-4">
                                                        {conference.registrationFees.indian.map((fee, i) => (
                                                            <div key={i} className="flex justify-between items-center p-6 bg-neutral-50 rounded-2xl border border-black/5">
                                                                <span className="text-[11px] font-semibold uppercase text-black/60">{fee.category}</span>
                                                                <span className="text-lg font-medium text-black">{fee.amount}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* International */}
                                                <div>
                                                    <div className="flex items-center gap-3 mb-8">
                                                        <h4 className="text-lg font-medium text-black">International Participants</h4>
                                                    </div>
                                                    <div className="grid gap-4">
                                                        {conference.registrationFees.international.map((fee, i) => (
                                                            <div key={i} className="flex justify-between items-center p-6 bg-neutral-50 rounded-2xl border border-black/5">
                                                                <span className="text-[11px] font-semibold uppercase text-black/60">{fee.category}</span>
                                                                <span className="text-lg font-medium text-black">{fee.amount}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-black text-white p-8 rounded-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="absolute inset-0 bg-noise opacity-20" />
                                        <div className="relative">
                                            <h4 className="text-lg font-medium mb-1">AIP Proceedings Questionnaire</h4>
                                            <p className="text-sm text-white/60 font-medium">Compliance requirement for official conference proceedings.</p>
                                        </div>
                                        <a
                                            href="https://publishing.aip.org/conference-proceedings-questionnaire-ver2/"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="relative z-10 inline-flex items-center px-6 py-3 bg-white text-black text-[11px] font-semibold uppercase tracking-widest rounded-full transition-all hover:scale-105"
                                        >
                                            <ExternalLink className="w-4 h-4 mr-2" />
                                            Go to Questionnaire
                                        </a>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>

                        {/* Sidebar Area */}
                        <div className="space-y-8">
                            {/* Timeline */}
                            <div className="space-y-8">
                                <h3 className="text-[11px] font-semibold uppercase text-black/40">Important Dates</h3>
                                <div className="relative space-y-8">
                                    {conference.timeline.map((item, index) => (
                                        <div key={index} className="flex gap-4 group">
                                            <div className="relative shrink-0 w-px bg-black/5 group-hover:bg-accent transition-colors">
                                                <div className="absolute top-1.5 -left-1 w-2.5 h-2.5 rounded-full bg-white border border-black/5 group-hover:border-accent group-hover:bg-accent transition-all" />
                                            </div>
                                            <div className="pb-4">
                                                <p className="text-[10px] font-semibold uppercase text-black/40 mb-1">{item.event}</p>
                                                <p className="text-sm font-medium text-black">{item.deadline}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Share */}
                            <div className="pt-10 border-t border-black/5">
                                <Button
                                    variant="outline"
                                    className="w-full h-14 rounded-full border border-black/5 bg-transparent text-black text-[11px] font-semibold uppercase tracking-widest hover:border-black/10 hover:text-black cursor-pointer hover:bg-neutral-50 transition-all hover:scale-[1.02]"
                                    onClick={() => {
                                        navigator.clipboard.writeText(window.location.href);
                                    }}
                                >
                                    <ExternalLink className="h-3.5 w-3.5 mr-2" />
                                    Copy Link
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

function CommitteeMemberCard({ name, role, image }: { name: string, role: string, image?: string }) {
    return (
        <div className="flex items-center gap-5 p-6 bg-white border border-black/5 rounded-2xl transition-all hover:bg-neutral-50 hover:border-accent/20 group">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-md shrink-0">
                <div className="absolute inset-0 bg-noise opacity-20" />
                {image ? (
                    <BlurImage src={image} alt={name} fill className="object-cover" />
                ) : (
                    <div className="w-full h-full bg-black flex items-center justify-center text-white">
                        <Users className="w-6 h-6" />
                    </div>
                )}
            </div>
            <div>
                <h5 className="text-lg font-medium text-black mb-1">{name}</h5>
                <p className="text-[10px] font-semibold text-accent uppercase">{role}</p>
            </div>
        </div>
    )
}

function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    )
}
