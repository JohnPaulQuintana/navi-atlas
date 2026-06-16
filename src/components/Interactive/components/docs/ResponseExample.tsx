interface ResponseExampleProps {
  title: string;
  status: string;
  variant: "success" | "error";
  children: string;
}

export default function ResponseExample({
  title,
  status,
  variant,
  children,
}: ResponseExampleProps) {
  const isSuccess = variant === "success";

  return (
    <>
      <div className="flex items-center gap-3 mb-3 mt-8">
        <h3
          className={`font-semibold ${
            isSuccess
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          {title}
        </h3>

        <span
          className={`px-2 py-1 rounded-md text-xs font-semibold ${
            isSuccess
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {status}
        </span>
      </div>

      <pre className="bg-black/40 rounded-lg p-4 overflow-auto text-sm">
        {children}
      </pre>
    </>
  );
}