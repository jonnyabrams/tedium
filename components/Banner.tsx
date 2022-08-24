const Banner = () => {
  return (
    <div className="flex items-center justify-between py-10 bg-yellow-400 border-black border-y lg:py-0">
      <div className="px-10 space-y-5">
        <h1 className="max-w-xl font-serif text-6xl">
          <span className="underline decoration-black decoration-4">
            Tedium
          </span>{" "}
          is a place to share all of your most boring thoughts
        </h1>
        <h2>
          You can even read the mindless witterings of millions of other idiots,
          if that's what you're into
        </h2>
      </div>

      <img className="hidden h-32 md:inline-flex lg:h-full" src="/images/tedium-t.png" alt="Tedium T" />
    </div>
  );
};

export default Banner;
