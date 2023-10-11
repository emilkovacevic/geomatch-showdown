import ContactForm from "@/components/about/ContactForm";

const page = () => {
  return (
    <main className="my-8">
      <section className="container p-6 mb-6 rounded shadow-md bg-card">
        <h1 className="mb-4 text-3xl font-semibold text-accent">About</h1>
        <p className="text-foreground">
          This is a personal project created by{" "}
          <a
            className="hover:underline text-accent"
            href="https://emilthedev.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Emil
          </a>
        </p>
        <p className="mt-4 text-foreground">
          Feel free to DM me for any questions, suggestions, colaboration etc...
        </p>
        <p className="mt-4 text-foreground">Thank you for visiting!</p>
      </section>
      <section className="container p-4 shadow bg-card">
        <h2 className="my-10 text-2xl font-semibold text-accent">Contact me</h2>
        <ContactForm />
      </section>
    </main>
  );
};

export default page;
