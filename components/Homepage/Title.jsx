export default function Title() {
  return (
    <>
      <h2 className={`mb-3 text-2xl font-semibold`}>
        Docs{" "}
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span>
      </h2>
    </>
  );
}
