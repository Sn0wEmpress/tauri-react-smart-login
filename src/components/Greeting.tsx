import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

const Greeting = () => {
    const [greetMsg, setGreetMsg] = useState("");
    const [name, setName] = useState("");

    async function greet() {
        // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
        setGreetMsg(await invoke("greet", { name }));
    }


    return (
        <main className="mx-auto pt-8 flex flex-col justify-center items-center text-center h-[calc(100vh-32px)] w-full overflow-auto rounded-b-lg">
            <form
                className="flex justify-center"
                onSubmit={(e) => {
                    e.preventDefault();
                    greet();
                }}
            >
                <input
                    id="greet-input"
                    onChange={(e) => setName(e.currentTarget.value)}
                    placeholder="Enter a name..."
                    className="rounded-lg border border-transparent px-6 py-2.5 text-base font-medium text-[#0f0f0f] bg-white shadow-sm transition-colors mr-1.5 outline-none dark:text-white dark:bg-[#0f0f0f98] hover:border-[#396cd8] dark:hover:border-[#396cd8]"
                />
                <button
                    type="submit"
                    className="rounded-lg border border-transparent px-6 py-2.5 text-base font-medium text-[#0f0f0f] bg-white shadow-sm transition-colors cursor-pointer outline-none hover:border-[#396cd8] active:border-[#396cd8] active:bg-[#e8e8e8] dark:text-white dark:bg-[#0f0f0f98] dark:active:bg-[#0f0f0f69]"
                >
                    Greet
                </button>
            </form>
            <p className="mt-4 text-[#0f0f0f] dark:text-white">{greetMsg}</p>
        </main>
    )
}

export default Greeting