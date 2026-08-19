export default function MatchAnalysisModal({
  isOpen,
  onClose,
  matchData
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-[#111827] w-[450px] rounded-2xl p-6 border border-white/10">

        <h2 className="text-2xl font-bold text-white mb-4">
          Compatibility Analysis
        </h2>

        <h1 className="text-5xl font-bold text-cyan-400 mb-6">
          {matchData.match_percentage}%
        </h1>

        <h3 className="text-white font-semibold mb-2">
          Matched Skills
        </h3>

        <ul className="mb-5">
          {matchData.matched_skills.map(skill=>(
            <li key={skill}>✅ {skill}</li>
          ))}
        </ul>

        <h3 className="text-white font-semibold mb-2">
          Missing Skills
        </h3>

        <ul className="mb-5">
          {matchData.missing_skills.map(skill=>(
            <li key={skill}>⚠ {skill}</li>
          ))}
        </ul>

        <p className="mb-2">
          Experience Match: {matchData.experience_score}/20
        </p>

        <p className="mb-5">
          Education Match: {matchData.education_score}/10
        </p>

        <p className="text-cyan-300 mb-6">
          {matchData.recommendation}
        </p>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-cyan-500 text-white"
        >
          Close
        </button>

      </div>

    </div>
  );
}