function ImageWidget({ image, onUpload }) {
  const handleChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      onUpload(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
      />

      {image && (
        <img
          src={image}
          alt="uploaded"
          style={{
            width: "100%",
            marginTop: "10px"
          }}
        />
      )}
    </div>
  );
}

export default ImageWidget;