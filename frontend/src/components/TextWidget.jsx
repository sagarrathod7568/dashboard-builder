import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function TextWidget({ value, onChange }) {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline"]
    ],
  };

  return (
    <ReactQuill
      theme="snow"
      value={value || ""}
      onChange={onChange}
      modules={modules}
      style={{ height: "100%" }}
      placeholder="Type here..."
    />
  );
}

export default TextWidget;