const GameStartMenu = () => {
  return (
    <section className="mx-auto">
      <h2 className="my-4 text-xl font-semibold uppercase">Game rules</h2>
      <ul className="space-y-1 tracking-wide list-disc list-inside">
        <li>Select the correct country-capital pairs</li>
        <li>During the game you can pause the game only once</li>
        <li>
          Mismatch has a +5 seconds penalty. During this time gameplay is
          frozen.
        </li>
        <li>Beat other player&apos;s time</li>
        <li>When all pairs are found the time will be added to your account</li>
        <li>
          Players with an account will be listed on the score board when the
          find all matches
        </li>
        <li>
          You can play withouth an account, but the playthrough will not be
          saved when completed.
        </li>
      </ul>
    </section>
  );
};

export default GameStartMenu;
