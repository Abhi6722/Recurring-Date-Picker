import DatePicker from "@/components/DatePicker/DatePicker";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-slate-200 p-4">
      <div className="overflow-auto bg-white rounded-xl shadow-lg">
        <DatePicker />
      </div>
    </main>
  );
}