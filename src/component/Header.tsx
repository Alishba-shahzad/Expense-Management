
export default function Header() {
    return (
      <div className="flex flex-col items-center">
        <div className="flex gap-8 justify-center items-center"></div>
        <h1 className="sr-only">Firebase and React Starter Template</h1>
        <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
  
          <a
            target="_blank"
            className="font-bold no-underline text-gray-950 dark:text-white"
            rel="noreferrer"
  
          >
            Expense 
          </a>{" "}
        </p>
        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
      </div>
    );
  }
  