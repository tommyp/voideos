"use client";

type Props = {
  onStart: () => void;
};

export default function Landing({ onStart }: Props) {
  return (
    <button
      onClick={onStart}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Watch now
    </button>
  );
}
