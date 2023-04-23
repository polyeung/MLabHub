interface labInfo {
    name: string,
    people: string[],
    link: string,
    intro: string,
  }

function generateLabData(count: number): labInfo[] {
    const labNames = ["Innovative Lab", "Advanced Lab", "New Tech Lab", "Next Gen Lab"];
    const people = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Henry", "Isabella", "Jacob"];
  
    const result: labInfo[] = [];
  
    for (let i = 0; i < count; i++) {
      const nameIndex = Math.floor(Math.random() * labNames.length);
      const numPeople = Math.floor(Math.random() * 6) + 2;
      const peopleList = [];
      for (let j = 0; j < numPeople; j++) {
        const personIndex = Math.floor(Math.random() * people.length);
        peopleList.push(people[personIndex]);
      }
      const link = `http://${labNames[nameIndex].toLowerCase().replace(" ", "")}.com`;
      const intro = `Welcome to ${labNames[nameIndex]}! We are a team of ${numPeople} researchers dedicated to exploring the latest developments in our field.`;
      result.push({ name: labNames[nameIndex], people: peopleList, link, intro });
    }
  
    return result;
  }
const labData: labInfo[] = [
    {   
        name: "My Lab",
        people: ["Alice", "Bob"],
        link: "http://mylab.com",
        intro: "We do research on exciting things!",
      },
      {
        name: "Another Lab",
        people: ["Charlie", "David", "Eve"],
        link: "http://anotherlab.com",
        intro: "We focus on cutting-edge technology and innovation.",
      },
      {
        name: "Cool Lab",
        people: ["Frank", "Grace"],
        link: "http://coollab.com",
        intro: "Our lab is committed to advancing the state of the art in our field.",
      },
      {
        name: "My Lab",
        people: ["Alice", "Bob"],
        link: "http://mylab.com",
        intro: "We do research on exciting things!",
      },
      {
        name: "Another Lab",
        people: ["Charlie", "David", "Eve"],
        link: "http://anotherlab.com",
        intro: "We focus on cutting-edge technology and innovation.",
      },
      {
        name: "Cool Lab",
        people: ["Frank", "Grace"],
        link: "http://coollab.com",
        intro: "Our lab is committed to advancing the state of the art in our field.",
      },
  ];
  export default generateLabData(20);