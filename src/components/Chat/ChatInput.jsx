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
    <div className="fixed p-4 pr-8" style={{ width: "-webkit-fill-available" }}>
      <textarea
        ref={textareaRef}
        className="w-full p-2 rounded-lg resize-none max-h-80 overflow-y-auto h-10" />
    </div>
  )
}