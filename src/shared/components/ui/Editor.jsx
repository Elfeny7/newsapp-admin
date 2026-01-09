import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

export default function Editor({ value, onChange, disabled }) {
    const editorRef = useRef(null);
    const quillInstance = useRef(null);

    useEffect(() => {
        if (!editorRef.current) return;

        if (!quillInstance.current) {
            quillInstance.current = new Quill(editorRef.current, {
                theme: "snow",
                placeholder: "Tulis konten di sini...",
                readOnly: disabled,
                modules: {
                    toolbar: disabled
                        ? false
                        : [
                            [{ header: [1, 2, false] }],
                            ["bold", "italic", "underline", "strike"],
                            [{ color: [] }, { background: [] }],
                            [{ align: [] }, { list: "ordered" }, { list: "bullet" }],
                            ["link", "image"],
                            ["clean"],
                        ],
                },
            });

            quillInstance.current.on("text-change", () => {
                const html = editorRef.current.querySelector(".ql-editor").innerHTML;
                if (onChange) onChange(html);
            });
        }

        if (value && quillInstance.current) {
            const editor = quillInstance.current;
            const currentHTML = editor.root.innerHTML;
            if (currentHTML !== value) {
                editor.root.innerHTML = value;
            }
        }
    }, [value, disabled, onChange]);

    return <div>
        <div ref={editorRef} />
        <div className="mt-4 p-3 border border-gray-300 rounded bg-gray-50">
            <h2 className="font-semibold mb-1">Preview:</h2>
            <div className="ql-editor prose max-w-none" dangerouslySetInnerHTML={{ __html: value }} />
        </div>
    </div>;
}