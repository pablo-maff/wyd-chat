import autosize from "autosize";
import { useEffect, useRef } from "react";

export function ChatInput() {
  const textareaRef = useRef(null);

  useEffect(() => {
    // Initialize autosize on the textarea element using the ref
    autosize(textareaRef.current);

    return () => {
      // Cleanup autosize when the component unmounts
      autosize.destroy(textareaRef.current);
    };
  }, []);

  return (
    <form className="flex pt-1 pb-4 px-6">
      <textarea
        ref={textareaRef}
        className="p-2 rounded-lg resize-none max-h-80 overflow-y-auto h-10 w-full" />
    </form>
  )
}