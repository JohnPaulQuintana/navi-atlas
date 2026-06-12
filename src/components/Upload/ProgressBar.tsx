interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full bg-white/20 rounded-full mt-4 h-3 overflow-hidden">
      <div
        className="bg-green-400 h-3 transition-all duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}