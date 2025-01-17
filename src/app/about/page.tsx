import ClientAbout from "@/components/client/pages/about";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  // read route params
  return {
    title: "about",
    description: "about",
  };
}

const Page = () => {
  return <ClientAbout></ClientAbout>;
};

export default Page;
