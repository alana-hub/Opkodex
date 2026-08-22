import type { LocationGroup } from "../types/smartcare.js";

// Rubavu District currently has 12 sectors. The cell lists below are kept
// local so the registration form works without a third-party location API.
// The initial village options are verified examples; production can expand
// the village map from the official administrative dataset.
export const rubavuLocationGroups: LocationGroup[] = [
  {
    sector: "Bugeshi",
    cells: ["Buringo", "Butaka", "Hehu", "Kabumba", "Mutovu", "Nsherima", "Rusiza"],
    villages: {
      Kabumba: ["Kabumba"],
      Buringo: ["Buringo"],
      Butaka: ["Butaka"]
    }
  },
  {
    sector: "Busasamana",
    cells: ["Gasiza", "Gihonga", "Kageshi", "Makoro", "Rusura"],
    villages: {
      Gasiza: ["Gasiza"],
      Gihonga: ["Gihonga"],
      Kageshi: ["Kageshi"]
    }
  },
  {
    sector: "Cyanzarwe",
    cells: ["Busigari", "Cyanzarwe", "Gora", "Kinyanzovu", "Makurizo", "Rwangara", "Rwanzekuma", "Ryabizige"],
    villages: {
      Ryabizige: ["Kavumu"],
      Kinyanzovu: ["Muhororo"],
      Rwanzekuma: ["Kabirizi"]
    }
  },
  {
    sector: "Gisenyi",
    cells: ["Amahoro", "Bugoyi", "Kivuma", "Mbugangari", "Nengo", "Rubavu", "Umuganda"],
    villages: {
      Nengo: ["Nyabagobe", "Nyaburanga", "Ubucuruzi", "Urubyiiruko", "Bucuruzi"],
      Umuganda: ["Muhato", "Umucyo"],
      Amahoro: ["Amahoro"]
    }
  },
  {
    sector: "Kanama",
    cells: ["Kamuhoza", "Karambo", "Musabike", "Nkomane", "Rusongati", "Yungwe"],
    villages: {
      Nkomane: ["Rwanzuki"],
      Kamuhoza: ["Kamuhoza"],
      Karambo: ["Karambo"]
    }
  },
  {
    sector: "Kanzenze",
    cells: ["Kanyirabigogo", "Kirerema", "Muramba", "Nyamikongi", "Nyamirango", "Nyaruteme"],
    villages: {
      Nyamikongi: ["Nyamikongi"],
      Kirerema: ["Kirerema"],
      Muramba: ["Muramba"]
    }
  },
  {
    sector: "Mudende",
    cells: ["Bihungwe", "Kanyundo", "Micinyiro", "Mirindi", "Ndoranyi", "Rungu", "Rwanyakayaga"],
    villages: {
      Bihungwe: ["Bihungwe"],
      Kanyundo: ["Kanyundo"],
      Rungu: ["Rungu"]
    }
  },
  {
    sector: "Nyakiriba",
    cells: ["Bisizi", "Gikombe", "Kanyefurwe", "Nyarushyamba"],
    villages: {
      Nyarushyamba: ["Bazirete"],
      Bisizi: ["Bisizi"],
      Gikombe: ["Gikombe"]
    }
  },
  {
    sector: "Nyamyumba",
    cells: ["Burushya", "Busoro", "Kinigi", "Kiraga", "Munanira", "Rubona"],
    villages: {
      Burushya: ["Burushya"],
      Busoro: ["Busoro"],
      Kinigi: ["Kinigi"]
    }
  },
  {
    sector: "Nyundo",
    cells: ["Bahimba", "Gatovu", "Kavomo", "Kigarama", "Mukondo", "Nyundo", "Terimbere"],
    villages: {
      Bahimba: ["Kagera"],
      Gatovu: ["Gatovu"],
      Terimbere: ["Terimbere"]
    }
  },
  {
    sector: "Rubavu",
    cells: ["Buhaza", "Burinda", "Byahi", "Gikombe", "Murambi", "Rubavu", "Rukoko"],
    villages: {
      Murambi: ["Murambi"],
      Rubavu: ["Rubavu"],
      Byahi: ["Byahi"]
    }
  },
  {
    sector: "Rugerero",
    cells: ["Basa", "Gisa", "Kabilizi", "Muhira", "Rugerero", "Rushubi", "Rwaza"],
    villages: {
      Gisa: ["Gatangare", "Gihira", "Gisa", "Kabashanja", "Kaniga", "Ndobogo", "Rusongati", "Shwemu"],
      Muhira: ["Gatebe I", "Gatebe II", "Gitebe I", "Kasonga", "Kizi", "Rusamaza"],
      Basa: ["Buranga", "Gahinga", "Kanyukiro", "Nyaruhengeri", "Tagaza"]
    }
  }
];

export function getLocationGroup(sector: string): LocationGroup | null {
  return rubavuLocationGroups.find((item) => item.sector === sector) ?? null;
}
