import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50/30 to-purple-50/50 dark:from-slate-900 dark:via-indigo-950/30 dark:to-violet-900/20">
      <LoadingSpinner />
    </div>
  );
}
