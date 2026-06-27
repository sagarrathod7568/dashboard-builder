import { useEffect, useState } from "react";
import { Rnd } from "react-rnd";
import { v4 as uuidv4 } from "uuid";
import TextWidget from "./TextWidget";
import ImageWidget from "./ImageWidget";
import ChartWidget from "./ChartWidget";
import { saveLayout, getLayout } from "../services/api";
import "../assets/dashboard.css";

function Dashboard() {
  const [widgets, setWidgets] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
  try {
    const res = await getLayout();

    const data =
      res.data?.widgets ??
      res.data ??
      [];

    setWidgets(Array.isArray(data) ? data : []);
  } catch (error) {
    console.log(error);
    setWidgets([]);
  }
};

  const addText = () => {
    setWidgets([
      ...widgets,
      {
        id: uuidv4(),
        type: "text",
        content: "",
        x: 50,
        y: 50,
        width: window.innerWidth < 768 ? 280 : 400,
        height: 250,
      },
    ]);
  };

  const addImage = () => {
    setWidgets([
      ...widgets,
      {
        id: uuidv4(),
        type: "image",
        content: "",
        x: 100,
        y: 100,
        width: 300,
        height: 250,
      },
    ]);
  };

  const addChart = () => {
    setWidgets([
      ...widgets,
      {
        id: uuidv4(),
        type: "chart",
        content: "",
        x: 150,
        y: 150,
        width: 500,
        height: 300,
      },
    ]);
  };

  const updateWidget = (id, updatedData) => {
    setWidgets((prev) =>
      prev.map((widget) =>
        widget.id === id
          ? {
              ...widget,
              ...updatedData,
            }
          : widget,
      ),
    );
  };

  const saveDashboard = async () => {
    try {
      await saveLayout(widgets);

      alert("Layout Saved");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteWidget = (id) => {
    setWidgets((prev) => prev.filter((widget) => widget.id !== id));
  };

  return (
    <div className="dashboard-container">
      <header className="topbar">
        <div>
          <h1>Dashboard Builder 📊</h1>
          <p>Transform ideas into interactive dashboards.</p>
        </div>

        <button className="save-btn" onClick={saveDashboard}>
          Save Layout
        </button>
      </header>

      <div className="workspace">
        <aside className="sidebar">
          <h2>🛠️Components</h2>

          <button onClick={addText}>📘 Text Widget</button>

          <button onClick={addImage}>🏞️ Image Widget</button>

          <button onClick={addChart}>📶 Chart Widget</button>
        </aside>

        <main className="canvas">
          {widgets.map((widget) => (
            <Rnd
              bounds="parent"
              key={widget.id}
              size={{
                width: widget.width,
                height: widget.height,
              }}
              position={{
                x: widget.x,
                y: widget.y,
              }}
              onDragStop={(e, d) =>
                updateWidget(widget.id, {
                  x: d.x,
                  y: d.y,
                })
              }
              onResizeStop={(e, direction, ref, delta, position) =>
                updateWidget(widget.id, {
                  width: parseInt(ref.style.width),
                  height: parseInt(ref.style.height),
                  ...position,
                })
              }
              className="widget-card"
            >
              <div
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  zIndex: 1000,
                }}
              >
                <button
                  className="delete-button"
                  title="Delete"
                  onClick={() => deleteWidget(widget.id)}
                >
                  ✕
                </button>
              </div>
              {widget.type === "text" && (
                <TextWidget
                  value={widget.content}
                  onChange={(value) =>
                    updateWidget(widget.id, {
                      content: value,
                    })
                  }
                />
              )}

              {widget.type === "image" && (
                <ImageWidget
                  image={widget.content}
                  onUpload={(image) =>
                    updateWidget(widget.id, {
                      content: image,
                    })
                  }
                />
              )}

              {widget.type === "chart" && <ChartWidget />}
            </Rnd>
          ))}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
