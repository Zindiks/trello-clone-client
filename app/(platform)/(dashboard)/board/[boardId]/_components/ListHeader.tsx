import { List } from "../types";

interface ListHeaderProps {
  data: List;
}

const ListHeader = ({ data }: ListHeaderProps) => {
  return <p>{data.title}</p>;
};

export default ListHeader;
