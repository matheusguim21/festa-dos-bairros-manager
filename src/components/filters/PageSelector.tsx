import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  handleChange: React.Dispatch<React.SetStateAction<string>>;
  value: string;
}

export function PageSelector({ handleChange, value }: Props) {
  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className="w-16">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {["5", "10", "20", "50"].map((val) => (
          <SelectItem key={val} value={val}>
            {val}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
