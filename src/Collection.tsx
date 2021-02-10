import { Collection as ICollection } from "./types";
import { Authorization } from "./Authorization";

export interface CollectionProps {
  collection: ICollection;
}

export const Collection = ({ collection }: CollectionProps) => {
  return (
    <div>
      <div style={{ fontSize: "1.8em", fontWeight: "bold" }}>
        {collection.title}
      </div>
      <code style={{ fontFamily: "Consolas", marginTop: "0.5em" }}>
        {collection.version}
      </code>
      <div>
        <code style={{ fontFamily: "Consolas", marginTop: "0.5em" }}>
          {collection.baseURL}
        </code>
      </div>
      <Authorization authorization={collection.auth} />
    </div>
  );
};
