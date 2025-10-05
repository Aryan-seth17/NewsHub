import Image from "next/image";
import Nav from "./compoonent/nav";
import NewsItem from "./compoonent/NewsItem";
import NewsData from "./compoonent/NewsData";


export default function Home() {
  return (
     <div>
      <Nav/>
       
      <NewsData/>
      <h1>Hallo Next App</h1>
     </div>
  );
}
