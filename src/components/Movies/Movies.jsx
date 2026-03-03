import Row from "./Row";
import requests from "../../Services/Tmdb";

export default function Movies({ onSelect, rowConfig }) {
  return (
    <div className="-mt-58 relative z-20">
      {rowConfig.map((row, index) => (
        <Row 
          key={index} 
          title={row.title} 
          fetchUrl={row.fetchUrl} 
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
