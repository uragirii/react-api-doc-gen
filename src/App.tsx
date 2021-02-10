import "./styles.css";
import { Collection } from "./Collection";
import { API_Collection } from "./api";

export default function App() {
  return (
    <div style={{ fontFamily: "Nunito, sans-serif" }}>
      <Collection collection={API_Collection} />
    </div>
  );
}
