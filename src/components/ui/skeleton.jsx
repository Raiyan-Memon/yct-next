import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    (<div
      className={cn("animate-pulse rounded-md bg-[#333] dark:bg-slate-800", className)}
      {...props} />)
  )
}

export { Skeleton }
