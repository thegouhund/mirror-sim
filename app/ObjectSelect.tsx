"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import useSimulationStore from "./hooks/useSimulationStore";
import objects from "@/app/data.json";

export function ObjectSelect() {
  const { objectName, setObjectName } = useSimulationStore();

  return (
    <div className="absolute z-10 top-6 left-4">
      <Select
        value={objectName}
        onValueChange={(value) => setObjectName(value)}
      >
        <SelectTrigger className="w-[180px] bg-white">
          <SelectValue placeholder="Select an object" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {objects.map((object, _) => {
              return (
                <SelectItem value={object.name} key={_}>
                  {toTitleCase(object.name)}
                  <Image
                    src={`/${object.name}.png`}
                    alt="ds"
                    width={20}
                    height={20}
                  />
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}
