export default function SpeedBand() {
  return (
    <section
      className="relative z-[4] mx-auto mb-[70px] mt-[22px] flex max-w-[1080px] items-center gap-[26px] rounded-[22px] px-10 py-[30px]"
      style={{
        border: "1px solid rgba(255,70,85,.2)",
        background:
          "radial-gradient(600px 200px at 12% 50%,rgba(225,29,42,.22),transparent 70%),linear-gradient(180deg,rgba(28,9,12,.7),rgba(14,6,8,.6))",
      }}
    >
      <div
        className="grid h-[74px] w-[74px] flex-shrink-0 place-items-center rounded-full"
        style={{ border: "2px solid rgba(255,70,85,.5)", boxShadow: "0 0 30px rgba(225,29,42,.4)" }}
      >
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#ff4a57" strokeWidth="2" strokeLinecap="round">
          <path d="M12 8v4l3 2" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      </div>
      <div>
        <div className="font-display text-2xl font-bold tracking-[-0.01em]">
          3–4 Clicks. 2–3 Decisions. Video Ready in 3 Minutes.
        </div>
        <div className="mt-1 text-[15px]" style={{ color: "#a99a9c" }}>
          Everything from your phone.
        </div>
      </div>
    </section>
  );
}
