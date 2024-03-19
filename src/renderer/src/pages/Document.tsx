import { Link } from "react-router-dom";
import { ToC } from "../components/ToC";
import { Editor } from "@renderer/components/Editor/index";

export function Document() {
  return (
    <main className="flex-1 flex py-12 px-10 gap-8">
      <aside className="hidden lg:block sticky top-0">
        <span className="text-rotion-100 font-semibold text-xs">
          Table of Contents
        </span>

        <ToC.Root>
          <ToC.Link> Back-end</ToC.Link>
          <ToC.Section>
            <ToC.Link> PostgreSQl</ToC.Link>
            <ToC.Link> NodeJs</ToC.Link>
            <ToC.Link> Docker</ToC.Link>
          </ToC.Section>
        </ToC.Root>
      </aside>
      <section className="flex flex-1 flex-col items-center text-rotion-100">
        <Editor />
      </section>
    </main>
  );
}
