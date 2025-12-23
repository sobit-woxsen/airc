import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
}: StatsCardProps) {
  return (
    <Card className="rounded-2xl border-slate-200 shadow-none transition-all hover:scale-105 hover:border-black/10 hover:bg-slate-50/50 group">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium tracking-tight text-muted-foreground group-hover:text-black transition-colors">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground group-hover:text-black transition-colors" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-medium tracking-tighter">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1 font-medium">{description}</p>
        )}
        {trend && (
          <p
            className={`text-xs mt-2 font-medium ${trend.isPositive ? "text-emerald-600" : "text-rose-600"
              }`}
          >
            {trend.isPositive ? "+" : "-"}
            {Math.abs(trend.value)}% from last month
          </p>
        )}
      </CardContent>
    </Card>
  )
}
