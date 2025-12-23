export async function GET() {
  const baseUrl = "https://your-university-lab.com" // Update with your actual domain

  const episodes = [
    {
      title: "The Quantum Leap: Understanding Quantum Computing",
      description:
        "Dr. Sarah Chen discusses the fundamentals of quantum computing and its potential to revolutionize various industries.",
      pubDate: "2024-03-20",
      audioUrl: `${baseUrl}/audio/episode-1.mp3`,
      duration: "45:23",
      episodeNumber: 1,
    },
    {
      title: "AI Ethics: Building Responsible Machine Learning Systems",
      description:
        "Prof. Michael Torres explores the ethical considerations and best practices for developing AI systems that benefit society.",
      pubDate: "2024-03-13",
      audioUrl: `${baseUrl}/audio/episode-2.mp3`,
      duration: "52:15",
      episodeNumber: 2,
    },
    {
      title: "From Research to Product: The Startup Journey",
      description:
        "Alumni founders share their experiences transitioning from academic research to building successful tech startups.",
      pubDate: "2024-03-06",
      audioUrl: `${baseUrl}/audio/episode-3.mp3`,
      duration: "48:30",
      episodeNumber: 3,
    },
  ]

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>AI Research Center Podcast</title>
    <link>${baseUrl}/podcast</link>
    <description>Deep dives into cutting-edge research, technology trends, and conversations with leading experts in AI, quantum computing, and more</description>
    <language>en-us</language>
    <itunes:author>University AI Research Center</itunes:author>
    <itunes:category text="Technology"/>
    <itunes:category text="Science"/>
    <itunes:explicit>no</itunes:explicit>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${episodes
      .map(
        (episode) => `
    <item>
      <title>${episode.title}</title>
      <description>${episode.description}</description>
      <pubDate>${new Date(episode.pubDate).toUTCString()}</pubDate>
      <enclosure url="${episode.audioUrl}" type="audio/mpeg" />
      <itunes:duration>${episode.duration}</itunes:duration>
      <itunes:episode>${episode.episodeNumber}</itunes:episode>
      <guid>${baseUrl}/podcast#episode-${episode.episodeNumber}</guid>
    </item>`,
      )
      .join("")}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
