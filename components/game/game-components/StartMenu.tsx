const GameStartMenu = () => {
  return (
    <div className="p-4 mx-auto ">
      <section className="mb-10">
        <h2 className="my-4 text-xl font-semibold uppercase">Game rules</h2>
        <ul className="space-y-1 tracking-wide list-disc list-inside">
          <li>Select the correct country-capital pairs</li>
          <li>During the game you can pause the game only once</li>
          <li>Mismatch has a +5 seconds penalty. During this time gameplay is frozen.</li>
          <li>Beat other player&apos;s time</li>
          <li>When all pairs are found the time will be added to your account</li>
          <li>Players with an account will be listed on the score board when the find all matches</li>
          <li>You can play withouth an account, but the playthrough will not be saved when completed.</li>
        </ul>
         
         {/* TODO: ADD ANTICHEATS */}
         {/* <h2  className="mt-10 mb-4 font-semibold tracking-wider text-md">
            Attempting to cheat will be detected and restart the game:
         </h2>
            <ol className="mt-2 ml-6 space-y-1 tracking-wide list-decimal list-inside">
              <li>Do not use other tabs</li>
              <li>Do not click outside the game window</li>
              <li>Do not refresh the page</li>
              <li>Do not open development tools</li>
            </ol> */}
          
      </section>
    </div>
  );
};

export default GameStartMenu;
