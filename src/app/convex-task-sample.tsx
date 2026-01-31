"use client";

import { useQuery } from "convex/react";

import { api } from "../../convex/_generated/api";

export default function ConvexTaskSample() {
  const tasks = useQuery(api.tasks.get);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      {tasks?.map(({ _id, text }: { _id: string; text: string }) => (
        <div key={_id}>{text}</div>
      ))}
    </div>
  );
}
