interface labInfo {
    name: string,
    people: string[],
    link: string,
    intro: string,
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
  export default labData;